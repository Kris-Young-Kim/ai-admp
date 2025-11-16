import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServiceRoleClient } from "@/lib/supabase/service-role";

/**
 * 매칭 추천 API
 * 
 * 사용자의 입력 정보(신체 부위, 활동, 예산)를 기반으로
 * 보조기기 제품을 추천하고 결과를 저장합니다.
 * 
 * @file app/api/matching/recommend/route.ts
 * @description AI 매칭 추천 API 엔드포인트
 * 
 * 주요 기능:
 * 1. 사용자 입력 검증 (Zod 스키마)
 * 2. Supabase에서 상품 데이터 쿼리
 * 3. 매칭 알고리즘 실행 (규칙 기반 점수 계산)
 * 4. 상위 3개 상품 추천
 * 5. 매칭 결과를 matchings 테이블에 저장
 * 
 * @dependencies
 * - @clerk/nextjs/server: 사용자 인증
 * - zod: 입력 검증
 * - @supabase/supabase-js: 데이터베이스 쿼리
 */

// 입력 검증 스키마
const MatchingRequestSchema = z.object({
  primary_body_part: z.string().min(1, "신체 부위는 필수입니다"),
  activities: z.array(z.string()).min(1, "최소 1개 이상의 활동을 선택해주세요"),
  budget_min: z.number().int().min(0, "예산 최소값은 0 이상이어야 합니다"),
  budget_max: z.number().int().min(0, "예산 최대값은 0 이상이어야 합니다"),
});

// 매칭 점수 계산 함수
function calculateMatchScore(
  product: any,
  primaryBodyPart: string,
  activities: string[],
  budgetMin: number,
  budgetMax: number
): number {
  let score = 0;

  // 1. 신체 부위 매칭 (가중치: 40%)
  if (product.body_parts && Array.isArray(product.body_parts)) {
    if (product.body_parts.includes(primaryBodyPart)) {
      score += 40;
    } else if (product.body_parts.some((part: string) => 
      part.toLowerCase().includes(primaryBodyPart.toLowerCase()) ||
      primaryBodyPart.toLowerCase().includes(part.toLowerCase())
    )) {
      score += 20; // 부분 매칭
    }
  }

  // 2. 활동 매칭 (가중치: 30%)
  if (product.suitable_activities && Array.isArray(product.suitable_activities)) {
    const matchedActivities = activities.filter((activity) =>
      product.suitable_activities.includes(activity)
    );
    const matchRatio = matchedActivities.length / activities.length;
    score += 30 * matchRatio;
  }

  // 3. 가격 범위 매칭 (가중치: 20%)
  if (product.price_range_min !== null && product.price_range_max !== null) {
    const productMin = product.price_range_min;
    const productMax = product.price_range_max;
    
    // 예산 범위와 제품 가격 범위가 겹치는 경우
    if (budgetMax >= productMin && budgetMin <= productMax) {
      // 완전히 포함되는 경우 최고 점수
      if (budgetMin >= productMin && budgetMax <= productMax) {
        score += 20;
      } else {
        // 부분 겹침: 겹치는 비율에 따라 점수 부여
        const overlapMin = Math.max(budgetMin, productMin);
        const overlapMax = Math.min(budgetMax, productMax);
        const overlapRatio = (overlapMax - overlapMin) / (budgetMax - budgetMin);
        score += 20 * overlapRatio;
      }
    }
  }

  // 4. 평점 보너스 (가중치: 10%)
  if (product.average_rating !== null) {
    score += 10 * (product.average_rating / 5.0);
  }

  return Math.round(score * 10) / 10; // 소수점 1자리까지
}

