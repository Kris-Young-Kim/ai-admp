"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 해결책 섹션 컴포넌트
 * 
 * @file components/sections/solution-section.tsx
 * @description 우리 서비스가 어떻게 문제를 해결하는지 설명하는 섹션
 * 
 * 주요 기능:
 * 1. 해결책 메시지 표시
 * 2. 주요 장점 리스트
 * 3. CTA 버튼
 * 4. 스크롤 애니메이션
 * 
 * @dependencies
 * - components/ui/button: 버튼 컴포넌트
 * - lucide-react: 아이콘
 */

const benefits = [
  "AI가 당신의 상황에 맞는 보조기기를 추천",
  "복잡한 비교 과정 없이 간단하게 선택",
  "실제 사용자 후기와 전문가 검증 정보 제공",
  "무료로 시작하고 만족할 때까지 지원",
];

export function SolutionSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log("[SolutionSection] 섹션이 뷰포트에 진입했습니다.");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-16 lg:py-24 px-4",
        "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900",
        "transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-labelledby="solution-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* 아이콘 */}
        <div
          className={cn(
            "mb-6 flex justify-center",
            "transition-all duration-700 delay-100",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          <div className="p-4 rounded-full bg-blue-500 dark:bg-blue-600">
            <Sparkles className="h-12 w-12 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* 헤드라인 */}
        <h2
          id="solution-heading"
          className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
            "text-gray-900 dark:text-white",
            "transition-all duration-700 delay-200",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          AI가 당신의 파트너가 됩니다
        </h2>

        {/* 서브헤드라인 */}
        <p
          className={cn(
            "text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8",
            "transition-all duration-700 delay-300",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          복잡한 선택 과정을 AI가 대신해드립니다.
          <br />
          당신은 단지 간단한 정보만 입력하면 됩니다.
        </p>

        {/* 장점 리스트 */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left",
            "transition-all duration-700 delay-400",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <CheckCircle2
                className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
            </div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div
          className={cn(
            "transition-all duration-700 delay-500",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6"
            aria-label="지금 시작하기 - 정보 수집 폼으로 이동"
          >
            <a href="#contact-form">지금 시작하기</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

