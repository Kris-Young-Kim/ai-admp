"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 사용자 후기 섹션 컴포넌트
 * 
 * @file components/sections/testimonials-section.tsx
 * @description 실제 사용자들의 후기를 표시하는 섹션
 * 
 * 주요 기능:
 * 1. 사용자 후기 카드 표시
 * 2. 인용구 스타일
 * 3. 스크롤 애니메이션
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - lucide-react: 아이콘
 */

const testimonials = [
  {
    name: "김○○님",
    role: "보조기기 사용자",
    content: "어떤 보조기기를 선택해야 할지 막막했는데, AI 추천 덕분에 정말 만족스러운 제품을 찾았어요. 복잡한 비교 과정 없이 간단하게 선택할 수 있어서 좋았습니다.",
    rating: 5,
  },
  {
    name: "이○○님",
    role: "보조기기 사용자",
    content: "여러 쇼핑몰을 돌아다니며 비교하는 게 너무 번거로웠는데, 여기서 한 번에 추천받아서 시간을 많이 절약했어요. 추천해드리고 싶습니다!",
    rating: 5,
  },
  {
    name: "박○○님",
    role: "보조기기 사용자",
    content: "전문가 상담도 받을 수 있어서 더욱 신뢰할 수 있었어요. AI 추천과 전문가 의견이 일치해서 확신을 가지고 구매할 수 있었습니다.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log("[TestimonialsSection] 섹션이 뷰포트에 진입했습니다.");
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
        "py-16 lg:py-24 px-4 bg-white dark:bg-gray-900",
        "transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              "text-gray-900 dark:text-white",
              "transition-all duration-700 delay-100",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            사용자 후기
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
            함께가치를 이용하신 분들의 생생한 후기입니다.
          </p>
        </div>

        {/* 후기 카드 그룹 */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          role="list"
        >
          {testimonials.map((testimonial, index) => (
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
              <CardContent className="pt-6">
                {/* 인용 아이콘 */}
                <Quote
                  className="h-8 w-8 text-blue-500 dark:text-blue-400 mb-4"
                  aria-hidden="true"
                />
                
                {/* 후기 내용 */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                {/* 사용자 정보 */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                  
                  {/* 별점 */}
                  <div className="mt-2 flex gap-1" aria-label={`${testimonial.rating}점`}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span
                        key={i}
                        className="text-yellow-400 text-lg"
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

