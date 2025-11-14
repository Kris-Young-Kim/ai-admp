"use client"

/**
 * @file accessibility-toolbar.tsx
 * @description AccessibilityToolbar 컴포넌트 - 접근성 도구 모음
 *
 * 이 컴포넌트는 웹사이트의 접근성을 향상시키는 다양한 도구를 제공합니다.
 *
 * 주요 기능:
 * 1. 화면 확대/축소 (50% ~ 200%)
 * 2. 고대비 모드 토글
 * 3. 폰트 크기 조절 (작게/보통/크게/아주크게)
 * 4. 줄 간격 조절
 * 5. 애니메이션 비활성화 옵션
 * 6. 설정 저장/불러오기 (localStorage)
 * 7. 키보드 단축키 지원 (Alt + A)
 *
 * 접근성:
 * - ARIA 속성 완전 구현
 * - 키보드 네비게이션 지원
 * - 스크린 리더 최적화
 */

import * as React from "react"
import { Settings, X, ZoomIn, ZoomOut, Type, Eye, AlignJustify, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface AccessibilitySettings {
  fontSize: "small" | "normal" | "large" | "xlarge"
  zoom: number // 50 ~ 200
  highContrast: boolean
  animationsDisabled: boolean
  lineHeight: number // 1.2, 1.5, 2.0
}

const STORAGE_KEY = "accessibility-settings"
const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: "normal",
  zoom: 100,
  highContrast: false,
  animationsDisabled: false,
  lineHeight: 1.5,
}

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [settings, setSettings] = React.useState<AccessibilitySettings>(DEFAULT_SETTINGS)

  // localStorage에서 설정 불러오기
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
        applySettings({ ...DEFAULT_SETTINGS, ...parsed })
      } catch (e) {
        console.error("[AccessibilityToolbar] 설정 불러오기 실패:", e)
      }
    }
  }, [])

  // 설정 적용 함수
  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement

    // 폰트 크기
    const fontSizeMap = {
      small: "0.875rem",
      normal: "1rem",
      large: "1.25rem",
      xlarge: "1.5rem",
    }
    root.style.fontSize = fontSizeMap[newSettings.fontSize]

    // 줌
    root.style.zoom = `${newSettings.zoom}%`

    // 고대비 모드
    if (newSettings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    // 애니메이션 비활성화
    if (newSettings.animationsDisabled) {
      root.classList.add("no-animations")
    } else {
      root.classList.remove("no-animations")
    }

    // 줄 간격
    root.style.lineHeight = `${newSettings.lineHeight}`
  }

  // 설정 변경 핸들러
  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    const newSettings = { ...settings, ...updates }
    setSettings(newSettings)
    applySettings(newSettings)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
  }

  // 키보드 단축키 (Alt + A)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "a") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // 설정 적용
  React.useEffect(() => {
    applySettings(settings)
  }, [settings])

  return (
    <>
      {/* 플로팅 버튼 */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full shadow-lg",
          "h-14 w-14 p-0",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
        aria-label={isOpen ? "접근성 도구 닫기" : "접근성 도구 열기"}
        aria-expanded={isOpen}
        aria-controls="accessibility-toolbar"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Settings className="h-6 w-6" />
        )}
      </Button>

      {/* 설정 패널 */}
      {isOpen && (
        <Card
          id="accessibility-toolbar"
          className={cn(
            "fixed bottom-24 right-6 z-50 w-80 shadow-xl",
            "max-h-[calc(100vh-8rem)] overflow-y-auto"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="toolbar-title"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle id="toolbar-title">접근성 설정</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="닫기"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 화면 확대/축소 */}
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <ZoomIn className="h-4 w-4" />
                화면 확대/축소
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateSettings({ zoom: Math.max(50, settings.zoom - 10) })}
                  aria-label="축소"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="flex-1 text-center text-sm font-medium">
                  {settings.zoom}%
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateSettings({ zoom: Math.min(200, settings.zoom + 10) })}
                  aria-label="확대"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 폰트 크기 */}
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Type className="h-4 w-4" />
                폰트 크기
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["small", "normal", "large", "xlarge"] as const).map((size) => (
                  <Button
                    key={size}
                    variant={settings.fontSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings({ fontSize: size })}
                    aria-pressed={settings.fontSize === size}
                  >
                    {size === "small" ? "작게" : size === "normal" ? "보통" : size === "large" ? "크게" : "아주크게"}
                  </Button>
                ))}
              </div>
            </div>

            {/* 줄 간격 */}
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <AlignJustify className="h-4 w-4" />
                줄 간격
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1.2, 1.5, 2.0].map((height) => (
                  <Button
                    key={height}
                    variant={settings.lineHeight === height ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings({ lineHeight: height })}
                    aria-pressed={settings.lineHeight === height}
                  >
                    {height}x
                  </Button>
                ))}
              </div>
            </div>

            {/* 고대비 모드 */}
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Eye className="h-4 w-4" />
                고대비 모드
              </label>
              <Button
                variant={settings.highContrast ? "default" : "outline"}
                className="w-full"
                onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                aria-pressed={settings.highContrast}
              >
                {settings.highContrast ? "비활성화" : "활성화"}
              </Button>
            </div>

            {/* 애니메이션 비활성화 */}
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Ban className="h-4 w-4" />
                애니메이션
              </label>
              <Button
                variant={settings.animationsDisabled ? "default" : "outline"}
                className="w-full"
                onClick={() => updateSettings({ animationsDisabled: !settings.animationsDisabled })}
                aria-pressed={settings.animationsDisabled}
              >
                {settings.animationsDisabled ? "활성화" : "비활성화"}
              </Button>
            </div>

            {/* 리셋 버튼 */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSettings(DEFAULT_SETTINGS)
                applySettings(DEFAULT_SETTINGS)
                localStorage.removeItem(STORAGE_KEY)
              }}
            >
              기본값으로 리셋
            </Button>

            {/* 키보드 단축키 안내 */}
            <div className="text-xs text-muted-foreground border-t pt-4">
              <p className="font-medium mb-1">키보드 단축키:</p>
              <p>Alt + A: 접근성 도구 열기/닫기</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

