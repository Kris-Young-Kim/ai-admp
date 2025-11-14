"use client"

/**
 * @file app/slider-test/page.tsx
 * @description Slider 컴포넌트 접근성 및 기능 테스트 페이지
 *
 * 이 페이지는 Slider 컴포넌트의 접근성 속성(role="slider")과
 * 다양한 기능을 테스트하기 위한 예제 페이지입니다.
 *
 * 주요 테스트 항목:
 * 1. 접근성 속성 검증 (role="slider", aria-label, aria-valuemin/max/now)
 * 2. 단일 슬라이더 (budget)
 * 3. 이중 슬라이더 (범위 선택)
 * 4. 실시간 값 표시
 * 5. 키보드 상호작용 (화살표 키, Home, End)
 * 6. react-hook-form 통합
 */

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { Slider, FormSlider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

// 폼 스키마 정의
const formSchema = z.object({
  budget: z.array(z.number()).min(1).max(1, "단일 값만 입력 가능합니다."),
  budgetRange: z.array(z.number()).length(2, "최소값과 최대값을 모두 선택해주세요."),
  age: z.array(z.number()).min(1).max(1),
  volume: z.array(z.number()).min(1).max(1),
})

type FormValues = z.infer<typeof formSchema>

export default function SliderTestPage() {
  const [singleValue, setSingleValue] = useState([50])
  const [rangeValue, setRangeValue] = useState([20, 80])
  const [volumeValue, setVolumeValue] = useState([30])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: [5000000],
      budgetRange: [1000000, 5000000],
      age: [25],
      volume: [50],
    },
  })

  const onSubmit = (data: FormValues) => {
    console.group("[Slider Test] 폼 제출")
    console.log("제출된 데이터:", data)
    console.groupEnd()
    alert(`폼이 제출되었습니다!\n\n${JSON.stringify(data, null, 2)}`)
  }

  // 접근성 속성 확인 함수
  const checkAccessibility = () => {
    const sliders = document.querySelectorAll('[role="slider"]')
    const results: Array<{
      id: string
      hasAriaLabel: boolean
      hasAriaValueMin: boolean
      hasAriaValueMax: boolean
      hasAriaValueNow: boolean
      ariaLabel?: string
      valueMin?: string
      valueMax?: string
      valueNow?: string
    }> = []

    sliders.forEach((slider, index) => {
      const id = slider.getAttribute("id") || `slider-${index}`
      const ariaLabel = slider.getAttribute("aria-label")
      const ariaValueMin = slider.getAttribute("aria-valuemin")
      const ariaValueMax = slider.getAttribute("aria-valuemax")
      const ariaValueNow = slider.getAttribute("aria-valuenow")

      results.push({
        id,
        hasAriaLabel: !!ariaLabel,
        hasAriaValueMin: !!ariaValueMin,
        hasAriaValueMax: !!ariaValueMax,
        hasAriaValueNow: !!ariaValueNow,
        ariaLabel: ariaLabel || undefined,
        valueMin: ariaValueMin || undefined,
        valueMax: ariaValueMax || undefined,
        valueNow: ariaValueNow || undefined,
      })
    })

    console.group("[Slider Test] 접근성 속성 검증 결과")
    console.table(results)
    console.groupEnd()

    // 결과 요약
    const summary = results.map((r) => {
      const checks = [
        r.hasAriaLabel ? "✓ aria-label" : "✗ aria-label",
        r.hasAriaValueMin ? "✓ aria-valuemin" : "✗ aria-valuemin",
        r.hasAriaValueMax ? "✓ aria-valuemax" : "✗ aria-valuemax",
        r.hasAriaValueNow ? "✓ aria-valuenow" : "✗ aria-valuenow",
      ].join(", ")
      return `${r.id}: ${checks}`
    }).join("\n")

    const issues = results.filter(
      (r) => !r.hasAriaLabel || !r.hasAriaValueMin || !r.hasAriaValueMax || !r.hasAriaValueNow
    )
    const issueCount = issues.length

    alert(
      `접근성 검증 결과:\n\n${summary}\n\n` +
      (issueCount > 0
        ? `⚠️ 경고: ${issueCount}개의 슬라이더에 접근성 속성이 누락되었습니다.`
        : "✅ 모든 슬라이더가 접근성 기준을 만족합니다.")
    )
  }

  // 숫자 포맷팅 함수
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Slider 컴포넌트 접근성 테스트</h1>
          <p className="text-muted-foreground mb-4">
            Slider 컴포넌트의 접근성 속성(role="slider")과 기능을 테스트합니다.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={checkAccessibility}
            className="mb-4"
            aria-label="접근성 속성 검증"
          >
            접근성 속성 검증
          </Button>
        </div>

        {/* 단일 슬라이더 테스트 */}
        <section aria-labelledby="single-heading">
          <h2 id="single-heading" className="text-2xl font-semibold mb-4">
            단일 슬라이더 테스트
          </h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                기본 슬라이더 (0-100)
              </label>
              <Slider
                value={singleValue}
                onValueChange={setSingleValue}
                min={0}
                max={100}
                step={1}
                showValue
                aria-label="기본 슬라이더"
              />
              <p className="text-sm text-muted-foreground mt-2">
                현재 값: {singleValue[0]}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                볼륨 조절 (0-100)
              </label>
              <Slider
                value={volumeValue}
                onValueChange={setVolumeValue}
                min={0}
                max={100}
                step={5}
                showValue
                unit="%"
                aria-label="볼륨 조절"
              />
              <p className="text-sm text-muted-foreground mt-2">
                현재 볼륨: {volumeValue[0]}%
              </p>
            </div>
          </div>
        </section>

        {/* 이중 슬라이더 테스트 (범위) */}
        <section aria-labelledby="range-heading">
          <h2 id="range-heading" className="text-2xl font-semibold mb-4">
            이중 슬라이더 테스트 (범위 선택)
          </h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                예산 범위 선택
              </label>
              <Slider
                value={rangeValue}
                onValueChange={setRangeValue}
                min={0}
                max={10000000}
                step={100000}
                showValue
                valueLabel={formatCurrency}
                aria-label="예산 범위 선택"
              />
              <p className="text-sm text-muted-foreground mt-2">
                선택된 범위: {formatCurrency(rangeValue[0])} - {formatCurrency(rangeValue[1])}
              </p>
            </div>
          </div>
        </section>

        {/* react-hook-form 통합 테스트 */}
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-2xl font-semibold mb-4">
            react-hook-form 통합 테스트
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormSlider
                name="budget"
                label="예산"
                description="원하시는 예산을 선택해주세요. (단위: 원)"
                required
                min={0}
                max={10000000}
                step={100000}
                showValue
                valueLabel={formatCurrency}
              />

              <FormSlider
                name="budgetRange"
                label="예산 범위"
                description="원하시는 예산 범위를 선택해주세요. (단위: 원)"
                min={0}
                max={10000000}
                step={100000}
                showValue
                valueLabel={formatCurrency}
              />

              <FormSlider
                name="age"
                label="나이"
                description="본인의 나이를 선택해주세요."
                min={1}
                max={150}
                step={1}
                showValue
                unit="세"
              />

              <FormSlider
                name="volume"
                label="볼륨"
                description="원하시는 볼륨을 선택해주세요."
                min={0}
                max={100}
                step={5}
                showValue
                unit="%"
              />

              <div className="flex gap-4">
                <Button type="submit">제출하기</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset()
                    console.log("[Slider Test] 폼 리셋")
                  }}
                >
                  리셋
                </Button>
              </div>
            </form>
          </Form>
        </section>

        {/* 키보드 네비게이션 테스트 */}
        <section aria-labelledby="keyboard-heading">
          <h2 id="keyboard-heading" className="text-2xl font-semibold mb-4">
            키보드 네비게이션 테스트
          </h2>
          <div className="p-4 bg-muted rounded-lg mb-4">
            <p className="text-sm mb-2">
              <strong>사용 방법:</strong>
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Tab 키로 슬라이더로 이동</li>
              <li>← → 화살표 키로 값 조절 (1 단위)</li>
              <li>Shift + ← → 화살표 키로 값 조절 (10 단위)</li>
              <li>Home 키로 최소값으로 이동</li>
              <li>End 키로 최대값으로 이동</li>
              <li>포커스 인디케이터(파란색 링) 확인</li>
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                키보드로 조절 가능한 슬라이더
              </label>
              <Slider
                value={[50]}
                onValueChange={(value) => console.log("키보드 조절:", value)}
                min={0}
                max={100}
                step={1}
                showValue
                aria-label="키보드 네비게이션 테스트 슬라이더"
              />
            </div>
          </div>
        </section>

        {/* Disabled 상태 테스트 */}
        <section aria-labelledby="disabled-heading">
          <h2 id="disabled-heading" className="text-2xl font-semibold mb-4">
            Disabled 상태 테스트
          </h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                비활성화된 슬라이더
              </label>
              <Slider
                value={[50]}
                disabled
                min={0}
                max={100}
                step={1}
                aria-label="비활성화된 슬라이더"
              />
            </div>
          </div>
        </section>

        {/* 접근성 가이드 */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-2">접근성 검증 체크리스트</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>✓ 모든 슬라이더에 role="slider" 속성 제공</li>
            <li>✓ aria-label 속성으로 슬라이더의 목적 명시</li>
            <li>✓ aria-valuemin, aria-valuemax, aria-valuenow 속성 제공</li>
            <li>✓ 키보드로 슬라이더 조절 가능 (화살표 키, Home, End)</li>
            <li>✓ 포커스 인디케이터 명확히 표시</li>
            <li>✓ 스크린 리더가 현재 값과 범위를 읽을 수 있음</li>
            <li>✓ 실시간 값 표시 (선택사항, showValue prop)</li>
          </ul>
        </div>

        {/* 현재 폼 값 표시 (디버깅용) */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-2">현재 폼 값 (디버깅용)</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