export async function POST(req: NextRequest) {
  console.group("🎯 매칭 추천 API 호출");
  
  try {
    // Clerk 인증 확인
    const { userId } = await auth();
    
    if (!userId) {
      console.error("❌ 인증되지 않은 사용자");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("✅ 사용자 인증 확인:", userId);

    // 요청 본문 파싱 및 검증
    const body = await req.json();
    console.log("📥 요청 데이터:", body);

    const validationResult = MatchingRequestSchema.safeParse(body);

    if (!validationResult.success) {
      console.error("❌ 입력 검증 실패:", validationResult.error.errors);
      return NextResponse.json(
        {
          error: "Invalid input",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { primary_body_part, activities, budget_min, budget_max } =
      validationResult.data;

    // 예산 범위 검증
    if (budget_min > budget_max) {
      return NextResponse.json(
        { error: "예산 최소값은 최대값보다 작거나 같아야 합니다" },
        { status: 400 }
      );
    }

    console.log("✅ 입력 검증 완료");

    // Supabase 클라이언트 생성
    const supabase = getServiceRoleClient();

    // 사용자 세션 조회
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (sessionError || !session) {
      console.warn("⚠️ 세션을 찾을 수 없음, 새로 생성 시도");
      // 세션이 없으면 새로 생성
      const { data: newSession, error: createError } = await supabase
        .from("sessions")
        .insert({
          clerk_user_id: userId,
          email: "", // 나중에 업데이트 가능
        })
        .select()
        .single();

      if (createError || !newSession) {
        console.error("❌ 세션 생성 실패:", createError);
        return NextResponse.json(
          { error: "Failed to create session" },
          { status: 500 }
        );
      }

      console.log("✅ 새 세션 생성:", newSession.id);
    }

    const sessionId = session?.id || (await supabase
      .from("sessions")
      .select("id")
      .eq("clerk_user_id", userId)
      .single()).data?.id;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Failed to get or create session" },
        { status: 500 }
      );
    }

    // 상품 데이터 조회
    const startTime = Date.now();
    console.log("🔍 상품 데이터 조회 시작");

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) {
      console.error("❌ 상품 조회 실패:", productsError);
      return NextResponse.json(
        { error: "Failed to fetch products", details: productsError.message },
        { status: 500 }
      );
    }

    if (!products || products.length === 0) {
      console.warn("⚠️ 상품 데이터가 없습니다");
      return NextResponse.json(
        { error: "No products available" },
        { status: 404 }
      );
    }

    console.log(`✅ ${products.length}개 상품 조회 완료`);

    // 매칭 알고리즘 실행
    console.log("🧮 매칭 점수 계산 시작");
    const productsWithScores = products.map((product) => ({
      ...product,
      matchScore: calculateMatchScore(
        product,
        primary_body_part,
        activities,
        budget_min,
        budget_max
      ),
    }));

    // 점수순으로 정렬하고 상위 3개 선택
    const topProducts = productsWithScores
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3)
      .map((product) => ({
        product_id: product.product_id,
        name: product.name,
        description: product.description,
        category: product.category,
        price_range_min: product.price_range_min,
        price_range_max: product.price_range_max,
        image_url: product.image_url,
        average_rating: product.average_rating,
        review_count: product.review_count,
        match_score: product.matchScore,
      }));

    const processingTime = Date.now() - startTime;
    console.log(`✅ 매칭 완료 (${processingTime}ms)`);
    console.log("🏆 추천 상품:", topProducts.map((p) => p.name));

    // 매칭 결과 저장
    const { data: matching, error: matchingError } = await supabase
      .from("matchings")
      .insert({
        session_id: sessionId,
        clerk_user_id: userId,
        primary_body_part,
        activities,
        budget_min,
        budget_max,
        recommendations: topProducts,
        ai_processing_time_ms: processingTime,
        match_accuracy_score: topProducts[0]?.match_score || 0,
        device_type: req.headers.get("user-agent")?.includes("Mobile")
          ? "mobile"
          : req.headers.get("user-agent")?.includes("Tablet")
          ? "tablet"
          : "desktop",
        os: req.headers.get("user-agent") || "unknown",
      })
      .select()
      .single();

    if (matchingError) {
      console.error("❌ 매칭 결과 저장 실패:", matchingError);
      // 저장 실패해도 결과는 반환
    } else {
      console.log("✅ 매칭 결과 저장 완료:", matching.id);
    }

    console.groupEnd();

    return NextResponse.json({
      success: true,
      recommendations: topProducts,
      matching_id: matching?.id,
      processing_time_ms: processingTime,
    });
  } catch (error) {
    console.error("❌ 매칭 API 오류:", error);
    console.groupEnd();
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

