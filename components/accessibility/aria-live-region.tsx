"use client";

import * as React from "react";

/**
 * ARIA Live Region 컴포넌트
 * 
 * @file components/accessibility/aria-live-region.tsx
 * @description 동적 콘텐츠 업데이트를 스크린 리더에 알리는 컴포넌트
 * 
 * 주요 기능:
 * 1. 동적 콘텐츠 업데이트 알림
 * 2. 에러 메시지 접근 가능하게 제공
 * 3. 로딩 상태 접근 가능하게 표시
 * 
 * @dependencies
 * - React: 상태 관리
 */

// Window 인터페이스 확장
declare global {
  interface Window {
    announceToScreenReader?: (
      message: string,
      priority?: "polite" | "assertive"
    ) => void;
  }
}

interface AriaLiveRegionProps {
  /**
   * Live region의 우선순위
   * - "polite": 현재 작업이 끝난 후 알림
   * - "assertive": 즉시 알림
   */
  priority?: "polite" | "assertive";
  /**
   * 표시할 메시지
   */
  message?: string;
  /**
   * 메시지 ID (같은 메시지 반복 방지)
   */
  messageId?: string;
}

/**
 * AriaLiveRegion 컴포넌트
 * 
 * 동적 콘텐츠 업데이트를 스크린 리더 사용자에게 알립니다.
 */
export function AriaLiveRegion({
  priority = "polite",
  message,
  messageId,
}: AriaLiveRegionProps) {
  const [announcement, setAnnouncement] = React.useState<string>("");
  const announcementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (message) {
      setAnnouncement(message);
      
      // 메시지가 변경되면 스크린 리더에 알림
      // 짧은 지연 후 메시지를 지워서 같은 메시지도 다시 읽을 수 있게 함
      const timer = setTimeout(() => {
        setAnnouncement("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message, messageId]);

  return (
    <div
      ref={announcementRef}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      aria-relevant="additions text"
    >
      {announcement}
    </div>
  );
}

/**
 * 전역 Live Region Provider
 * 
 * 앱 전체에서 사용할 수 있는 Live Region
 */
export function GlobalAriaLiveRegion() {
  const [message, setMessage] = React.useState<string>("");
  const [priority, setPriority] = React.useState<"polite" | "assertive">("polite");
  const messageIdRef = React.useRef(0);

  // 전역 함수로 메시지 설정 가능
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.announceToScreenReader = (
        msg: string,
        pri: "polite" | "assertive" = "polite"
      ) => {
        setMessage(msg);
        setPriority(pri);
        messageIdRef.current += 1;
      };
    }
  }, []);

  return (
    <AriaLiveRegion
      message={message}
      priority={priority}
      messageId={messageIdRef.current.toString()}
    />
  );
}

