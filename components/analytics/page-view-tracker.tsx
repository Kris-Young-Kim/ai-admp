"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics/gtm";

/**
 * 페이지뷰 추적 컴포넌트
 * 
 * @file components/analytics/page-view-tracker.tsx
 * @description Next.js App Router에서 페이지뷰를 GTM에 전송하는 컴포넌트
 * 
 * 주요 기능:
 * 1. 경로 변경 감지
 * 2. GTM에 페이지뷰 이벤트 전송
 * 
 * @dependencies
 * - next/navigation: usePathname 훅
 * - lib/analytics/gtm: GTM 이벤트 전송 유틸리티
 */
export function PageViewTracker() {
  const pathname = usePathname();

  React.useEffect(() => {
    // 페이지뷰 추적
    trackPageView(pathname, document.title);
    console.log("[PageViewTracker] GTM 페이지뷰 전송:", pathname);
  }, [pathname]);

  return null;
}

