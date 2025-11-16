"use client";

import * as React from "react";
import { TestimonialCarousel } from "@/components/features/testimonial-carousel";
import { cn } from "@/lib/utils";

/**
 * 후기 섹션 컴포넌트
 * 
 * @file components/sections/testimonial-section.tsx
 * @description 사용자 후기를 표시하는 섹션
 * 
 * 주요 기능:
 * 1. 후기 캐러셀
 * 2. 모바일 최적화
 * 
 * @dependencies
 * - components/features/testimonial-carousel: 후기 캐러셀
 */

// 임시 후기 데이터 (실제로는 Supabase에서 가져옴)
const testimonials = [
  {
    id: "1",
    name: "김사용",
    role: "보조기기 사용자",
    content:
      "AI 추천 덕분에 정말 적합한 보조기기를 찾을 수 있었습니다. 복잡한 정보를 직접 찾아볼 필요 없이 간단한 질문만으로 추천받을 수 있어서 너무 편리했어요.",
    rating: 5,
  },
  {
    id: "2",
    name: "이도움",
    role: "보호자",
    content:
      "어머니를 위한 보조기기를 찾고 있었는데, 이 서비스가 정말 큰 도움이 되었습니다. 전문가의 도움 없이도 적합한 제품을 찾을 수 있어서 감사합니다.",
    rating: 5,
  },
  {
    id: "3",
    name: "박추천",
    role: "재활 전문가",
    content:
      "제 환자들에게 이 서비스를 추천하고 있습니다. AI 기반 추천이 정확하고, 사용자 친화적인 인터페이스가 인상적입니다.",
    rating: 4,
  },
];

export function TestimonialSection() {
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

  // 로그: Testimonial 섹션 렌더링 정보
  React.useEffect(() => {
    console.group("[TestimonialSection] 렌더링 정보");
    console.log("후기 개수:", testimonials.length);
    console.log("가시성:", isVisible);
    console.groupEnd();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 px-4 bg-gray-50 dark:bg-gray-800"
      aria-labelledby="testimonial-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="testimonial-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          사용자 후기
        </h2>

        <div
          className={cn(
            "transition-opacity duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}

