"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { trackPageView } from "@/lib/analytics/ga4";

/**
 * Analytics Provider 컴포넌트
 * 
 * @file components/providers/analytics-provider.tsx
 * @description Google Analytics 4 및 기타 분석 도구 초기화
 * 
 * 주요 기능:
 * 1. Google Analytics 초기화
 * 2. 페이지뷰 자동 추적
 * 3. 환경 변수 확인
 * 
 * @dependencies
 * - @next/third-parties/google: Next.js GA4 통합
 * - lib/analytics/ga4: GA4 유틸리티
 */

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  // 페이지뷰 자동 추적
  useEffect(() => {
    if (pathname && ga4MeasurementId) {
      trackPageView(pathname);
    }
  }, [pathname, ga4MeasurementId]);

  return (
    <>
      {children}
      {/* Google Analytics 4 스크립트 로드 */}
      {ga4MeasurementId && (
        <GoogleAnalytics gaId={ga4MeasurementId} />
      )}
    </>
  );
}

