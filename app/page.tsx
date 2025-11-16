import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { LeadForm } from "@/components/lead-form";

/**
 * 인덱스 페이지 (랜딩 페이지)
 * 
 * @file app/page.tsx
 * @description 일반적인 랜딩 페이지 구조 - 여러 섹션으로 구성
 * 
 * 주요 기능:
 * 1. Hero 섹션 - 메인 헤드라인과 CTA
 * 2. 문제 공감 섹션 - 사용자 문제 설명
 * 3. 해결책 섹션 - 서비스 해결 방법
 * 4. 기능/특징 섹션 - 주요 기능 소개
 * 5. 작동 방식 섹션 - 단계별 프로세스
 * 6. 사용자 후기 섹션 - 신뢰도 향상
 * 7. FAQ 섹션 - 자주 묻는 질문
 * 8. 정보 수집 폼 섹션 - 최종 CTA
 * 
 * @dependencies
 * - components/sections/*: 각종 섹션 컴포넌트들
 * - components/lead-form: 정보 수집 폼 컴포넌트
 */

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero 섹션 */}
      <HeroSection />

      {/* 문제 공감 섹션 */}
      <ProblemSection />

      {/* 해결책 섹션 */}
      <SolutionSection />

      {/* 기능/특징 섹션 */}
      <FeaturesSection />

      {/* 작동 방식 섹션 */}
      <HowItWorksSection />

      {/* 사용자 후기 섹션 */}
      <TestimonialsSection />

      {/* FAQ 섹션 */}
      <FAQSection />

      {/* 정보 수집 폼 섹션 (최종 CTA) */}
      <section
        id="contact-form"
        className="py-16 lg:py-24 px-4 bg-white dark:bg-gray-900"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              간단한 정보만 입력하시면, AI가 당신에게 가장 적합한 보조기기를 추천해드립니다.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
