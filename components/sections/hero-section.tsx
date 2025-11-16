"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hero 섹션 컴포넌트
 * 
 * @file components/sections/hero-section.tsx
 * @description 랜딩 페이지의 메인 Hero 섹션
 * 
 * 주요 기능:
 * 1. 헤드라인 + 서브카피
 * 2. CTA 버튼 그룹
 * 3. 신뢰 배지
 * 4. A/B 테스트 변수 관리 (3개 헤드라인 변형)
 * 5. 반응형 레이아웃
 * 6. 애니메이션 (fade-in, slide-up)
 * 
 * @dependencies
 * - components/ui/button: 버튼 컴포넌트
 * - lucide-react: 아이콘
 */

interface HeroVariant {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

const heroVariants: HeroVariant[] = [
  {
    headline: "AI 기반 보조기기 매칭 서비스",
    subheadline: "당신에게 가장 적합한 보조기기를\nAI가 추천해드립니다",
    ctaPrimary: "무료로 시작하기",
    ctaSecondary: "작동 방식 알아보기",
  },
  {
    headline: "맞춤형 보조기기 추천, AI가 도와드립니다",
    subheadline: "복잡한 선택 과정 없이,\n당신의 필요에 딱 맞는 보조기기를 찾아보세요",
    ctaPrimary: "지금 시작하기",
    ctaSecondary: "더 알아보기",
  },
  {
    headline: "스마트한 보조기기 선택의 시작",
    subheadline: "AI 기술로 당신의 일상에\n가장 적합한 보조기기를 추천합니다",
    ctaPrimary: "무료 체험하기",
    ctaSecondary: "서비스 소개",
  },
];

export function HeroSection() {
  const [variantIndex, setVariantIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  // A/B 테스트: localStorage에서 변형 인덱스 가져오기 또는 랜덤 선택
  React.useEffect(() => {
    const storedIndex = localStorage.getItem("hero_variant_index");
    if (storedIndex) {
      setVariantIndex(parseInt(storedIndex, 10));
    } else {
      // 랜덤 선택 (0, 1, 2)
      const randomIndex = Math.floor(Math.random() * heroVariants.length);
      setVariantIndex(randomIndex);
      localStorage.setItem("hero_variant_index", randomIndex.toString());
    }
    setIsVisible(true);
  }, []);

  const variant = heroVariants[variantIndex];

  // 로그: Hero 섹션 렌더링 정보
  React.useEffect(() => {
    console.group("[HeroSection] 렌더링 정보");
    console.log("변형 인덱스:", variantIndex);
    console.log("헤드라인:", variant.headline);
    console.log("서브헤드라인:", variant.subheadline);
    console.groupEnd();
  }, [variantIndex, variant]);

  return (
    <section
      className={cn(
        "min-h-[80vh] flex items-center justify-center px-4 py-16 lg:py-24",
        "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800",
        "transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-label="메인 Hero 섹션"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* 헤드라인 */}
        <h1
          className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-bold mb-6",
            "text-gray-900 dark:text-white",
            "transition-all duration-700 delay-100",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          {variant.headline}
        </h1>

        {/* 서브헤드라인 */}
        <p
          className={cn(
            "text-xl md:text-2xl lg:text-3xl",
            "text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto",
            "transition-all duration-700 delay-200",
            "whitespace-pre-line leading-relaxed",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          {variant.subheadline}
        </p>

        {/* CTA 버튼 그룹 */}
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center items-center mb-12",
            "transition-all duration-700 delay-300",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6"
            aria-label={`${variant.ctaPrimary} - 매칭 질문 페이지로 이동`}
          >
            <a href="/matching/questions">{variant.ctaPrimary}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6"
            aria-label={`${variant.ctaSecondary} - 작동 방식 섹션으로 이동`}
          >
            <a href="#how-it-works">{variant.ctaSecondary}</a>
          </Button>
        </div>

        {/* 신뢰 배지 */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-6 md:gap-8",
            "transition-all duration-700 delay-400",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
          role="list"
          aria-label="신뢰 배지"
        >
          <div
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            role="listitem"
          >
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-sm md:text-base font-medium">보안 인증</span>
          </div>
          <div
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            role="listitem"
          >
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-sm md:text-base font-medium">10,000+ 사용자</span>
          </div>
          <div
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            role="listitem"
          >
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-sm md:text-base font-medium">AI 기반 추천</span>
          </div>
        </div>
      </div>
    </section>
  );
}

