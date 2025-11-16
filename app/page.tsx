import { AccessibilityToolbar } from "@/components/accessibility/accessibility-toolbar";
import { SkipLink } from "@/components/accessibility/skip-link";
import { TextToSpeech } from "@/components/accessibility/text-to-speech";
import { KeyboardScanMode } from "@/components/accessibility/keyboard-scan-mode";
import { GlobalAriaLiveRegion } from "@/components/accessibility/aria-live-region";

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
 */

export default function Home() {
  return (
    <>
      {/* 접근성 기능: Skip Link */}
      <SkipLink />

      {/* 메인 콘텐츠 */}
      <main id="main-content" className="min-h-screen">
        {/* Hero 섹션 (임시) */}
        <section className="min-h-[80vh] flex items-center justify-center px-4 py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
              AI 기반 보조기기 매칭 서비스
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              당신에게 가장 적합한 보조기기를 AI가 추천해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#demo"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="무료로 시작하기 - 데모 섹션으로 이동"
            >
              무료로 시작하기
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300"
              aria-label="작동 방식 알아보기 - 작동 방식 섹션으로 이동"
            >
              작동 방식 알아보기
            </a>
            </div>
          </div>
        </section>

        {/* 문제 공감 섹션 (임시) */}
        <section
          id="pain-points"
          className="py-16 lg:py-24 px-4 bg-white dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              이런 고민 있으신가요?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "적합한 보조기기를 찾기 어려워요",
                  description:
                    "수많은 제품 중에서 자신에게 맞는 것을 선택하는 것이 어렵습니다.",
                },
                {
                  title: "제품 정보가 너무 복잡해요",
                  description:
                    "기술적인 용어와 복잡한 설명으로 이해하기 어렵습니다.",
                },
                {
                  title: "직접 비교하기 힘들어요",
                  description:
                    "여러 제품을 한눈에 비교하고 평가하기 어렵습니다.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI 데모 섹션 (임시) */}
        <section
          id="demo"
          className="py-16 lg:py-24 px-4 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              AI가 추천해드립니다
            </h2>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                간단한 질문에 답하시면 AI가 당신에게 가장 적합한 보조기기를
                추천해드립니다.
              </p>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  데모 도구는 곧 제공될 예정입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 작동 방식 섹션 (임시) */}
        <section
          id="how-it-works"
          className="py-16 lg:py-24 px-4 bg-white dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              작동 방식
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "정보 입력", description: "신체 부위와 활동 정보를 입력하세요" },
                { step: "2", title: "AI 분석", description: "AI가 당신의 요구사항을 분석합니다" },
                { step: "3", title: "추천 받기", description: "최적의 보조기기 3개를 추천받습니다" },
                { step: "4", title: "선택하기", description: "추천된 제품 중에서 선택하세요" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 (임시) */}
        <section className="py-16 lg:py-24 px-4 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              무료로 AI 추천을 받아보고, 당신에게 가장 적합한 보조기기를 찾아보세요.
            </p>
            <a
              href="#demo"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="무료로 시작하기 - 데모 섹션으로 이동"
            >
              무료로 시작하기
            </a>
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
