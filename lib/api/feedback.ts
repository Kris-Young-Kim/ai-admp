import { APIError } from "./matching";

/**
 * 피드백 API 클라이언트
 * 
 * @file lib/api/feedback.ts
 * @description 피드백 제출 API를 호출하는 클라이언트 함수
 * 
 * 주요 기능:
 * 1. 피드백 제출
 * 2. 에러 처리
 * 3. 타입 안전한 응답 처리
 * 
 * @dependencies
 * - lib/api/matching: APIError 클래스
 */

export interface FeedbackRequest {
  matching_id: string;
  product_id: string;
  useful: boolean;
  rating?: number;
  comment?: string;
}

export interface FeedbackResponse {
  success: boolean;
  feedback_id: string;
  message: string;
  error?: string;
  details?: any;
}

/**
 * 피드백 제출
 * 
 * @param feedbackData - 피드백 데이터
 * @returns 피드백 ID
 * @throws {APIError} API 요청 실패 시
 */
export async function submitFeedback(
  feedbackData: FeedbackRequest
): Promise<string> {
  console.group("💬 피드백 제출 요청");
  console.log("📤 요청 데이터:", feedbackData);

  try {
    const response = await fetch("/api/feedback/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    const data: FeedbackResponse = await response.json();

    if (!response.ok) {
      console.error("❌ API 오류:", data.error || data.details);
      throw new APIError(
        data.error || "피드백 제출 실패",
        response.status,
        data.details
      );
    }

    if (!data.success || !data.feedback_id) {
      throw new APIError("잘못된 응답 형식", response.status, data);
    }

    console.log("✅ 피드백 제출 성공:", data.feedback_id);
    console.groupEnd();

    return data.feedback_id;
  } catch (error) {
    console.error("❌ 피드백 제출 오류:", error);
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

