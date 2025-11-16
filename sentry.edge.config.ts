/**
 * Sentry Edge 설정
 * 
 * @file sentry.edge.config.ts
 * @description Sentry Edge Runtime 설정
 * 
 * 설치 후 활성화:
 * 1. pnpm add @sentry/nextjs
 * 2. NEXT_PUBLIC_SENTRY_DSN 환경 변수 설정
 * 3. 이 파일의 주석 해제
 */

/*
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // 환경 설정
  environment: process.env.NODE_ENV || "development",
  
  // 트레이싱 설정
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  
  // 성능 모니터링
  enableTracing: true,
});
*/

