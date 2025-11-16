import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServiceRoleClient } from "@/lib/supabase/service-role";

/**
 * 피드백 제출 API
 * 
 * 사용자가 추천된 상품에 대한 피드백을 제출합니다.
 * 
 * @file app/api/feedback/submit/route.ts
 * @description 사용자 피드백 제출 API 엔드포인트
 * 
 * 주요 기능:
 * 1. 피드백 데이터 검증 (Zod 스키마)
 * 2. 매칭 ID 존재 여부 확인
 * 3. 피드백을 feedback 테이블에 저장
 * 
 * @dependencies
 * - @clerk/nextjs/server: 사용자 인증
 * - zod: 입력 검증
 * - @supabase/supabase-js: 데이터베이스 쿼리
 */

// 입력 검증 스키마
const FeedbackRequestSchema = z.object({
  matching_id: z.string().uuid("올바른 매칭 ID 형식이 아닙니다"),
  product_id: z.string().min(1, "상품 ID는 필수입니다"),
  useful: z.boolean(),
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().max(1000, "댓글은 1000자 이하여야 합니다").optional(),
});

export async function POST(req: NextRequest) {
  console.group("💬 피드백 제출 API 호출");

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

    const validationResult = FeedbackRequestSchema.safeParse(body);

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

    const { matching_id, product_id, useful, rating, comment } =
      validationResult.data;

    console.log("✅ 입력 검증 완료");

    // Supabase 클라이언트 생성
    const supabase = getServiceRoleClient();

    // 매칭 ID 존재 여부 확인
    const { data: matching, error: matchingError } = await supabase
      .from("matchings")
      .select("id, clerk_user_id")
      .eq("id", matching_id)
      .single();

    if (matchingError || !matching) {
      console.error("❌ 매칭을 찾을 수 없음:", matchingError);
      return NextResponse.json(
        { error: "Matching not found" },
        { status: 404 }
      );
    }

    // 사용자 권한 확인 (자신의 매칭에만 피드백 가능)
    if (matching.clerk_user_id !== userId) {
      console.error("❌ 권한 없음: 다른 사용자의 매칭");
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    console.log("✅ 매칭 확인 완료:", matching_id);

    // 피드백 저장
    const { data: feedback, error: feedbackError } = await supabase
      .from("feedback")
      .insert({
        matching_id,
        product_id,
        useful,
        rating: rating || null,
        comment: comment || null,
      })
      .select()
      .single();

    if (feedbackError) {
      console.error("❌ 피드백 저장 실패:", feedbackError);
      return NextResponse.json(
        {
          error: "Failed to save feedback",
          details: feedbackError.message,
        },
        { status: 500 }
      );
    }

    console.log("✅ 피드백 저장 완료:", feedback.id);
    console.groupEnd();

    return NextResponse.json({
      success: true,
      feedback_id: feedback.id,
      message: "피드백이 성공적으로 제출되었습니다",
    });
  } catch (error) {
    console.error("❌ 피드백 API 오류:", error);
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

