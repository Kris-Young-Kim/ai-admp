"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecommendedProduct } from "@/store/matchingStore";

/**
 * 추천 상품 카드 컴포넌트
 * 
 * @file components/features/recommendation-card.tsx
 * @description 매칭 결과로 추천된 상품을 표시하는 카드
 * 
 * 주요 기능:
 * 1. 상품 정보 표시 (이름, 설명, 가격, 평점)
 * 2. 매칭 점수 표시
 * 3. 이미지 표시 (있는 경우)
 * 4. 외부 링크 버튼
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - components/ui/button: 버튼 컴포넌트
 * - lucide-react: 아이콘
 */

interface RecommendationCardProps {
  product: RecommendedProduct;
  rank: number;
  onProductClick?: (product: RecommendedProduct) => void;
  className?: string;
}

export function RecommendationCard({
  product,
  rank,
  onProductClick,
  className,
}: RecommendationCardProps) {
  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  // 로그: 추천 상품 카드 클릭
  React.useEffect(() => {
    console.group(`[RecommendationCard] ${rank}위 상품 렌더링`);
    console.log("상품 ID:", product.product_id);
    console.log("상품명:", product.name);
    console.log("매칭 점수:", product.match_score);
    console.groupEnd();
  }, [product, rank]);

  return (
    <Card
      className={cn(
        "h-full flex flex-col",
        "hover:shadow-lg transition-shadow duration-300",
        className
      )}
      role="article"
      aria-label={`${rank}위 추천 상품: ${product.name}`}
    >
      <CardHeader>
        {/* 순위 배지 */}
        <div className="flex items-start justify-between mb-2">
          <div
            className={cn(
              "px-3 py-1 rounded-full text-sm font-bold text-white",
              rank === 1 && "bg-yellow-500",
              rank === 2 && "bg-gray-400",
              rank === 3 && "bg-orange-400"
            )}
            aria-label={`${rank}위`}
          >
            {rank}위
          </div>
          {product.match_score && (
            <div className="text-xs text-muted-foreground">
              매칭도: {Math.round(product.match_score)}%
            </div>
          )}
        </div>

        <CardTitle className="text-xl">{product.name}</CardTitle>
        {product.description && (
          <CardDescription className="line-clamp-2">
            {product.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        {/* 이미지 */}
        {product.image_url && (
          <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={`${product.name} 보조기기 이미지`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 가격 정보 */}
        {product.price_range_min && product.price_range_max && (
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.price_range_min.toLocaleString()}원 ~{" "}
            {product.price_range_max.toLocaleString()}원
          </div>
        )}

        {/* 평점 */}
        {product.average_rating && (
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            <span className="text-sm font-medium">
              {product.average_rating.toFixed(1)}
            </span>
            {product.review_count && (
              <span className="text-xs text-muted-foreground">
                ({product.review_count}개 리뷰)
              </span>
            )}
          </div>
        )}

        {/* 카테고리 */}
        {product.category && (
          <div className="text-sm text-muted-foreground">
            카테고리: {product.category}
          </div>
        )}

        {/* CTA 버튼 */}
        <Button
          onClick={handleClick}
          className="mt-auto"
          aria-label={`${product.name} 상세 정보 보기`}
        >
          상세 정보 보기
          <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  );
}

