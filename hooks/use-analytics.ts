"use client";

import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, trackEvent, AnalyticsEvent } from "@/lib/api/analytics";

/**
 * 분석 이벤트 추적 커스텀 훅
 * 
 * @file hooks/use-analytics.ts
 * @description 사용자 행동을 추적하는 커스텀 훅
 * 
 * 주요 기능:
 * 1. 페이지 뷰 자동 추적
 * 2. 커스텀 이벤트 추적
 * 3. 헬퍼 함수 제공
 * 
 * @dependencies
 * - lib/api/analytics: 분석 API 클라이언트
 * - next/navigation: 라우팅 정보
 */

export function useAnalytics() {
  const pathname = usePathname();

  // 페이지 뷰 자동 추적
  useEffect(() => {
    if (pathname) {
      analytics.pageView(pathname);
    }
  }, [pathname]);

  /**
   * 커스텀 이벤트 추적
   */
  const track = useCallback(async (event: AnalyticsEvent) => {
    await trackEvent(event);
  }, []);

  /**
   * CTA 클릭 추적
   */
  const trackCTAClick = useCallback(
    async (location: string, elementId?: string) => {
      await analytics.ctaClick(location, elementId);
    },
    []
  );

  /**
   * 폼 제출 추적
   */
  const trackFormSubmit = useCallback(
    async (formName: string, success: boolean) => {
      await analytics.formSubmit(formName, success);
    },
    []
  );

  /**
   * 섹션 스크롤 추적
   */
  const trackSectionScroll = useCallback(
    async (sectionName: string) => {
      await analytics.sectionScroll(sectionName);
    },
    []
  );

  /**
   * 상품 클릭 추적
   */
  const trackProductClick = useCallback(
    async (productId: string, productName: string) => {
      await analytics.productClick(productId, productName);
    },
    []
  );

  return {
    track,
    trackCTAClick,
    trackFormSubmit,
    trackSectionScroll,
    trackProductClick,
    // 편의 함수들도 직접 접근 가능
    analytics,
  };
}

