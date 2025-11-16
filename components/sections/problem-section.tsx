"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Search, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 문제 공감 섹션 컴포넌트
 * 
 * @file components/sections/problem-section.tsx
 * @description 사용자가 겪는 문제들을 공감하고 설명하는 섹션
 * 
 * 주요 기능:
 * 1. 3개의 주요 문제 카드 표시
 * 2. 스크롤 애니메이션 (fade-in)
 * 3. 반응형 레이아웃
 * 4. 접근성 지원
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - lucide-react: 아이콘
 */

const problems = [
  {
    icon: Search,
    title: "어떤 보조기기를 선택해야 할지 모르겠어요",
    description: "수많은 보조기기 중에서 자신에게 맞는 제품을 찾기 어렵고, 복잡한 사양과 기능을 비교하는 것이 부담스럽습니다.",
  },
  {
    icon: Clock,
    title: "시간과 노력을 많이 투자해야 해요",
    description: "여러 쇼핑몰을 돌아다니며 비교하고, 리뷰를 읽고, 전문가 상담을 받는 과정이 번거롭고 시간이 많이 걸립니다.",
  },
  {
    icon: AlertCircle,
    title: "잘못된 선택으로 후회하는 경우가 많아요",
    description: "실제 사용해보니 자신의 상황에 맞지 않아서 돈과 시간을 낭비하게 되는 경우가 자주 발생합니다.",
  },
];

export function ProblemSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log("[ProblemSection] 섹션이 뷰포트에 진입했습니다.");
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
        "py-16 lg:py-24 px-4 bg-white dark:bg-gray-900",
        "transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2
            id="problem-heading"
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              "text-gray-900 dark:text-white",
              "transition-all duration-700 delay-100",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            이런 고민이 있으신가요?
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
            보조기기 선택의 어려움, 우리가 함께 해결하겠습니다.
          </p>
        </div>

        {/* 문제 카드 그룹 */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          role="list"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card
                key={index}
                className={cn(
                  "hover:shadow-lg transition-all duration-300",
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
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Icon
                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle className="text-xl md:text-2xl">
                      {problem.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {problem.description}
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

