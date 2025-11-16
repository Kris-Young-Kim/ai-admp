"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, Zap, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 기능/특징 섹션 컴포넌트
 * 
 * @file components/sections/features-section.tsx
 * @description 서비스의 주요 기능과 특징을 소개하는 섹션
 * 
 * 주요 기능:
 * 1. 4개의 주요 기능 카드 표시
 * 2. 스크롤 애니메이션
 * 3. 반응형 그리드 레이아웃
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - lucide-react: 아이콘
 */

const features = [
  {
    icon: Brain,
    title: "AI 기반 맞춤 추천",
    description: "최신 AI 기술로 당신의 상황과 필요에 딱 맞는 보조기기를 추천합니다.",
  },
  {
    icon: Zap,
    title: "빠르고 간편한 프로세스",
    description: "복잡한 절차 없이 몇 분 안에 최적의 보조기기를 찾을 수 있습니다.",
  },
  {
    icon: Shield,
    title: "신뢰할 수 있는 정보",
    description: "실제 사용자 후기와 전문가 검증을 통해 신뢰할 수 있는 정보를 제공합니다.",
  },
  {
    icon: Users,
    title: "전문가 상담 지원",
    description: "필요하시면 전문가와의 상담을 통해 더욱 정확한 추천을 받을 수 있습니다.",
  },
];

export function FeaturesSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log("[FeaturesSection] 섹션이 뷰포트에 진입했습니다.");
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
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2
            id="features-heading"
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              "text-gray-900 dark:text-white",
              "transition-all duration-700 delay-100",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            왜 함께가치를 선택해야 할까요?
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
            AI 기술과 전문가 지식이 만나 더 나은 선택을 도와드립니다.
          </p>
        </div>

        {/* 기능 카드 그룹 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          role="list"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className={cn(
                  "hover:shadow-lg transition-all duration-300",
                  "text-center",
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
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <Icon
                        className="h-8 w-8 text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

