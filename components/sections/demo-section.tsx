"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormGroup } from "@/components/ui/form-group";
import { FormSlider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

/**
 * AI 데모 섹션 컴포넌트
 * 
 * @file components/sections/demo-section.tsx
 * @description AI 매칭 데모 도구를 제공하는 섹션
 * 
 * 주요 기능:
 * 1. 3개 질문 폼 (라디오, 체크박스, 슬라이더)
 * 2. 폼 검증 로직
 * 3. 로딩 상태 (스피너)
 * 4. 실시간 추천 결과 표시
 * 5. 결과 카드 (상품 3개)
 * 6. 에러 처리
 * 
 * @dependencies
 * - react-hook-form: 폼 상태 관리
 * - zod: 스키마 검증
 * - hooks/use-matching: 매칭 로직
 * - store/formStore: 폼 데이터 저장
 */

// 폼 스키마 정의
const demoFormSchema = z.object({
  primary_body_part: z.string().min(1, "신체 부위를 선택해주세요"),
  activities: z.array(z.string()).min(1, "최소 1개 이상의 활동을 선택해주세요"),
  budget_min: z.number().min(0),
  budget_max: z.number().min(0),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

const bodyPartOptions = [
  { value: "upper_limb", label: "상지 (팔, 손)" },
  { value: "lower_limb", label: "하지 (다리, 발)" },
  { value: "spine", label: "척추" },
  { value: "neck", label: "목" },
  { value: "whole_body", label: "전신" },
];

const activityOptions = [
  { value: "household", label: "가사 활동" },
  { value: "work", label: "직업 활동" },
  { value: "leisure", label: "여가 활동" },
  { value: "mobility", label: "이동" },
  { value: "self_care", label: "자가 관리" },
];

export function DemoSection() {
  const form = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      primary_body_part: "",
      activities: [],
      budget_min: 0,
      budget_max: 10000000,
    },
  });

  // 폼 제출 핸들러 (비활성화됨)
  const onSubmit = (data: DemoFormData) => {
    // 제출 비활성화 - 아무 동작도 하지 않음
    console.log("[DemoSection] 제출 비활성화됨:", data);
  };

  return (
    <section
      id="demo"
      className="py-16 lg:py-24 px-4 bg-gray-50 dark:bg-gray-800"
      aria-labelledby="demo-heading"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="demo-heading"
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            AI가 추천해드립니다
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            간단한 질문에 답하시면 AI가 당신에게 가장 적합한 보조기기를 추천해드립니다.
          </p>
        </div>

        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" aria-hidden="true" />
              매칭 질문
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* 질문 1: 신체 부위 (라디오) */}
                <FormGroup
                  type="radio"
                  name="primary_body_part"
                  label="주로 도움이 필요한 신체 부위는 어디인가요?"
                  description="가장 많이 사용하실 보조기기의 부위를 선택해주세요."
                  options={bodyPartOptions}
                  required
                />

                {/* 질문 2: 활동 (체크박스) */}
                <FormGroup
                  type="checkbox"
                  name="activities"
                  label="주로 어떤 활동에 사용하시나요?"
                  description="해당하는 모든 활동을 선택해주세요."
                  options={activityOptions}
                  required
                />

                {/* 질문 3: 예산 (슬라이더) */}
                <div className="space-y-4">
                  <FormSlider
                    name="budget_min"
                    label="최소 예산"
                    description="원하시는 최소 예산을 선택해주세요. (단위: 만원)"
                    min={0}
                    max={10000000}
                    step={100000}
                    showValue
                    valueLabel={(value) => `${(value / 10000).toFixed(0)}만원`}
                    required
                    aria-label="최소 예산 선택"
                  />
                  <FormSlider
                    name="budget_max"
                    label="최대 예산"
                    description="원하시는 최대 예산을 선택해주세요. (단위: 만원)"
                    min={0}
                    max={10000000}
                    step={100000}
                    showValue
                    valueLabel={(value) => `${(value / 10000).toFixed(0)}만원`}
                    required
                    aria-label="최대 예산 선택"
                  />
                  <div 
                    className="flex justify-between text-xs text-muted-foreground mt-2"
                    role="status"
                    aria-live="polite"
                    aria-atomic="false"
                  >
                    <span>
                      선택 범위: {(form.watch("budget_min") || 0) / 10000}만원 ~ {(form.watch("budget_max") || 10000000) / 10000}만원
                    </span>
                  </div>
                </div>

                {/* 제출 버튼 (비활성화) */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={true}
                  aria-label="추천 받기 (비활성화됨)"
                >
                  추천 받기
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

