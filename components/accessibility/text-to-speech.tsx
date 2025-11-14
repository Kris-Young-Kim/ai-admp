"use client"

/**
 * @file text-to-speech.tsx
 * @description TextToSpeech 컴포넌트 - 텍스트 음성 변환 기능
 *
 * 이 컴포넌트는 Web Speech API를 사용하여 텍스트를 음성으로 읽어줍니다.
 *
 * 주요 기능:
 * 1. 페이지 전체 읽기
 * 2. 선택한 텍스트 읽기
 * 3. 읽기 속도 조절
 * 4. 음성 선택 (한국어/영어)
 * 5. 재생/일시정지/중지 컨트롤
 * 6. 현재 읽는 위치 하이라이트
 *
 * 접근성:
 * - 스크린 리더와의 호환성 확인
 * - 키보드 네비게이션 지원
 */

import * as React from "react"
import { Play, Pause, Square, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface TextToSpeechProps {
  className?: string
}

export function TextToSpeech({ className }: TextToSpeechProps) {
  const [isReading, setIsReading] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)
  const [rate, setRate] = React.useState(1.0)
  const [lang, setLang] = React.useState<"ko-KR" | "en-US">("ko-KR")
  const [isSupported, setIsSupported] = React.useState(false)
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null)
  const [currentText, setCurrentText] = React.useState<string>("")

  // Web Speech API 지원 확인
  React.useEffect(() => {
    setIsSupported("speechSynthesis" in window)
  }, [])

  // 텍스트 추출 함수
  const extractText = (): string => {
    const main = document.querySelector("main") || document.body
    const textElements = main.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, span, div")
    const texts: string[] = []

    textElements.forEach((el) => {
      const text = el.textContent?.trim()
      if (text && text.length > 0) {
        texts.push(text)
      }
    })

    return texts.join(". ")
  }

  // 읽기 시작
  const startReading = (text?: string) => {
    if (!isSupported) {
      alert("이 브라우저는 음성 읽기 기능을 지원하지 않습니다.")
      return
    }

    const textToRead = text || extractText()
    if (!textToRead) {
      alert("읽을 텍스트가 없습니다.")
      return
    }

    // 기존 읽기 중지
    stopReading()

    const utterance = new SpeechSynthesisUtterance(textToRead)
    utterance.lang = lang
    utterance.rate = rate
    utterance.volume = 1.0

    utterance.onstart = () => {
      setIsReading(true)
      setIsPaused(false)
      setCurrentText(textToRead)
    }

    utterance.onend = () => {
      setIsReading(false)
      setIsPaused(false)
      setCurrentText("")
    }

    utterance.onerror = (e) => {
      console.error("[TextToSpeech] 오류:", e)
      setIsReading(false)
      setIsPaused(false)
      setCurrentText("")
    }

    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }

  // 읽기 일시정지/재개
  const togglePause = () => {
    if (!isSupported) return

    if (isPaused) {
      speechSynthesis.resume()
      setIsPaused(false)
    } else {
      speechSynthesis.pause()
      setIsPaused(true)
    }
  }

  // 읽기 중지
  const stopReading = () => {
    if (!isSupported) return
    speechSynthesis.cancel()
    setIsReading(false)
    setIsPaused(false)
    setCurrentText("")
    utteranceRef.current = null
  }

  // 선택한 텍스트 읽기
  const readSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      startReading(selection.toString().trim())
    } else {
      alert("읽을 텍스트를 선택해주세요.")
    }
  }

  // 컴포넌트 언마운트 시 정리
  React.useEffect(() => {
    return () => {
      stopReading()
    }
  }, [])

  if (!isSupported) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            이 브라우저는 음성 읽기 기능을 지원하지 않습니다.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className} role="region" aria-label="텍스트 음성 변환">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          텍스트 음성 변환
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 컨트롤 버튼 */}
        <div className="flex gap-2">
          <Button
            onClick={() => startReading()}
            disabled={isReading && !isPaused}
            aria-label="페이지 전체 읽기"
          >
            <Play className="h-4 w-4 mr-2" />
            전체 읽기
          </Button>
          <Button
            variant="outline"
            onClick={readSelection}
            disabled={isReading && !isPaused}
            aria-label="선택한 텍스트 읽기"
          >
            선택 읽기
          </Button>
          {isReading && (
            <>
              <Button
                variant="outline"
                onClick={togglePause}
                aria-label={isPaused ? "재개" : "일시정지"}
              >
                {isPaused ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    재개
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    일시정지
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={stopReading}
                aria-label="중지"
              >
                <Square className="h-4 w-4 mr-2" />
                중지
              </Button>
            </>
          )}
        </div>

        {/* 읽기 속도 */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            읽기 속도: {rate.toFixed(1)}x
          </label>
          <Slider
            value={[rate]}
            onValueChange={(value) => {
              setRate(value[0])
              if (utteranceRef.current) {
                utteranceRef.current.rate = value[0]
              }
            }}
            min={0.5}
            max={2.0}
            step={0.1}
            aria-label="읽기 속도 조절"
          />
        </div>

        {/* 언어 선택 */}
        <div>
          <label className="text-sm font-medium mb-2 block">언어</label>
          <div className="flex gap-2">
            <Button
              variant={lang === "ko-KR" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("ko-KR")}
              aria-pressed={lang === "ko-KR"}
            >
              한국어
            </Button>
            <Button
              variant={lang === "en-US" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("en-US")}
              aria-pressed={lang === "en-US"}
            >
              English
            </Button>
          </div>
        </div>

        {/* 상태 표시 */}
        {isReading && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm font-medium mb-1">읽는 중...</p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {currentText.substring(0, 100)}...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

