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
import { RecommendationCard } from "@/components/features/recommendation-card";
import { useMatching } from "@/hooks/use-matching";
import { useFormStore } from "@/store/formStore";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecommendedProduct } from "@/store/matchingStore";

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
  const [showResults, setShowResults] = React.useState(false);
  const { executeMatching, isLoading, error, currentResult } = useMatching();
  const { updateFormData } = useFormStore();

  const form = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      primary_body_part: "",
      activities: [],
      budget_min: 0,
      budget_max: 10000000,
    },
  });

  // 폼 제출 핸들러
  const onSubmit = async (data: DemoFormData) => {
    console.group("[DemoSection] 폼 제출");
    console.log("폼 데이터:", data);
    console.groupEnd();

    // formStore에 데이터 저장
    updateFormData(data);

    try {
      // 매칭 실행
      await executeMatching(data);
      setShowResults(true);

      // 결과 섹션으로 스크롤
      setTimeout(() => {
        const resultsElement = document.getElementById("demo-results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    } catch (err) {
      console.error("[DemoSection] 매칭 실패:", err);
    }
  };

  // 로그: Demo 섹션 렌더링 정보
  React.useEffect(() => {
    console.group("[DemoSection] 렌더링 정보");
    console.log("로딩 상태:", isLoading);
    console.log("에러:", error);
    console.log("결과 표시:", showResults);
    console.log("결과 개수:", currentResult?.recommendations.length || 0);
    console.groupEnd();
  }, [isLoading, error, showResults, currentResult]);

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
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    예산 범위 <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-muted-foreground">
                    원하시는 예산 범위를 선택해주세요.
                  </p>
                  <div className="px-2">
                    <FormSlider
                      name="budget_min"
                      label=""
                      min={0}
                      max={10000000}
                      step={100000}
                      showValue
                      valueLabel={(value) => `${(value / 10000).toFixed(0)}만원`}
                    />
                    <FormSlider
                      name="budget_max"
                      label=""
                      min={0}
                      max={10000000}
                      step={100000}
                      showValue
                      valueLabel={(value) => `${(value / 10000).toFixed(0)}만원`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>최소: {(form.watch("budget_min") || 0) / 10000}만원</span>
                    <span>최대: {(form.watch("budget_max") || 10000000) / 10000}만원</span>
                  </div>
                </div>

                {/* 에러 메시지 */}
                {error && (
                  <div
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200"
                    role="alert"
                    aria-live="assertive"
                  >
                    {error}
                  </div>
                )}

                {/* 제출 버튼 */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                  aria-label={isLoading ? "매칭 중입니다..." : "추천 받기"}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      AI가 분석 중입니다...
                    </>
                  ) : (
                    "추천 받기"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* 결과 표시 */}
        {showResults && currentResult && currentResult.recommendations.length > 0 && (
          <div
            id="demo-results"
            className="mt-12"
            aria-live="polite"
            aria-atomic="true"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              추천 결과
            </h3>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              role="list"
              aria-label="추천 상품 목록"
            >
              {currentResult.recommendations.slice(0, 3).map((product, index) => (
                <div key={product.product_id} role="listitem">
                  <RecommendationCard
                    product={product}
                    rank={index + 1}
                    onProductClick={(product) => {
                      console.log("[DemoSection] 상품 클릭:", product.product_id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 결과 없음 */}
        {showResults && currentResult && currentResult.recommendations.length === 0 && (
          <div
            className="mt-12 p-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-center"
            role="alert"
          >
            <p className="text-lg text-yellow-800 dark:text-yellow-200">
              조건에 맞는 보조기기를 찾지 못했습니다. 다른 조건으로 다시 시도해보세요.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

