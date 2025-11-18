"use client"

/**
 * @file keyboard-scan-mode.tsx
 * @description KeyboardScanMode 컴포넌트 - 키보드 스캔 모드
 *
 * 이 컴포넌트는 지체 장애인이 최소한의 입력으로 웹사이트를 탐색할 수 있도록
 * 스캔 모드를 제공합니다.
 *
 * 주요 기능:
 * 1. 스캔 모드 활성화/비활성화
 * 2. 자동 스캔 (시간 간격 설정)
 * 3. 수동 스캔 (스페이스바/엔터)
 * 4. 스캔 순서 시각화
 * 5. 포커스 하이라이트 강화
 *
 * 접근성:
 * - 키보드 네비게이션 지원
 * - 스크린 리더 최적화
 */

import * as React from "react"
import { Scan, Play, Pause, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface KeyboardScanModeProps {
  className?: string
}

export function KeyboardScanMode({ className }: KeyboardScanModeProps) {
  const [isActive, setIsActive] = React.useState(false)
  const [isAutoScan, setIsAutoScan] = React.useState(false)
  const [scanInterval, setScanInterval] = React.useState(2000) // ms
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [focusableElements, setFocusableElements] = React.useState<HTMLElement[]>([])
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  // 포커스 가능한 요소 찾기
  const findFocusableElements = (): HTMLElement[] => {
    const selectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ]

    const elements: HTMLElement[] = []
    selectors.forEach((selector) => {
      const found = document.querySelectorAll<HTMLElement>(selector)
      found.forEach((el) => {
        if (el.offsetParent !== null) {
          // 화면에 보이는 요소만
          elements.push(el)
        }
      })
    })

    return elements
  }

  // 하이라이트 제거
  const removeHighlight = React.useCallback(() => {
    document.querySelectorAll("[data-scan-highlight]").forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.outline = ""
      htmlEl.style.outlineOffset = ""
      htmlEl.style.zIndex = ""
      htmlEl.removeAttribute("data-scan-highlight")
    })
  }, [])

  // 요소 하이라이트
  const highlightElement = React.useCallback((element: HTMLElement) => {
    removeHighlight()
    element.style.outline = "4px solid #3b82f6"
    element.style.outlineOffset = "2px"
    element.style.zIndex = "9999"
    element.setAttribute("data-scan-highlight", "true")
  }, [removeHighlight])

  // 스캔 모드 활성화
  const activateScanMode = React.useCallback(() => {
    const elements = findFocusableElements()
    setFocusableElements(elements)
    setCurrentIndex(0)
    setIsActive(true)

    if (elements.length > 0) {
      elements[0].focus()
      highlightElement(elements[0])
    }
  }, [highlightElement])

  // 스캔 모드 비활성화
  const deactivateScanMode = React.useCallback(() => {
    setIsActive(false)
    setIsAutoScan(false)
    setCurrentIndex(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    removeHighlight()
  }, [removeHighlight])

  // 다음 요소로 이동
  const moveToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      setFocusableElements((prevElements) => {
        if (prevElements.length === 0) return prevElements

        const nextIndex = (prevIndex + 1) % prevElements.length
        const element = prevElements[nextIndex]
        setTimeout(() => {
          element.focus()
          highlightElement(element)
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 0)
        return prevElements
      })
      return (prevIndex + 1) % (focusableElements.length || 1)
    })
  }, [highlightElement, focusableElements.length])

  // 이전 요소로 이동
  const moveToPrevious = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      setFocusableElements((prevElements) => {
        if (prevElements.length === 0) return prevElements

        const prevIdx = prevIndex === 0 ? prevElements.length - 1 : prevIndex - 1
        const element = prevElements[prevIdx]
        setTimeout(() => {
          element.focus()
          highlightElement(element)
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 0)
        return prevElements
      })
      const prevIdx = prevIndex === 0 ? (focusableElements.length || 1) - 1 : prevIndex - 1
      return prevIdx
    })
  }, [highlightElement, focusableElements.length])

  // 자동 스캔 시작/중지
  const toggleAutoScan = React.useCallback(() => {
    setIsAutoScan((prev) => {
      if (prev) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        return false
      } else {
        intervalRef.current = setInterval(() => {
          moveToNext()
        }, scanInterval)
        return true
      }
    })
  }, [scanInterval, moveToNext])

  // 키보드 이벤트 처리
  React.useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        if (isAutoScan) {
          toggleAutoScan()
        } else {
          moveToNext()
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        moveToNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        moveToPrevious()
      } else if (e.key === "Escape") {
        e.preventDefault()
        deactivateScanMode()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isActive, isAutoScan, moveToNext, moveToPrevious, toggleAutoScan, deactivateScanMode])

  // 자동 스캔 정리
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      removeHighlight()
    }
  }, [])

  return (
    <Card className={className} role="region" aria-label="키보드 스캔 모드">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5" />
          키보드 스캔 모드
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isActive ? (
          <>
            <p className="text-sm text-muted-foreground">
              스캔 모드를 활성화하면 키보드만으로 웹사이트를 탐색할 수 있습니다.
            </p>
            <Button onClick={activateScanMode} className="w-full" aria-label="스캔 모드 활성화">
              <Scan className="h-4 w-4 mr-2" />
              스캔 모드 시작
            </Button>
          </>
        ) : (
          <>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium mb-1">
                스캔 중: {currentIndex + 1} / {focusableElements.length}
              </p>
              <p className="text-xs text-muted-foreground">
                스페이스바 또는 엔터: 다음 요소로 이동
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant={isAutoScan ? "default" : "outline"}
                onClick={toggleAutoScan}
                className="flex-1"
                aria-label={isAutoScan ? "자동 스캔 중지" : "자동 스캔 시작"}
              >
                {isAutoScan ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    자동 스캔 중지
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    자동 스캔 시작
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={deactivateScanMode}
                aria-label="스캔 모드 종료"
              >
                <Square className="h-4 w-4 mr-2" />
                종료
              </Button>
            </div>

            {isAutoScan && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  스캔 간격: {scanInterval}ms
                </label>
                <Slider
                  value={[scanInterval]}
                  onValueChange={(value) => {
                    setScanInterval(value[0])
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current)
                      intervalRef.current = setInterval(() => {
                        moveToNext()
                      }, value[0])
                    }
                  }}
                  min={500}
                  max={5000}
                  step={100}
                  aria-label="스캔 간격 조절"
                />
              </div>
            )}

            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>사용 방법:</strong></p>
              <p>• 스페이스바/엔터: 다음 요소로 이동</p>
              <p>• ← → 화살표: 이전/다음 요소로 이동</p>
              <p>• Esc: 스캔 모드 종료</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

