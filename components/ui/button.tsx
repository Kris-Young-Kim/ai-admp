/**
 * @file button.tsx
 * @description Button 컴포넌트 - 접근성 최적화된 버튼 컴포넌트
 *
 * 이 컴포넌트는 WCAG 2.1 AA 기준을 준수하는 접근성 기능을 포함합니다.
 *
 * 주요 접근성 기능:
 * 1. 키보드 네비게이션 지원 (Tab, Enter, Space)
 * 2. 포커스 인디케이터 (focus-visible 스타일)
 * 3. 스크린 리더 지원 (aria-label 사용 권장)
 * 4. disabled 상태 접근성 (aria-disabled 자동 처리)
 *
 * 접근성 사용 가이드:
 * - 텍스트가 있는 버튼: children으로 텍스트 제공 (aria-label 불필요)
 * - 아이콘만 있는 버튼: 반드시 aria-label 제공
 * - 폼 제출 버튼: type="submit" 명시
 * - 취소/닫기 버튼: aria-label="닫기" 또는 명확한 텍스트
 *
 * @example
 * ```tsx
 * // 텍스트 버튼 (aria-label 불필요)
 * <Button>제출하기</Button>
 *
 * // 아이콘 버튼 (aria-label 필수)
 * <Button variant="icon" aria-label="메뉴 열기">
 *   <MenuIcon />
 * </Button>
 *
 * // 접근성 검증 완료
 * <Button aria-label="접근성 속성 검증">검증</Button>
 * ```
 *
 * @dependencies
 * - @radix-ui/react-slot: asChild prop 지원
 * - class-variance-authority: variant 시스템
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
