"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { FormGroup } from "@/components/ui/form-group";
import { FormSlider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import { useFormStore } from "@/store/formStore";

/**
 * 매칭 질문 페이지
 * 
 * @file app/matching/questions/page.tsx
 * @description 사용자가 매칭을 위한 질문에 답하는 페이지
 * 
 * 주요 기능:
 * 1. 3개 질문 폼 (라디오, 체크박스, 슬라이더)
 * 2. 폼 검증 로직
 * 3. 로딩 상태
 * 4. 결과 페이지로 이동
 * 
 * @dependencies
 * - react-hook-form: 폼 상태 관리
 * - zod: 스키마 검증
 * - store/formStore: 폼 데이터 저장
 */

// 폼 스키마 정의
const matchingFormSchema = z.object({
  primary_body_part: z.string().min(1, "신체 부위를 선택해주세요"),
  activities: z.array(z.string()).min(1, "최소 1개 이상의 활동을 선택해주세요"),
  budget_min: z.number().min(0),
  budget_max: z.number().min(0),
}).refine((data) => data.budget_min <= data.budget_max, {
  message: "최대 예산은 최소 예산보다 크거나 같아야 합니다",
  path: ["budget_max"],
});

type MatchingFormData = z.infer<typeof matchingFormSchema>;

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

export default function MatchingQuestionsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { updateFormData } = useFormStore();

  const form = useForm<MatchingFormData>({
    resolver: zodResolver(matchingFormSchema),
    defaultValues: {
      primary_body_part: "",
      activities: [],
      budget_min: 0,
      budget_max: 10000000,
    },
  });

  // 폼 제출 핸들러
  const onSubmit = async (data: MatchingFormData) => {
    console.group("[MatchingQuestionsPage] 폼 제출");
    console.log("폼 데이터:", data);
    console.groupEnd();

    setIsSubmitting(true);

    try {
      // formStore에 데이터 저장
      updateFormData(data);

      // 결과 페이지로 이동 (쿼리 파라미터로 데이터 전달)
      const params = new URLSearchParams({
        body_part: data.primary_body_part,
        activities: data.activities.join(","),
        budget_min: data.budget_min.toString(),
        budget_max: data.budget_max.toString(),
      });

      router.push(`/matching/results?${params.toString()}`);
    } catch (err) {
      console.error("[MatchingQuestionsPage] 제출 실패:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            AI 보조기기 매칭
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            간단한 질문에 답하시면<br />
            AI가 당신에게 가장 적합한 보조기기를 추천해드립니다
          </p>
        </div>

        <Card className="bg-white dark:bg-gray-900 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-6 w-6 text-blue-600" aria-hidden="true" />
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

                {/* 제출 버튼 */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? "처리 중입니다..." : "추천 받기"}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                      처리 중...
                    </>
                  ) : (
                    <>
                      추천 받기
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

