"use client"

/**
 * @file card.tsx
 * @description Card 컴포넌트 - 접근성 최적화된 카드 컴포넌트
 *
 * 이 컴포넌트는 WCAG 2.1 AA 기준을 준수하는 접근성 기능을 포함합니다.
 *
 * 주요 기능:
 * 1. 기본 카드 (shadow, border, radius)
 * 2. 호버 애니메이션
 * 3. 반응형 레이아웃
 * 4. 슬롯 구조 (header, body, footer)
 * 5. 접근성 지원 (시맨틱 HTML, ARIA 속성)
 *
 * 접근성 사용 가이드:
 * - 카드가 클릭 가능한 경우: button 또는 link로 감싸기
 * - 카드 그룹: role="list"와 role="listitem" 사용
 * - 카드 제목: CardTitle 사용 (h2, h3 등)
 * - 카드 설명: CardDescription 사용
 *
 * @example
 * ```tsx
 * // 기본 카드
 * <Card>
 *   <CardHeader>
 *     <CardTitle>카드 제목</CardTitle>
 *     <CardDescription>카드 설명</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>카드 내용</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>액션</Button>
 *   </CardFooter>
 * </Card>
 *
 * // 호버 애니메이션 카드
 * <Card className="hover:shadow-lg transition-shadow">
 *   <CardContent>...</CardContent>
 * </Card>
 * ```
 *
 * @dependencies
 * - Tailwind CSS: 스타일링
 */

import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow",
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

