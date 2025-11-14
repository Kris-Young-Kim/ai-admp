"use client"

/**
 * @file slider.tsx
 * @description Slider 컴포넌트 - 접근성 최적화된 슬라이더 컴포넌트
 *
 * 이 컴포넌트는 WCAG 2.1 AA 기준을 준수하는 접근성 기능을 포함합니다.
 *
 * 주요 기능:
 * 1. 단일 슬라이더 (단일 값 선택)
 * 2. 이중 슬라이더 (범위 선택)
 * 3. 실시간 값 표시
 * 4. 키보드 네비게이션 (화살표 키, Home, End)
 * 5. 접근성 지원 (role="slider", aria-label, aria-valuemin, aria-valuemax, aria-valuenow)
 *
 * 접근성 사용 가이드:
 * - 모든 슬라이더에 aria-label 제공
 * - 값의 의미를 명확히 설명 (예: "예산 범위", "나이 선택")
 * - 단위 표시 (예: "원", "세")
 *
 * @example
 * ```tsx
 * // 단일 슬라이더
 * <Slider
 *   value={[50]}
 *   onValueChange={(value) => console.log(value[0])}
 *   min={0}
 *   max={100}
 *   step={1}
 *   aria-label="예산 선택"
 * />
 *
 * // 이중 슬라이더 (범위)
 * <Slider
 *   value={[20, 80]}
 *   onValueChange={(value) => console.log(value)}
 *   min={0}
 *   max={100}
 *   step={10}
 *   aria-label="예산 범위 선택"
 * />
 * ```
 *
 * @dependencies
 * - @radix-ui/react-slider: 슬라이더 컴포넌트
 */

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { useFormContext, Controller } from "react-hook-form"

import { cn } from "@/lib/utils"
import { FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showValue?: boolean
  valueLabel?: (value: number) => string
  unit?: string
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showValue = false, valueLabel, unit = "", ...props }, ref) => {
  // 로그: Slider 값 변경
  const handleValueChange = (value: number[]) => {
    console.log(`[Slider] 값 변경:`, value)
    if (props.onValueChange) {
      props.onValueChange(value)
    }
  }

  const formatValue = (value: number) => {
    if (valueLabel) {
      return valueLabel(value)
    }
    return `${value}${unit}`
  }

  return (
    <div className="w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {props.value?.map((val, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            role="slider"
            aria-label={
              props["aria-label"]
                ? props.value && props.value.length > 1
                  ? `${props["aria-label"]} ${i + 1}`
                  : props["aria-label"]
                : `슬라이더 ${i + 1}`
            }
            aria-valuemin={props.min || 0}
            aria-valuemax={props.max || 100}
            aria-valuenow={val}
            tabIndex={0}
          >
            {showValue && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
                {formatValue(val)}
              </span>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
      {showValue && props.value && (
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{formatValue(props.min || 0)}</span>
          <span className="font-medium text-foreground">
            {props.value.length === 1
              ? formatValue(props.value[0])
              : `${formatValue(props.value[0])} - ${formatValue(props.value[1])}`}
          </span>
          <span>{formatValue(props.max || 100)}</span>
        </div>
      )}
    </div>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

// ============================================================================
// FormSlider - react-hook-form 통합 컴포넌트
// ============================================================================

interface FormSliderProps extends Omit<SliderProps, "value" | "onValueChange"> {
  name: string
  label?: string
  description?: string
  required?: boolean
}

/**
 * FormSlider 컴포넌트
 * 
 * react-hook-form과 통합된 Slider 컴포넌트입니다.
 * Form 내부에서 사용하여 자동으로 폼 상태를 관리합니다.
 * 
 * @example
 * ```tsx
 * <Form {...form}>
 *   <FormSlider
 *     name="budget"
 *     label="예산"
 *     description="원하시는 예산 범위를 선택해주세요."
 *     min={0}
 *     max={10000000}
 *     step={100000}
 *     unit="원"
 *     showValue
 *   />
 * </Form>
 * ```
 */
export function FormSlider({
  name,
  label,
  description,
  required = false,
  ...sliderProps
}: FormSliderProps) {
  const { control } = useFormContext()

  return (
    <FormItem>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      {description && <FormDescription>{description}</FormDescription>}
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Slider
              value={field.value || [sliderProps.min || 0]}
              onValueChange={field.onChange}
              aria-label={label || name}
              {...sliderProps}
            />
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export { Slider, FormSlider }
export type { SliderProps, FormSliderProps }

