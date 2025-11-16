"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, FileText, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 문제 공감 섹션 컴포넌트
 * 
 * @file components/sections/pain-points-section.tsx
 * @description 사용자의 문제점을 공감하는 섹션
 * 
 * 주요 기능:
 * 1. 3개 문제 카드
 * 2. 각 카드: 아이콘 + 제목 + 설명
 * 3. 호버 애니메이션
 * 4. Bento Grid 레이아웃
 * 5. 스크롤 트리거 애니메이션
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - lucide-react: 아이콘
 */

interface PainPoint {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const painPoints: PainPoint[] = [
  {
    icon: Search,
    title: "적합한 보조기기를 찾기 어려워요",
    description:
      "수많은 제품 중에서 자신에게 맞는 것을 선택하는 것이 어렵습니다.",
  },
  {
    icon: FileText,
    title: "제품 정보가 너무 복잡해요",
    description:
      "기술적인 용어와 복잡한 설명으로 이해하기 어렵습니다.",
  },
  {
    icon: BarChart3,
    title: "직접 비교하기 힘들어요",
    description:
      "여러 제품을 한눈에 비교하고 평가하기 어렵습니다.",
  },
];

export function PainPointsSection() {
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

  // 로그: PainPoints 섹션 렌더링 정보
  React.useEffect(() => {
    console.group("[PainPointsSection] 렌더링 정보");
    console.log("문제 카드 개수:", painPoints.length);
    console.log("가시성:", isVisible);
    console.groupEnd();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="pain-points"
      className="py-16 lg:py-24 px-4 bg-white dark:bg-gray-900"
      aria-labelledby="pain-points-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="pain-points-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          이런 고민 있으신가요?
        </h2>

        {/* Bento Grid 레이아웃 */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-8",
            "transition-opacity duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          role="list"
          aria-label="문제점 목록"
        >
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card
                key={index}
                role="listitem"
                className={cn(
                  "p-6 bg-gray-50 dark:bg-gray-800",
                  "border border-gray-200 dark:border-gray-700",
                  "hover:shadow-lg hover:scale-105",
                  "transition-all duration-300",
                  "cursor-default",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="mb-4 p-3 rounded-full bg-blue-100 dark:bg-blue-900/30"
                      aria-hidden="true"
                    >
                      <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {point.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

