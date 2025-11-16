import { MatchingFormData } from "@/store/formStore";
import { MatchingResult, RecommendedProduct } from "@/store/matchingStore";

/**
 * 매칭 API 클라이언트
 * 
 * @file lib/api/matching.ts
 * @description 매칭 추천 API를 호출하는 클라이언트 함수
 * 
 * 주요 기능:
 * 1. 매칭 추천 요청
 * 2. 에러 처리 및 재시도 로직
 * 3. 타입 안전한 응답 처리
 * 
 * @dependencies
 * - store/formStore: 폼 데이터 타입
 * - store/matchingStore: 매칭 결과 타입
 */

export interface MatchingRequest {
  primary_body_part: string;
  activities: string[];
  budget_min: number;
  budget_max: number;
}

export interface MatchingResponse {
  success: boolean;
  recommendations: RecommendedProduct[];
  matching_id: string | null;
  processing_time_ms: number;
  error?: string;
  details?: any;
}

/**
 * API 에러 클래스
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: any
  ) {
    super(message);
    this.name = "APIError";
  }
}

/**
 * 재시도 로직이 포함된 fetch 래퍼
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3,
  retryDelay = 1000
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      // 성공적인 응답이거나 클라이언트 오류(4xx)인 경우 재시도하지 않음
      if (response.ok || response.status < 500) {
        return response;
      }

      // 서버 오류(5xx)인 경우 재시도
      if (response.status >= 500 && attempt < maxRetries - 1) {
        console.warn(
          `API 요청 실패 (시도 ${attempt + 1}/${maxRetries}):`,
          response.status
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
        continue;
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // 네트워크 오류인 경우 재시도
      if (attempt < maxRetries - 1) {
        console.warn(
          `네트워크 오류 (시도 ${attempt + 1}/${maxRetries}):`,
          lastError.message
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
        continue;
      }
    }
  }

  throw lastError || new Error("API 요청 실패");
}

/**
 * 매칭 추천 요청
 * 
 * @param formData - 매칭 폼 데이터
 * @returns 매칭 결과
 * @throws {APIError} API 요청 실패 시
 */
export async function getMatchingRecommendations(
  formData: MatchingFormData
): Promise<MatchingResult> {
  console.group("🎯 매칭 추천 요청");
  console.log("📤 요청 데이터:", formData);

  try {
    const response = await fetchWithRetry("/api/matching/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data: MatchingResponse = await response.json();

    if (!response.ok) {
      console.error("❌ API 오류:", data.error || data.details);
      throw new APIError(
        data.error || "매칭 추천 요청 실패",
        response.status,
        data.details
      );
    }

    if (!data.success || !data.recommendations) {
      throw new APIError("잘못된 응답 형식", response.status, data);
    }

    const result: MatchingResult = {
      recommendations: data.recommendations,
      matching_id: data.matching_id,
      processing_time_ms: data.processing_time_ms,
      created_at: new Date().toISOString(),
    };

    console.log("✅ 매칭 추천 성공:", result);
    console.groupEnd();

    return result;
  } catch (error) {
    console.error("❌ 매칭 추천 오류:", error);
    console.groupEnd();

    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError(
      error instanceof Error ? error.message : "알 수 없는 오류",
      500
    );
  }
}

