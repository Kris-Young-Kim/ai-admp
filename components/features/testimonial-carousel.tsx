"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 후기 캐러셀 컴포넌트
 * 
 * @file components/features/testimonial-carousel.tsx
 * @description 사용자 후기를 표시하는 캐러셀
 * 
 * 주요 기능:
 * 1. 후기 카드 표시
 * 2. 이전/다음 네비게이션
 * 3. 페이징 인디케이터
 * 4. 모바일 최적화
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - components/ui/button: 버튼 컴포넌트
 * - lucide-react: 아이콘
 */

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  profile_image_url?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  className,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // 자동 재생
  React.useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={cn("relative", className)}>
      <Card>
        <CardContent className="p-8">
          {/* 후기 내용 */}
          <div className="text-center mb-6">
            <div className="flex justify-center gap-1 mb-4" aria-label={`평점 ${currentTestimonial.rating}점`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-2xl",
                    i < currentTestimonial.rating
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  )}
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>
            <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              "{currentTestimonial.content}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              {currentTestimonial.profile_image_url ? (
                <img
                  src={currentTestimonial.profile_image_url}
                  alt={currentTestimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {currentTestimonial.name}
                </div>
                {currentTestimonial.role && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {currentTestimonial.role}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          {testimonials.length > 1 && (
            <>
              <div className="flex justify-between items-center mb-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  aria-label="이전 후기"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </Button>

                {/* 페이징 인디케이터 */}
                <div
                  className="flex gap-2"
                  role="tablist"
                  aria-label="후기 페이지 인디케이터"
                >
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentIndex
                          ? "bg-blue-600 w-8"
                          : "bg-gray-300 dark:bg-gray-600"
                      )}
                      aria-label={`후기 ${index + 1}로 이동`}
                      aria-selected={index === currentIndex}
                      role="tab"
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  aria-label="다음 후기"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              {/* 현재 위치 표시 */}
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                {currentIndex + 1} / {testimonials.length}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

