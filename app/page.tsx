import { HeroSection } from "@/components/sections/hero-section";
import { LeadForm } from "@/components/lead-form";

/**
 * 인덱스 페이지 (랜딩 페이지)
 * 
 * @file app/page.tsx
 * @description 단순화된 랜딩 페이지 - Hero 섹션과 정보 수집 폼만 포함
 * 
 * 주요 기능:
 * 1. Hero 섹션 표시
 * 2. 사용자 정보 수집 폼 (이름, 이메일, 연락처)
 * 3. 반응형 레이아웃
 * 
 * @dependencies
 * - components/sections/hero-section: Hero 섹션 컴포넌트
 * - components/lead-form: 정보 수집 폼 컴포넌트
 */

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero 섹션 */}
      <HeroSection />

      {/* 정보 수집 폼 섹션 */}
      <section
        id="contact-form"
        className="py-16 lg:py-24 px-4 bg-white dark:bg-gray-900"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              지금 바로 신청하세요
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
