"use server";

/**
 * 쿠팡 상품 추천 Server Action
 * 
 * @file actions/matching.ts
 * @description 사용자의 매칭 질문 결과를 기반으로 쿠팡 상품을 추천하는 Server Action
 * 
 * 주요 기능:
 * 1. Sequential Thinking으로 추천 전략 수립
 * 2. Context7을 사용하여 쿠팡 API 문서 조회
 * 3. 쿠팡 상품 검색 및 추천
 * 
 * @dependencies
 * - MCP Context7: 쿠팡 API 문서 조회
 * - MCP Sequential Thinking: 추천 전략 수립
 */

export interface MatchingRequest {
  primary_body_part: string;
  activities: string[];
  budget_min: number;
  budget_max: number;
}

export interface RecommendedProduct {
  product_id: string;
  name: string;
  description?: string;
  category?: string;
  price_range_min?: number;
  price_range_max?: number;
  image_url?: string;
  average_rating?: number;
  review_count?: number;
  match_score?: number;
  product_url?: string;
}

export interface MatchingResult {
  success: boolean;
  recommendations?: RecommendedProduct[];
  error?: string;
}

/**
 * 쿠팡 상품 추천
 */
export async function getCoupangRecommendations(
  request: MatchingRequest
): Promise<MatchingResult> {
  console.group("🎯 쿠팡 상품 추천 시작");
  console.log("요청 데이터:", request);

  try {
    // 1. Sequential Thinking으로 추천 전략 수립
    // TODO: MCP Sequential Thinking 통합 필요
    // 현재는 직접 로직으로 처리
    console.log("📊 추천 전략 수립 중...");
    
    // 임시로 직접 처리 (나중에 MCP로 대체)
    const strategy = {
      keyword: `${getBodyPartKeyword(request.primary_body_part)} 보조기기`,
      priceRange: {
        min: request.budget_min,
        max: request.budget_max,
      },
      activities: request.activities,
    };

    console.log("✅ 추천 전략 수립 완료:", strategy);

    // 2. 검색 키워드 생성
    const searchKeyword = strategy.keyword;

    // 3. 쿠팡 상품 검색 (현재는 모의 데이터 반환)
    // TODO: 실제 쿠팡 API 연동 필요
    const mockProducts: RecommendedProduct[] = [
      {
        product_id: "coupang-1",
        name: `${getBodyPartKeyword(request.primary_body_part)} 보조기기 추천 상품 1`,
        description: `${request.activities.join(", ")} 활동에 적합한 보조기기입니다.`,
        category: "보조기기",
        price_range_min: Math.max(request.budget_min, 100000),
        price_range_max: Math.min(request.budget_max, 500000),
        image_url: "https://via.placeholder.com/300x300?text=보조기기+1",
        average_rating: 4.5,
        review_count: 123,
        match_score: 85.5,
        product_url: `https://www.coupang.com/vp/products/1?keyword=${encodeURIComponent(searchKeyword)}`,
      },
      {
        product_id: "coupang-2",
        name: `${getBodyPartKeyword(request.primary_body_part)} 보조기기 추천 상품 2`,
        description: `${request.activities.join(", ")} 활동에 최적화된 보조기기입니다.`,
        category: "보조기기",
        price_range_min: Math.max(request.budget_min, 150000),
        price_range_max: Math.min(request.budget_max, 600000),
        image_url: "https://via.placeholder.com/300x300?text=보조기기+2",
        average_rating: 4.3,
        review_count: 89,
        match_score: 82.3,
        product_url: `https://www.coupang.com/vp/products/2?keyword=${encodeURIComponent(searchKeyword)}`,
      },
      {
        product_id: "coupang-3",
        name: `${getBodyPartKeyword(request.primary_body_part)} 보조기기 추천 상품 3`,
        description: `다양한 활동에 활용 가능한 범용 보조기기입니다.`,
        category: "보조기기",
        price_range_min: Math.max(request.budget_min, 200000),
        price_range_max: Math.min(request.budget_max, 700000),
        image_url: "https://via.placeholder.com/300x300?text=보조기기+3",
        average_rating: 4.7,
        review_count: 156,
        match_score: 79.8,
        product_url: `https://www.coupang.com/vp/products/3?keyword=${encodeURIComponent(searchKeyword)}`,
      },
    ];

    // 매칭 점수로 정렬
    const sortedProducts = mockProducts.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));

    console.log("✅ 추천 상품 생성 완료:", sortedProducts.length, "개");
    console.groupEnd();

    return {
      success: true,
      recommendations: sortedProducts,
    };
  } catch (error) {
    console.error("❌ 쿠팡 상품 추천 실패:", error);
    console.groupEnd();
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

/**
 * 신체 부위를 검색 키워드로 변환
 */
function getBodyPartKeyword(bodyPart: string): string {
  const keywords: Record<string, string> = {
    upper_limb: "상지",
    lower_limb: "하지",
    spine: "척추",
    neck: "목",
    whole_body: "전신",
  };
  return keywords[bodyPart] || bodyPart;
}

/**
 * 활동을 검색 키워드로 변환
 */
function getActivityKeyword(activity: string): string {
  const keywords: Record<string, string> = {
    household: "가사",
    work: "직업",
    leisure: "여가",
    mobility: "이동",
    self_care: "자가관리",
  };
  return keywords[activity] || activity;
}

