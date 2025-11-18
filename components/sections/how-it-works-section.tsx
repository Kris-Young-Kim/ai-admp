"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles, Gift, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 작동 방식 섹션 컴포넌트
 * 
 * @file components/sections/how-it-works-section.tsx
 * @description 서비스 이용 과정을 단계별로 설명하는 섹션
 * 
 * 주요 기능:
 * 1. 4단계 프로세스 표시
 * 2. 단계별 아이콘과 설명
 * 3. 스크롤 애니메이션
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - lucide-react: 아이콘
 */

const steps = [
  {
    step: 1,
    icon: FileText,
    title: "정보 입력",
    description: "이름, 이메일, 연락처 등 간단한 정보를 입력합니다.",
  },
  {
    step: 2,
    icon: Sparkles,
    title: "AI 분석",
    description: "AI가 당신의 정보를 분석하여 최적의 보조기기를 찾습니다.",
  },
  {
    step: 3,
    icon: Gift,
    title: "맞춤 추천",
    description: "당신에게 가장 적합한 보조기기 추천 목록을 받습니다.",
  },
  {
    step: 4,
    icon: CheckCircle2,
    title: "선택 및 구매",
    description: "추천받은 보조기기 중에서 선택하여 구매할 수 있습니다.",
  },
];

export function HowItWorksSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log("[HowItWorksSection] 섹션이 뷰포트에 진입했습니다.");
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-16 lg:py-24 px-4",
        "bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900",
        "transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2
            id="how-it-works-heading"
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              "text-gray-900 dark:text-white",
              "transition-all duration-700 delay-100",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            어떻게 작동하나요?
          </h2>
          <p
            className={cn(
              "text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto",
              "transition-all duration-700 delay-200",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            간단한 4단계로 당신에게 맞는 보조기기를 찾을 수 있습니다.
          </p>
        </div>

        {/* 단계 카드 그룹 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          role="list"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className={cn(
                  "hover:shadow-lg transition-all duration-300 relative",
                  "transition-all duration-700",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{
                  transitionDelay: `${300 + index * 100}ms`,
                }}
                role="listitem"
              >
                <CardHeader>
                  {/* 단계 번호 배지 */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <Icon
                        className="h-8 w-8 text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-center">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
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

