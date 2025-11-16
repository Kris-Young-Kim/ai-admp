"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { runWCAGChecks, WCAGReport, WCAGCheck } from "@/lib/accessibility/wcag-checker";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

/**
 * 접근성 검증 페이지
 * 
 * @file app/accessibility-check/page.tsx
 * @description WCAG 2.1 AA 준수 여부를 검증하는 페이지
 */

export default function AccessibilityCheckPage() {
  const [report, setReport] = useState<WCAGReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runChecks = () => {
    setIsLoading(true);
    // 약간의 지연을 주어 UI 업데이트를 보장
    setTimeout(() => {
      const result = runWCAGChecks();
      setReport(result);
      setIsLoading(false);
    }, 100);
  };

  useEffect(() => {
    // 페이지 로드 시 자동으로 검증 실행
    runChecks();
  }, []);

  const getStatusIcon = (status: WCAGCheck["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: WCAGCheck["status"]) => {
    switch (status) {
      case "pass":
        return "border-green-200 bg-green-50";
      case "fail":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">접근성 검증 리포트</h1>

        <div className="mb-6">
          <Button onClick={runChecks} disabled={isLoading}>
            {isLoading ? "검증 중..." : "다시 검증하기"}
          </Button>
        </div>

        {report && (
          <>
            {/* 요약 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">레벨</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report.level}</div>
                </CardContent>
              </Card>
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-sm">통과</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{report.passed}</div>
                </CardContent>
              </Card>
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-sm">실패</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{report.failed}</div>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-sm">경고</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{report.warnings}</div>
                </CardContent>
              </Card>
            </div>

            {/* 검사 결과 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">검사 결과</h2>
              {report.checks.map((check) => (
                <Card key={check.id} className={getStatusColor(check.status)}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {getStatusIcon(check.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{check.name}</h3>
                          <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                            {check.level}
                          </span>
                          {check.element && (
                            <span className="text-xs px-2 py-1 bg-white rounded">
                              {check.element}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{check.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 권장 사항 */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>권장 사항</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    더 정확한 검증을 위해 <strong>axe DevTools</strong> 확장 프로그램을 사용하세요
                  </li>
                  <li>
                    색상 대비는 <strong>WAVE</strong> 또는 <strong>Lighthouse</strong>로 확인하세요
                  </li>
                  <li>
                    실제 사용자 테스트를 위해 <strong>NVDA</strong> 또는 <strong>VoiceOver</strong>로
                    스크린 리더 테스트를 수행하세요
                  </li>
                  <li>
                    자세한 가이드는 <code>docs/ACCESSIBILITY_GUIDE.md</code>를 참고하세요
                  </li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

