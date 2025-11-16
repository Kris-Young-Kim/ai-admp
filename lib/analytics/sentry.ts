/**
 * Sentry 유틸리티 함수
 * 
 * @file lib/analytics/sentry.ts
 * @description Sentry 에러 트래킹 및 성능 모니터링 헬퍼
 * 
 * 주요 기능:
 * 1. 에러 캡처
 * 2. 커스텀 이벤트 추적
 * 3. 성능 모니터링
 * 
 * @dependencies
 * - @sentry/nextjs: Sentry SDK (설치 필요)
 */

/**
 * 에러를 Sentry에 보고
 * 
 * @param error - 에러 객체
 * @param context - 추가 컨텍스트 정보
 */
export function captureError(
  error: Error,
  context?: Record<string, any>
): void {
  if (typeof window === "undefined") {
    // 서버 사이드
    try {
      // @ts-ignore - Sentry가 설치되지 않았을 수 있음
      const Sentry = require("@sentry/nextjs");
      Sentry.captureException(error, {
        contexts: {
          custom: context,
        },
      });
    } catch {
      // Sentry가 설치되지 않은 경우 무시
      console.error("Sentry Error:", error, context);
    }
  } else {
    // 클라이언트 사이드
    try {
      // @ts-ignore
      if (window.Sentry) {
        // @ts-ignore
        window.Sentry.captureException(error, {
          contexts: {
            custom: context,
          },
        });
      }
    } catch {
      console.error("Sentry Error:", error, context);
    }
  }
}

/**
 * 커스텀 메시지를 Sentry에 보고
 * 
 * @param message - 메시지
 * @param level - 로그 레벨
 * @param context - 추가 컨텍스트 정보
 */
export function captureMessage(
  message: string,
  level: "info" | "warning" | "error" = "info",
  context?: Record<string, any>
): void {
  if (typeof window === "undefined") {
    try {
      // @ts-ignore
      const Sentry = require("@sentry/nextjs");
      Sentry.captureMessage(message, {
        level,
        contexts: {
          custom: context,
        },
      });
    } catch {
      console.log(`[${level.toUpperCase()}]`, message, context);
    }
  } else {
    try {
      // @ts-ignore
      if (window.Sentry) {
        // @ts-ignore
        window.Sentry.captureMessage(message, {
          level,
          contexts: {
            custom: context,
          },
        });
      }
    } catch {
      console.log(`[${level.toUpperCase()}]`, message, context);
    }
  }
}

/**
 * 성능 트랜잭션 시작
 * 
 * @param name - 트랜잭션 이름
 * @param op - 작업 유형
 * @returns 트랜잭션 객체 또는 null
 */
export function startTransaction(
  name: string,
  op: string = "custom"
): any {
  try {
    if (typeof window === "undefined") {
      // @ts-ignore
      const Sentry = require("@sentry/nextjs");
      // @ts-ignore
      return Sentry.startTransaction({ name, op });
    } else {
      // @ts-ignore
      if (window.Sentry) {
        // @ts-ignore
        return window.Sentry.startTransaction({ name, op });
      }
    }
  } catch {
    // Sentry가 설치되지 않은 경우
  }
  return null;
}

