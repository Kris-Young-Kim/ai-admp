import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { AccessibilityToolbar } from "@/components/accessibility/accessibility-toolbar";
import { SkipLink } from "@/components/accessibility/skip-link";
import { TextToSpeech } from "@/components/accessibility/text-to-speech";
import { KeyboardScanMode } from "@/components/accessibility/keyboard-scan-mode";

/**
 * 대시보드 페이지
 * 
 * @file app/dashboard/page.tsx
 * @description 사용자 대시보드 페이지
 * 
 * 주요 기능:
 * 1. 인증 필수 (Clerk)
 * 2. 사용자 매칭 기록
 * 3. 프로필 정보
 * 4. 구독 상태
 * 5. 접근성 기능 통합
 * 
 * @dependencies
 * - @clerk/nextjs/server: 인증 확인
 * - components/accessibility: 접근성 컴포넌트들
 */

export default async function DashboardPage() {
  // 인증 확인
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      {/* 접근성 기능: Skip Link */}
      <SkipLink />

      {/* 메인 콘텐츠 */}
      <main id="main-content" className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              대시보드
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              매칭 기록과 프로필 정보를 확인하세요
            </p>
          </div>

          {/* 그리드 레이아웃 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 프로필 정보 카드 */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  프로필 정보
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      사용자 ID
                    </p>
                    <p className="text-gray-900 dark:text-white font-mono text-sm">
                      {userId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      상태
                    </p>
                    <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm">
                      활성
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 매칭 기록 카드 */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  매칭 기록
                </h2>
                <div className="space-y-4">
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p className="mb-2">아직 매칭 기록이 없습니다</p>
                    <p className="text-sm">
                      랜딩 페이지에서 AI 추천을 받아보세요
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 구독 상태 카드 */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  구독 상태
                </h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      현재 플랜
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      무료 플랜
                    </p>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300">
                    업그레이드
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 접근성 기능: 플로팅 도구 모음 */}
      <AccessibilityToolbar />

      {/* 접근성 기능: TTS */}
      <TextToSpeech />

      {/* 접근성 기능: 키보드 스캔 모드 */}
      <KeyboardScanMode />
    </>
  );
}

