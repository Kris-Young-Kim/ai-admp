"use client";

import * as React from "react";
import { PricingCard } from "@/components/features/pricing-card";
import { cn } from "@/lib/utils";

/**
 * 요금제 섹션 컴포넌트
 * 
 * @file components/sections/pricing-section.tsx
 * @description 요금제를 표시하는 섹션
 * 
 * 주요 기능:
 * 1. 3개 요금제 카드
 * 2. 기능 체크리스트
 * 3. 권장 배지
 * 
 * @dependencies
 * - components/features/pricing-card: 요금제 카드
 */

// 임시 요금제 데이터 (실제로는 Supabase에서 가져옴)
const pricingPlans = [
  {
    name: "무료",
    price: 0,
    description: "기본 기능을 무료로 사용하세요",
    features: [
      { text: "기본 AI 추천", included: true },
      { text: "상위 3개 추천", included: true },
      { text: "기본 비교 기능", included: true },
      { text: "우선 지원", included: false },
      { text: "전문가 상담", included: false },
    ],
    ctaText: "무료로 시작하기",
    ctaHref: "#demo",
  },
  {
    name: "프리미엄",
    price: 9900,
    period: "월",
    description: "더 많은 기능과 우선 지원",
    recommended: true,
    features: [
      { text: "고급 AI 추천", included: true },
      { text: "상위 10개 추천", included: true },
      { text: "상세 비교 기능", included: true },
      { text: "우선 지원", included: true },
      { text: "전문가 상담", included: false },
    ],
    ctaText: "프리미엄 시작하기",
    ctaHref: "/pricing",
  },
  {
    name: "프로",
    price: 19900,
    period: "월",
    description: "모든 기능과 전문가 상담",
    features: [
      { text: "최고급 AI 추천", included: true },
      { text: "무제한 추천", included: true },
      { text: "전체 비교 기능", included: true },
      { text: "우선 지원", included: true },
      { text: "전문가 상담", included: true },
    ],
    ctaText: "프로 시작하기",
    ctaHref: "/pricing",
  },
];

export function PricingSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

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

  // 로그: Pricing 섹션 렌더링 정보
  React.useEffect(() => {
    console.group("[PricingSection] 렌더링 정보");
    console.log("요금제 개수:", pricingPlans.length);
    console.log("가시성:", isVisible);
    console.groupEnd();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 px-4 bg-white dark:bg-gray-900"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="pricing-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white"
        >
          요금제
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          당신에게 맞는 요금제를 선택하세요
        </p>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-8",
            "transition-opacity duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          role="list"
          aria-label="요금제 목록"
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              role="listitem"
              className={cn(
                "transition-all duration-500",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

