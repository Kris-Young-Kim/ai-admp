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
 * - @sentry/nextjs: Sentry SDK (설치 필요, 선택사항)
 */

declare global {
  interface Window {
    Sentry?: {
      captureException: (error: unknown, context?: Record<string, any>) => void
      captureMessage: (
        message: string,
        options?: { level?: "info" | "warning" | "error"; contexts?: Record<string, any> }
      ) => void
      startTransaction: (options: { name: string; op: string }) => any
    }
  }
}

type SentryModule = typeof import("@sentry/nextjs")

async function loadSentry(): Promise<SentryModule | null> {
  try {
    return await import("@sentry/nextjs")
  } catch {
    return null
  }
}

/**
 * 에러를 Sentry에 보고
 * 
 * @param error - 에러 객체
 * @param context - 추가 컨텍스트 정보
 */
export async function captureError(
  error: Error,
  context?: Record<string, any>
): Promise<void> {
  if (typeof window === "undefined") {
    // 서버 사이드
    const Sentry = await loadSentry()
    if (Sentry) {
      Sentry.captureException(error, {
        contexts: {
          custom: context,
        },
      })
    } else {
      console.error("Sentry Error:", error, context)
    }
  } else {
    // 클라이언트 사이드
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          custom: context,
        },
      })
    } else {
      console.error("Sentry Error:", error, context)
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
export async function captureMessage(
  message: string,
  level: "info" | "warning" | "error" = "info",
  context?: Record<string, any>
): Promise<void> {
  if (typeof window === "undefined") {
    const Sentry = await loadSentry()
    if (Sentry) {
      Sentry.captureMessage(message, {
        level,
        contexts: {
          custom: context,
        },
      })
    } else {
      console.log(`[${level.toUpperCase()}]`, message, context)
    }
  } else {
    if (window.Sentry) {
      window.Sentry.captureMessage(message, {
        level,
        contexts: {
          custom: context,
        },
      })
    } else {
      console.log(`[${level.toUpperCase()}]`, message, context)
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
export async function startTransaction(
  name: string,
  op: string = "custom"
): Promise<any> {
  try {
    if (typeof window === "undefined") {
      const Sentry = await loadSentry()
      if (Sentry && "startTransaction" in Sentry) {
        return (Sentry as Record<string, any>).startTransaction({ name, op })
      }
    } else {
      if (window.Sentry) {
        return window.Sentry.startTransaction({ name, op })
      }
    }
  } catch {
    // Sentry가 설치되지 않은 경우
  }
  return null;
}

