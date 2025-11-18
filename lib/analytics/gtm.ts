"use client";

/**
 * Google Tag Manager 통합
 * 
 * @file lib/analytics/gtm.ts
 * @description Google Tag Manager 이벤트 추적 유틸리티
 * 
 * 주요 기능:
 * 1. GTM dataLayer를 통한 이벤트 전송
 * 2. 커스텀 이벤트 추적
 * 3. 페이지뷰 추적
 * 
 * @dependencies
 * - dataLayer: Google Tag Manager 전역 배열
 */

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * GTM 이벤트 전송
 * 
 * @param eventName - 이벤트 이름
 * @param eventParams - 이벤트 파라미터
 */
export function pushGTMEvent(
  eventName: string,
  eventParams?: Record<string, any>
): void {
  if (typeof window === "undefined" || !window.dataLayer) {
    console.warn("⚠️ GTM dataLayer가 초기화되지 않았습니다");
    return;
  }

  try {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
    console.log("📊 GTM 이벤트 전송:", eventName, eventParams);
  } catch (error) {
    console.error("❌ GTM 이벤트 전송 실패:", error);
  }
}

/**
 * 페이지뷰 추적
 * 
 * @param pagePath - 페이지 경로
 * @param pageTitle - 페이지 제목
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === "undefined" || !window.dataLayer) {
    return;
  }

  try {
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_title: pageTitle,
    });
    console.log("📊 GTM 페이지뷰:", pagePath);
  } catch (error) {
    console.error("❌ GTM 페이지뷰 추적 실패:", error);
  }
}

/**
 * GTM 헬퍼 함수들
 */
export const gtm = {
  /**
   * CTA 클릭 추적
   */
  ctaClick: (location: string, elementId?: string) => {
    pushGTMEvent("cta_click", {
      location,
      element_id: elementId,
    });
  },

  /**
   * 폼 제출 추적
   */
  formSubmit: (formName: string, success: boolean, data?: Record<string, any>) => {
    pushGTMEvent("form_submit", {
      form_name: formName,
      success,
      ...data,
    });
  },

  /**
   * 섹션 스크롤 추적
   */
  sectionScroll: (sectionName: string) => {
    pushGTMEvent("section_scroll", {
      section_name: sectionName,
    });
  },

  /**
   * 상품 클릭 추적
   */
  productClick: (productId: string, productName: string) => {
    pushGTMEvent("product_click", {
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
    pushGTMEvent("matching_request", data);
  },

  /**
   * 매칭 성공 추적
   */
  matchingSuccess: (data: {
    matching_id: string;
    recommendations_count: number;
    processing_time_ms: number;
  }) => {
    pushGTMEvent("matching_success", data);
  },
};

