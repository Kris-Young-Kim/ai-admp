"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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

  // 페이지뷰 자동 추적
  useEffect(() => {
    if (pathname) {
      // gtag가 로드될 때까지 대기
      const checkGtag = setInterval(() => {
        if (typeof window !== "undefined" && window.gtag) {
          trackPageView(pathname);
          clearInterval(checkGtag);
        }
      }, 100);

      // 5초 후 타임아웃
      setTimeout(() => clearInterval(checkGtag), 5000);
    }
  }, [pathname]);

  return (
    <>
      {children}
      {/* Google Analytics 4는 layout.tsx에서 직접 로드하므로 여기서는 제거 */}
    </>
  );
}

