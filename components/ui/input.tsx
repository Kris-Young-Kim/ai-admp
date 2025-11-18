"use client"

/**
 * @file input.tsx
 * @description Input 컴포넌트 - React Aria 통합으로 접근성 향상
 *
 * 이 컴포넌트는 React Aria의 useTextField 훅을 사용하여
 * 폼 입력 필드의 접근성을 향상시킵니다.
 *
 * 주요 접근성 기능:
 * 1. 라벨 자동 연결
 * 2. 에러 메시지 자동 연결
 * 3. 키보드 네비게이션 자동 지원
 * 4. 스크린 리더 최적화
 *
 * @dependencies
 * - @react-aria/textfield: 텍스트 필드 접근성 훅
 * - @react-aria/focus: 포커스 관리 훅
 */

import * as React from "react"
import { useTextField } from "@react-aria/textfield"
import { useFocusRing } from "@react-aria/focus"
import type { AriaTextFieldProps } from "@react-aria/textfield"

import { cn } from "@/lib/utils"

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof AriaTextFieldProps<HTMLInputElement> | "autoCapitalize"
> & {
  autoCapitalize?: "on" | "off" | "none" | "sentences" | "words" | "characters"
}

type InputProps = AriaTextFieldProps<HTMLInputElement> &
  NativeInputProps & {
    label?: string
    description?: string
    errorMessage?: string
  }

function Input({ className, type, label, description, errorMessage, ...props }: InputProps) {
  const ref = React.useRef<HTMLInputElement>(null)

  // React Aria: 텍스트 필드 접근성 훅
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      label,
      description,
      errorMessage,
      type,
      ...props,
    },
    ref
  )

  // React Aria: 포커스 링 관리
  const { isFocusVisible, focusProps } = useFocusRing()

  // 로그: Input 컴포넌트 렌더링 정보
  React.useEffect(() => {
    console.group("[Input] React Aria 통합 정보")
    console.log("라벨:", label)
    console.log("입력 props:", inputProps)
    console.log("포커스 상태:", isFocusVisible)
    console.groupEnd()
  }, [label, inputProps, isFocusVisible])

  return (
    <div className="w-full">
      {label && (
        <label {...labelProps} className="text-sm font-medium mb-1 block">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          isFocusVisible && "ring-2 ring-ring ring-offset-2",
          className
        )}
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        {...focusProps}
        {...props}
      />
      {description && (
        <p {...descriptionProps} className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      )}
      {errorMessage && (
        <p {...errorMessageProps} className="text-sm text-destructive mt-1" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export { Input }
export type { InputProps }
