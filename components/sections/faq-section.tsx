"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/**
 * FAQ 섹션 컴포넌트
 * 
 * @file components/sections/faq-section.tsx
 * @description 자주 묻는 질문들을 표시하는 섹션
 * 
 * 주요 기능:
 * 1. 아코디언 형태의 FAQ
 * 2. 스크롤 애니메이션
 * 3. 접근성 지원
 * 
 * @dependencies
 * - components/ui/accordion: 아코디언 컴포넌트
 */

const faqs = [
  {
    question: "서비스 이용은 무료인가요?",
    answer: "네, 맞습니다. 함께가치 서비스는 완전 무료로 이용하실 수 있습니다. AI 추천과 기본 상담은 모두 무료로 제공됩니다.",
  },
  {
    question: "어떤 정보를 입력해야 하나요?",
    answer: "이름, 이메일, 연락처 등 기본 정보만 입력하시면 됩니다. 추가로 원하시는 보조기기 유형이나 특별한 요구사항이 있으시면 상담 시 말씀해주세요.",
  },
  {
    question: "AI 추천은 얼마나 정확한가요?",
    answer: "AI는 수많은 사용자 데이터와 전문가 지식을 바탕으로 추천합니다. 다만, 더 정확한 추천을 위해 필요시 전문가 상담을 통해 추가 정보를 확인할 수 있습니다.",
  },
  {
    question: "추천받은 보조기기를 반드시 구매해야 하나요?",
    answer: "아니요, 구매는 선택사항입니다. 추천받은 보조기기 정보를 참고하시고, 직접 판단하여 구매 여부를 결정하시면 됩니다.",
  },
  {
    question: "전문가 상담은 어떻게 받을 수 있나요?",
    answer: "정보 입력 후 추천 결과를 받으시면, 전문가 상담 신청 옵션이 제공됩니다. 원하시는 시간에 상담을 예약하실 수 있습니다.",
  },
  {
    question: "개인정보는 안전하게 보호되나요?",
    answer: "네, 개인정보 보호를 최우선으로 합니다. 입력하신 정보는 보조기기 추천 목적에만 사용되며, 제3자에게 제공되지 않습니다.",
  },
];

export function FAQSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log("[FAQSection] 섹션이 뷰포트에 진입했습니다.");
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
        "bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900",
        "transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              "text-gray-900 dark:text-white",
              "transition-all duration-700 delay-100",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            자주 묻는 질문
          </h2>
          <p
            className={cn(
              "text-lg md:text-xl text-gray-600 dark:text-gray-300",
              "transition-all duration-700 delay-200",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            궁금하신 점이 있으시면 언제든지 문의해주세요.
          </p>
        </div>

        {/* FAQ 아코디언 */}
        <div
          className={cn(
            "transition-all duration-700 delay-300",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-gray-800 rounded-lg px-6 border shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-lg text-gray-900 dark:text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

