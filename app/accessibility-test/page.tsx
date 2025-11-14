"use client"

/**
 * @file app/accessibility-test/page.tsx
 * @description 접근성 컴포넌트 테스트 페이지
 *
 * 이 페이지는 모든 접근성 컴포넌트를 테스트하기 위한 예제 페이지입니다.
 */

import { SkipLink } from "@/components/accessibility/skip-link"
import { AccessibilityToolbar } from "@/components/accessibility/accessibility-toolbar"
import { TextToSpeech } from "@/components/accessibility/text-to-speech"
import { KeyboardScanMode } from "@/components/accessibility/keyboard-scan-mode"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AccessibilityTestPage() {
  return (
    <>
      <SkipLink href="#main-content" />
      <div id="main-content" className="container mx-auto py-10 max-w-6xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">접근성 컴포넌트 테스트</h1>
            <p className="text-muted-foreground mb-4">
              모든 접근성 컴포넌트의 기능을 테스트합니다.
            </p>
          </div>

          {/* SkipLink 테스트 */}
          <section aria-labelledby="skip-link-heading">
            <h2 id="skip-link-heading" className="text-2xl font-semibold mb-4">
              SkipLink 컴포넌트
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>주 콘텐츠로 건너뛰기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  페이지 상단에 SkipLink가 있습니다. Tab 키를 눌러 포커스를 이동하면
                  "주 콘텐츠로 건너뛰기" 링크가 표시됩니다.
                </p>
                <p className="text-sm text-muted-foreground">
                  • Tab 키로 포커스 이동<br />
                  • Enter 키로 주 콘텐츠로 이동
                </p>
              </CardContent>
            </Card>
          </section>

          {/* AccessibilityToolbar 테스트 */}
          <section aria-labelledby="toolbar-heading">
            <h2 id="toolbar-heading" className="text-2xl font-semibold mb-4">
              AccessibilityToolbar 컴포넌트
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>접근성 도구 모음</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  화면 우측 하단에 접근성 도구 모음 버튼이 있습니다.
                  클릭하거나 Alt + A 키를 눌러 설정 패널을 열 수 있습니다.
                </p>
                <p className="text-sm text-muted-foreground">
                  • 화면 확대/축소 (50% ~ 200%)<br />
                  • 폰트 크기 조절 (작게/보통/크게/아주크게)<br />
                  • 줄 간격 조절 (1.2x / 1.5x / 2.0x)<br />
                  • 고대비 모드 토글<br />
                  • 애니메이션 비활성화 옵션<br />
                  • 설정 자동 저장 (localStorage)
                </p>
              </CardContent>
            </Card>
          </section>

          {/* TextToSpeech 테스트 */}
          <section aria-labelledby="tts-heading">
            <h2 id="tts-heading" className="text-2xl font-semibold mb-4">
              TextToSpeech 컴포넌트
            </h2>
            <TextToSpeech />
          </section>

          {/* KeyboardScanMode 테스트 */}
          <section aria-labelledby="scan-mode-heading">
            <h2 id="scan-mode-heading" className="text-2xl font-semibold mb-4">
              KeyboardScanMode 컴포넌트
            </h2>
            <KeyboardScanMode />
          </section>

          {/* 테스트 콘텐츠 */}
          <section aria-labelledby="test-content-heading">
            <h2 id="test-content-heading" className="text-2xl font-semibold mb-4">
              테스트 콘텐츠
            </h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>카드 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    이 카드는 접근성 기능을 테스트하기 위한 샘플 콘텐츠입니다.
                    TextToSpeech 컴포넌트로 이 텍스트를 읽을 수 있습니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>카드 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    키보드 스캔 모드를 활성화하면 이 카드도 스캔 대상이 됩니다.
                    스페이스바나 엔터 키로 다음 요소로 이동할 수 있습니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>카드 3</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    접근성 도구 모음에서 폰트 크기나 줄 간격을 조절하면
                    이 텍스트의 표시 방식도 변경됩니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>

      {/* AccessibilityToolbar는 전역으로 표시 */}
      <AccessibilityToolbar />
    </>
  )
}

