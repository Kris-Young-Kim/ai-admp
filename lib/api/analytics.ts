import { APIError } from "./matching";

/**
 * 분석 API 클라이언트
 * 
 * @file lib/api/analytics.ts
 * @description 분석 이벤트 추적 API를 호출하는 클라이언트 함수
 * 
 * 주요 기능:
 * 1. 단일 이벤트 추적
 * 2. 배치 이벤트 추적
 * 3. 에러 처리 (실패해도 앱 동작에 영향 없음)
 * 
 * @dependencies
 * - lib/api/matching: APIError 클래스
 */

export interface AnalyticsEvent {
  event_name: string;
  event_data?: Record<string, any>;
}

export interface AnalyticsRequest {
  event?: AnalyticsEvent;
  events?: AnalyticsEvent[];
}

export interface AnalyticsResponse {
  success: boolean;
  saved_count: number;
  event_ids: string[];
  error?: string;
  details?: any;
}

/**
 * 분석 이벤트 추적 (단일)
 * 
 * @param event - 이벤트 데이터
 * @returns 성공 여부 (실패해도 에러를 throw하지 않음)
 */
export async function trackEvent(
  event: AnalyticsEvent
): Promise<boolean> {
  try {
    const response = await fetch("/api/analytics/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event }),
    });

    const data: AnalyticsResponse = await response.json();

    if (!response.ok || !data.success) {
      console.warn("⚠️ 분석 이벤트 추적 실패:", data.error || data.details);
      return false;
    }

    return true;
  } catch (error) {
    // 분석 이벤트 추적 실패는 앱 동작에 영향을 주지 않음
    console.warn("⚠️ 분석 이벤트 추적 오류:", error);
    return false;
  }
}

/**
 * 분석 이벤트 배치 추적
 * 
 * @param events - 이벤트 배열
 * @returns 성공 여부 (실패해도 에러를 throw하지 않음)
 */
export async function trackEvents(
  events: AnalyticsEvent[]
): Promise<boolean> {
  if (events.length === 0) {
    return true;
  }

  try {
    const response = await fetch("/api/analytics/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events }),
    });

    const data: AnalyticsResponse = await response.json();

    if (!response.ok || !data.success) {
      console.warn("⚠️ 분석 이벤트 배치 추적 실패:", data.error || data.details);
      return false;
    }

    return true;
  } catch (error) {
    // 분석 이벤트 추적 실패는 앱 동작에 영향을 주지 않음
    console.warn("⚠️ 분석 이벤트 배치 추적 오류:", error);
    return false;
  }
}

/**
 * 일반적인 이벤트 추적 헬퍼 함수들
 */
export const analytics = {
  /**
   * 페이지 뷰 추적
   */
  pageView: (page: string, data?: Record<string, any>) =>
    trackEvent({
      event_name: "page_view",
      event_data: { page, ...data },
    }),

  /**
   * CTA 버튼 클릭 추적
   */
  ctaClick: (location: string, elementId?: string) =>
    trackEvent({
      event_name: "cta_click",
      event_data: { location, element_id: elementId },
    }),

  /**
   * 폼 제출 추적
   */
  formSubmit: (formName: string, success: boolean) =>
    trackEvent({
      event_name: "form_submit",
      event_data: { form_name: formName, success },
    }),

  /**
   * 섹션 스크롤 추적
   */
  sectionScroll: (sectionName: string) =>
    trackEvent({
      event_name: "section_scroll",
      event_data: { section_name: sectionName },
    }),

  /**
   * 상품 클릭 추적
   */
  productClick: (productId: string, productName: string) =>
    trackEvent({
      event_name: "product_click",
      event_data: { product_id: productId, product_name: productName },
    }),
};

