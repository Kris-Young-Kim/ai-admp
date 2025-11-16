"use client";

import { useCallback, useState } from "react";
import { useMatchingStore } from "@/store/matchingStore";
import { useFormStore, MatchingFormData } from "@/store/formStore";
import { getMatchingRecommendations, APIError } from "@/lib/api/matching";
import { analytics } from "@/lib/api/analytics";

/**
 * 매칭 로직 커스텀 훅
 * 
 * @file hooks/use-matching.ts
 * @description 매칭 추천 로직을 관리하는 커스텀 훅
 * 
 * 주요 기능:
 * 1. 매칭 요청 실행
 * 2. 로딩 및 에러 상태 관리
 * 3. Zustand 스토어와 연동
 * 4. 분석 이벤트 자동 추적
 * 
 * @dependencies
 * - store/matchingStore: 매칭 결과 상태
 * - store/formStore: 폼 데이터
 * - lib/api/matching: 매칭 API 클라이언트
 * - lib/api/analytics: 분석 이벤트 추적
 */

export function useMatching() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    setResult,
    setLoading: setStoreLoading,
    setError: setStoreError,
    addToHistory,
    currentResult,
  } = useMatchingStore();

  const { formData, validateForm } = useFormStore();

  /**
   * 매칭 추천 실행
   */
  const executeMatching = useCallback(
    async (customFormData?: MatchingFormData) => {
      const dataToUse = customFormData || formData;

      // 폼 검증
      if (!validateForm()) {
        const validationError = "폼 입력을 확인해주세요";
        setError(validationError);
        setStoreError(validationError);
        return;
      }

      setIsLoading(true);
      setError(null);
      setStoreLoading(true);
      setStoreError(null);

      // 분석 이벤트: 매칭 요청 시작
      await analytics.trackEvent({
        event_name: "matching_request_start",
        event_data: {
          primary_body_part: dataToUse.primary_body_part,
          activities_count: dataToUse.activities.length,
          budget_range: `${dataToUse.budget_min}-${dataToUse.budget_max}`,
        },
      });

      try {
        const result = await getMatchingRecommendations(dataToUse);

        // 결과 저장
        setResult(result);
        addToHistory(result);

        // 분석 이벤트: 매칭 성공
        await analytics.trackEvent({
          event_name: "matching_request_success",
          event_data: {
            matching_id: result.matching_id,
            recommendations_count: result.recommendations.length,
            processing_time_ms: result.processing_time_ms,
          },
        });

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof APIError
            ? err.message
            : "매칭 추천 중 오류가 발생했습니다";

        setError(errorMessage);
        setStoreError(errorMessage);

        // 분석 이벤트: 매칭 실패
        await analytics.trackEvent({
          event_name: "matching_request_failure",
          event_data: {
            error: errorMessage,
            status: err instanceof APIError ? err.status : 500,
          },
        });

        throw err;
      } finally {
        setIsLoading(false);
        setStoreLoading(false);
      }
    },
    [formData, validateForm, setResult, setStoreLoading, setStoreError, addToHistory]
  );

  /**
   * 에러 초기화
   */
  const clearError = useCallback(() => {
    setError(null);
    setStoreError(null);
  }, [setStoreError]);

  return {
    executeMatching,
    isLoading,
    error,
    clearError,
    currentResult,
  };
}

