"use client"

/**
 * @file skip-link.tsx
 * @description SkipLink 컴포넌트 - 주 콘텐츠로 건너뛰기 링크
 *
 * 이 컴포넌트는 키보드 사용자가 반복되는 네비게이션을 건너뛰고
 * 주 콘텐츠로 바로 이동할 수 있도록 합니다.
 *
 * 접근성 기능:
 * - 키보드 포커스 시에만 표시
 * - Tab 키로 접근 가능
 * - 스크린 리더 최적화
 *
 * @example
 * ```tsx
 * <SkipLink href="#main-content">주 콘텐츠로 건너뛰기</SkipLink>
 * <main id="main-content">...</main>
 * ```
 */

import * as React from "react"
import { cn } from "@/lib/utils"

interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children?: React.ReactNode
}

export function SkipLink({ href, children = "주 콘텐츠로 건너뛰기", className, ...props }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
        "focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground",
        "focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring",
        "transition-all",
        className
      )}
      aria-label={typeof children === "string" ? children : "주 콘텐츠로 건너뛰기"}
      {...props}
    >
      {children}
    </a>
  )
}

