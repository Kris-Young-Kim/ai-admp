"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, RefreshCw, Home } from "lucide-react";
import { RecommendationCard } from "@/components/features/recommendation-card";
import { getCoupangRecommendations } from "@/actions/matching";
import type { RecommendedProduct } from "@/store/matchingStore";

/**
 * 매칭 결과 페이지
 * 
 * @file app/matching/results/page.tsx
 * @description 매칭 질문 결과를 보여주고 쿠팡 상품을 추천하는 페이지
 * 
 * 주요 기능:
 * 1. 질문 파라미터 읽기
 * 2. 쿠팡 상품 추천 API 호출
 * 3. 추천 결과 표시
 * 4. 로딩 및 에러 상태 관리
 * 
 * @dependencies
 * - actions/matching: 쿠팡 상품 추천 Server Action
 * - components/features/recommendation-card: 추천 상품 카드
 */

export default function MatchingResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [recommendations, setRecommendations] = React.useState<RecommendedProduct[]>([]);

  // 질문 파라미터 읽기
  const bodyPart = searchParams.get("body_part") || "";
  const activities = searchParams.get("activities")?.split(",") || [];
  const budgetMin = parseInt(searchParams.get("budget_min") || "0", 10);
  const budgetMax = parseInt(searchParams.get("budget_max") || "10000000", 10);

  // 쿠팡 상품 추천 로드
  React.useEffect(() => {
    const loadRecommendations = async () => {
      if (!bodyPart || activities.length === 0) {
        setError("질문 정보가 없습니다. 다시 시작해주세요.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.group("[MatchingResultsPage] 쿠팡 상품 추천 요청");
        console.log("신체 부위:", bodyPart);
        console.log("활동:", activities);
        console.log("예산 범위:", budgetMin, "~", budgetMax);
        console.groupEnd();

        const result = await getCoupangRecommendations({
          primary_body_part: bodyPart,
          activities,
          budget_min: budgetMin,
          budget_max: budgetMax,
        });

        if (result.success && result.recommendations) {
          setRecommendations(result.recommendations);
        } else {
          setError(result.error || "추천 상품을 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("[MatchingResultsPage] 추천 로드 실패:", err);
        setError("추천 상품을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, [bodyPart, activities, budgetMin, budgetMax]);

  const handleRetry = () => {
    router.refresh();
  };

  const handleStartOver = () => {
    router.push("/matching/questions");
  };

  return (
    <main className="min-h-screen py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            추천 결과
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI가 분석한 결과입니다
          </p>
        </div>

        {/* 로딩 상태 */}
        {isLoading && (
          <Card className="bg-white dark:bg-gray-900 shadow-xl">
            <CardContent className="py-16 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <p className="text-lg text-gray-600 dark:text-gray-300">
                AI가 최적의 보조기기를 찾고 있습니다...
              </p>
            </CardContent>
          </Card>
        )}

        {/* 에러 상태 */}
        {!isLoading && error && (
          <Card className="bg-white dark:bg-gray-900 shadow-xl">
            <CardContent className="py-16 text-center">
              <div className="text-red-600 dark:text-red-400 mb-4">
                <p className="text-lg font-semibold mb-2">오류가 발생했습니다</p>
                <p className="text-sm">{error}</p>
              </div>
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={handleRetry} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
                  다시 시도
                </Button>
                <Button onClick={handleStartOver}>
                  <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                  처음부터 다시
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 추천 결과 */}
        {!isLoading && !error && recommendations.length > 0 && (
          <>
            <div className="mb-8">
              <Card className="bg-white dark:bg-gray-900 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    추천 상품 {recommendations.length}개
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="추천 상품 목록">
                    {recommendations.map((product, index) => (
                      <div key={product.product_id || index} role="listitem">
                        <RecommendationCard
                          product={product}
                          rank={index + 1}
                          onProductClick={(product) => {
                            if (product.product_url) {
                              window.open(product.product_url, "_blank", "noopener,noreferrer");
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button onClick={handleStartOver} variant="outline" size="lg">
                <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                다시 매칭하기
              </Button>
            </div>
          </>
        )}

        {/* 결과 없음 */}
        {!isLoading && !error && recommendations.length === 0 && (
          <Card className="bg-white dark:bg-gray-900 shadow-xl">
            <CardContent className="py-16 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                조건에 맞는 보조기기를 찾지 못했습니다.
              </p>
              <Button onClick={handleStartOver} size="lg">
                <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                다른 조건으로 다시 시도
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

