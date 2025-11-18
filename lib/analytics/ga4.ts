"use client";

/**
 * Google Analytics 4 통합
 * 
 * @file lib/analytics/ga4.ts
 * @description Google Analytics 4 이벤트 추적 유틸리티
 * 
 * 주요 기능:
 * 1. GA4 이벤트 전송
 * 2. 커스텀 이벤트 추적
 * 3. 페이지뷰 추적
 * 
 * @dependencies
 * - gtag: Google Analytics 전역 함수
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * GA4 이벤트 전송
 * 
 * @param eventName - 이벤트 이름
 * @param eventParams - 이벤트 파라미터
 */
export function sendGA4Event(
  eventName: string,
  eventParams?: Record<string, any>
): void {
  if (typeof window === "undefined" || !window.gtag) {
    console.warn("⚠️ GA4 gtag가 초기화되지 않았습니다");
    return;
  }

  try {
    window.gtag("event", eventName, eventParams);
    console.log("📊 GA4 이벤트 전송:", eventName, eventParams);
  } catch (error) {
    console.error("❌ GA4 이벤트 전송 실패:", error);
  }
}

/**
 * 페이지뷰 추적
 * 
 * @param pagePath - 페이지 경로
 * @param pageTitle - 페이지 제목
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  try {
    // 환경 변수 또는 하드코딩된 Measurement ID 사용
    const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-V280YE71BV";
    window.gtag("config", measurementId, {
      page_path: pagePath,
      page_title: pageTitle,
    });
    console.log("📊 GA4 페이지뷰:", pagePath);
  } catch (error) {
    console.error("❌ GA4 페이지뷰 추적 실패:", error);
  }
}

/**
 * GA4 헬퍼 함수들
 */
export const ga4 = {
  /**
   * CTA 클릭 추적
   */
  ctaClick: (location: string, elementId?: string) => {
    sendGA4Event("cta_click", {
      location,
      element_id: elementId,
    });
  },

  /**
   * 폼 제출 추적
   */
  formSubmit: (formName: string, success: boolean) => {
    sendGA4Event("form_submit", {
      form_name: formName,
      success,
    });
  },

  /**
   * 섹션 스크롤 추적
   */
  sectionScroll: (sectionName: string) => {
    sendGA4Event("section_scroll", {
      section_name: sectionName,
    });
  },

  /**
   * 상품 클릭 추적
   */
  productClick: (productId: string, productName: string) => {
    sendGA4Event("product_click", {
      product_id: productId,
      product_name: productName,
    });
  },

  /**
   * 매칭 요청 추적
   */
  matchingRequest: (data: {
    primary_body_part: string;
    activities_count: number;
    budget_range: string;
  }) => {
    sendGA4Event("matching_request", data);
  },

  /**
   * 매칭 성공 추적
   */
  matchingSuccess: (data: {
    matching_id: string;
    recommendations_count: number;
    processing_time_ms: number;
  }) => {
    sendGA4Event("matching_success", data);
  },
};

