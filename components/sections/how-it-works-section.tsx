"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles, Gift, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 작동 방식 섹션 컴포넌트
 * 
 * @file components/sections/how-it-works-section.tsx
 * @description 서비스 작동 방식을 4단계로 설명하는 섹션
 * 
 * 주요 기능:
 * 1. 4단계 프로세스 다이어그램
 * 2. 각 단계 설명 텍스트
 * 3. 애니메이션 (스테거드 진입)
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - lucide-react: 아이콘
 */

interface Step {
  number: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: FileText,
    title: "정보 입력",
    description: "신체 부위와 활동 정보를 입력하세요",
  },
  {
    number: 2,
    icon: Sparkles,
    title: "AI 분석",
    description: "AI가 당신의 요구사항을 분석합니다",
  },
  {
    number: 3,
    icon: Gift,
    title: "추천 받기",
    description: "최적의 보조기기 3개를 추천받습니다",
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "선택하기",
    description: "추천된 제품 중에서 선택하세요",
  },
];

export function HowItWorksSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  // Intersection Observer로 스크롤 트리거 애니메이션
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 로그: HowItWorks 섹션 렌더링 정보
  React.useEffect(() => {
    console.group("[HowItWorksSection] 렌더링 정보");
    console.log("단계 개수:", steps.length);
    console.log("가시성:", isVisible);
    console.groupEnd();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-16 lg:py-24 px-4 bg-white dark:bg-gray-900"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="how-it-works-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          작동 방식
        </h2>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-4 gap-8",
            "transition-opacity duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          role="list"
          aria-label="작동 단계 목록"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                role="listitem"
                className={cn(
                  "text-center p-6 bg-gray-50 dark:bg-gray-800",
                  "transition-all duration-500",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <CardContent className="p-0">
                  {/* 단계 번호 */}
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>

                  {/* 아이콘 */}
                  <div className="mb-4 flex justify-center">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>

                  {/* 제목 */}
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

