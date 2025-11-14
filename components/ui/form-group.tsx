"use client"

/**
 * @file form-group.tsx
 * @description FormGroup 컴포넌트 - Radio button과 Checkbox 그룹을 위한 공통 컴포넌트
 *
 * 이 컴포넌트는 react-hook-form과 통합되어 Radio button 그룹과 Checkbox 그룹을
 * 제공합니다. 접근성과 유효성 검사를 지원합니다.
 *
 * 주요 기능:
 * 1. Radio button 그룹 (단일 선택)
 * 2. Checkbox 그룹 (다중 선택)
 * 3. react-hook-form 통합
 * 4. 접근성 지원 (role="group", aria-label)
 * 5. 유효성 검사 및 에러 메시지 표시
 *
 * @dependencies
 * - react-hook-form: 폼 상태 관리
 * - @radix-ui/react-radio-group: Radio 그룹 컴포넌트
 * - @radix-ui/react-checkbox: Checkbox 컴포넌트
 * - @radix-ui/react-label: 라벨 컴포넌트
 */

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { useFormContext, Controller } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"

// ============================================================================
// Radio Group Components
// ============================================================================

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// ============================================================================
// Checkbox Components
// ============================================================================

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

// ============================================================================
// FormGroup Components
// ============================================================================

interface FormGroupOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface BaseFormGroupProps {
  name: string
  label?: string
  description?: string
  options: FormGroupOption[]
  className?: string
  required?: boolean
  orientation?: "horizontal" | "vertical"
}

interface RadioFormGroupProps extends BaseFormGroupProps {
  type: "radio"
}

interface CheckboxFormGroupProps extends BaseFormGroupProps {
  type: "checkbox"
}

type FormGroupProps = RadioFormGroupProps | CheckboxFormGroupProps

/**
 * FormGroup 컴포넌트
 * 
 * Radio button 그룹 또는 Checkbox 그룹을 렌더링합니다.
 * react-hook-form과 통합되어 자동으로 폼 상태를 관리합니다.
 * 
 * @example
 * ```tsx
 * // Radio Group
 * <FormGroup
 *   type="radio"
 *   name="preference"
 *   label="선호도"
 *   options={[
 *     { value: "option1", label: "옵션 1" },
 *     { value: "option2", label: "옵션 2" }
 *   ]}
 * />
 * 
 * // Checkbox Group
 * <FormGroup
 *   type="checkbox"
 *   name="interests"
 *   label="관심사"
 *   options={[
 *     { value: "tech", label: "기술" },
 *     { value: "design", label: "디자인" }
 *   ]}
 * />
 * ```
 */
export function FormGroup(props: FormGroupProps) {
  const { control } = useFormContext()
  const {
    name,
    label,
    description,
    options,
    className,
    required = false,
    orientation = "vertical",
  } = props

  const groupId = React.useId()
  const groupLabelId = `${groupId}-label`
  const groupDescriptionId = description ? `${groupId}-description` : undefined

  // 로그: FormGroup 컴포넌트 렌더링 정보
  React.useEffect(() => {
    console.group(`[FormGroup] ${props.type} 그룹 렌더링`)
    console.log("필드명:", name)
    console.log("라벨:", label)
    console.log("옵션 개수:", options.length)
    console.log("필수 여부:", required)
    console.log("방향:", orientation)
    console.groupEnd()
  }, [name, label, options.length, required, orientation, props.type])

  if (props.type === "radio") {
    return (
      <FormItem className={className}>
        {label && (
          <FormLabel htmlFor={groupId} id={groupLabelId} required={required}>
            {label}
          </FormLabel>
        )}
        {description && (
          <FormDescription id={groupDescriptionId}>
            {description}
          </FormDescription>
        )}
        <FormControl>
          <Controller
            name={name}
            control={control}
            render={({ field }) => {
              // 로그: Radio 선택 변경
              const handleValueChange = (value: string) => {
                console.log(`[FormGroup] Radio 선택 변경: ${name} = ${value}`)
                field.onChange(value)
              }

              return (
                <RadioGroup
                  value={field.value}
                  onValueChange={handleValueChange}
                  aria-labelledby={label ? groupLabelId : undefined}
                  aria-describedby={groupDescriptionId}
                  role="group"
                  className={cn(
                    orientation === "horizontal" && "grid-cols-2 md:grid-cols-3",
                    orientation === "vertical" && "grid-cols-1"
                  )}
                >
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${groupId}-${option.value}`}
                      disabled={option.disabled}
                    />
                    <Label
                      htmlFor={`${groupId}-${option.value}`}
                      className="font-normal cursor-pointer"
                    >
                      {option.label}
                      {option.description && (
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {option.description}
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
                </RadioGroup>
              )
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )
  }

  // Checkbox Group
  return (
    <FormItem className={className}>
      {label && (
        <FormLabel htmlFor={groupId} id={groupLabelId} required={required}>
          {label}
        </FormLabel>
      )}
      {description && (
        <FormDescription id={groupDescriptionId}>
          {description}
        </FormDescription>
      )}
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const values = (field.value as string[]) || []
            
            return (
              <div
                role="group"
                aria-labelledby={label ? groupLabelId : undefined}
                aria-describedby={groupDescriptionId}
                className={cn(
                  "grid gap-3",
                  orientation === "horizontal" && "grid-cols-2 md:grid-cols-3",
                  orientation === "vertical" && "grid-cols-1"
                )}
              >
                {options.map((option) => {
                  const isChecked = values.includes(option.value)
                  
                  return (
                    <div
                      key={option.value}
                      className="flex items-start space-x-2"
                    >
                      <Checkbox
                        id={`${groupId}-${option.value}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          // 로그: Checkbox 선택 변경
                          if (checked) {
                            const newValues = [...values, option.value]
                            console.log(`[FormGroup] Checkbox 선택: ${name} =`, newValues)
                            field.onChange(newValues)
                          } else {
                            const newValues = values.filter((v) => v !== option.value)
                            console.log(`[FormGroup] Checkbox 해제: ${name} =`, newValues)
                            field.onChange(newValues)
                          }
                        }}
                        disabled={option.disabled}
                      />
                      <Label
                        htmlFor={`${groupId}-${option.value}`}
                        className="font-normal cursor-pointer leading-tight"
                      >
                        {option.label}
                        {option.description && (
                          <span className="block text-xs text-muted-foreground mt-0.5">
                            {option.description}
                          </span>
                        )}
                      </Label>
                    </div>
                  )
                })}
              </div>
            )
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export { RadioGroup, RadioGroupItem, Checkbox, FormGroup }
export type { FormGroupProps, FormGroupOption }


