import { AccessibilityToolbar } from "@/components/accessibility/accessibility-toolbar";
import { SkipLink } from "@/components/accessibility/skip-link";
import { TextToSpeech } from "@/components/accessibility/text-to-speech";
import { KeyboardScanMode } from "@/components/accessibility/keyboard-scan-mode";
import { GlobalAriaLiveRegion } from "@/components/accessibility/aria-live-region";
import { HeroSection } from "@/components/sections/hero-section";
import { PainPointsSection } from "@/components/sections/pain-points-section";
import { DemoSection } from "@/components/sections/demo-section";
import { TrustSection } from "@/components/sections/trust-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { Button } from "@/components/ui/button";

/**
 * 인덱스 페이지 (랜딩 페이지)
 * 
 * @file app/page.tsx
 * @description AI 보조기기 매칭 랜딩 페이지 메인 컴포넌트
 * 
 * 주요 기능:
 * 1. 모든 섹션 통합
 * 2. 접근성 기능 통합
 * 3. 반응형 레이아웃
 * 4. 성능 최적화
 * 
 * @dependencies
 * - components/accessibility: 접근성 컴포넌트들
 * - components/sections: 섹션 컴포넌트들
 */

export default function Home() {
  return (
    <>
      {/* 접근성 기능: Skip Link */}
      <SkipLink />

      {/* 메인 콘텐츠 */}
      <main id="main-content" className="min-h-screen">
        {/* Hero 섹션 */}
        <HeroSection />

        {/* 문제 공감 섹션 */}
        <PainPointsSection />

        {/* AI 데모 섹션 */}
        <DemoSection />

        {/* 신뢰 구축 섹션 */}
        <TrustSection />

        {/* 작동 방식 섹션 */}
        <HowItWorksSection />

        {/* 후기 섹션 */}
        <TestimonialSection />

        {/* 요금제 섹션 */}
        <PricingSection />

        {/* CTA 섹션 */}
        <section
          id="cta"
          className="py-16 lg:py-24 px-4 bg-blue-600 text-white text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              무료로 AI 추천을 받아보고, 당신에게 가장 적합한 보조기기를 찾아보세요.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
              aria-label="무료로 시작하기 - 매칭 질문 페이지로 이동"
            >
              <a href="/matching/questions">무료로 시작하기</a>
            </Button>
          </div>
        </section>
      </main>

      {/* 접근성 기능: 플로팅 도구 모음 */}
      <AccessibilityToolbar />

      {/* 접근성 기능: TTS */}
      <TextToSpeech />

      {/* 접근성 기능: 키보드 스캔 모드 */}
      <KeyboardScanMode />

      {/* 접근성 기능: ARIA Live Region */}
      <GlobalAriaLiveRegion />
    </>
  );
}
