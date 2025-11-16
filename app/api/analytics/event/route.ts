import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServiceRoleClient } from "@/lib/supabase/service-role";

/**
 * 분석 이벤트 API
 * 
 * 사용자 행동 이벤트를 추적하고 저장합니다.
 * Google Analytics 동기화를 위한 이벤트 저장소 역할을 합니다.
 * 
 * @file app/api/analytics/event/route.ts
 * @description 사용자 행동 분석 이벤트 저장 API 엔드포인트
 * 
 * 주요 기능:
 * 1. 이벤트 데이터 검증 (Zod 스키마)
 * 2. 사용자 세션 조회/생성
 * 3. 이벤트를 events 테이블에 저장
 * 4. 배치 처리 지원 (여러 이벤트 한 번에 저장)
 * 
 * @dependencies
 * - @clerk/nextjs/server: 사용자 인증
 * - zod: 입력 검증
 * - @supabase/supabase-js: 데이터베이스 쿼리
 */

// 단일 이벤트 스키마
const EventSchema = z.object({
  event_name: z.string().min(1, "이벤트 이름은 필수입니다").max(100),
  event_data: z.record(z.any()).optional(),
});

// 요청 스키마 (단일 또는 배치)
const AnalyticsRequestSchema = z.object({
  event: EventSchema.optional(),
  events: z.array(EventSchema).optional(),
}).refine(
  (data) => data.event || (data.events && data.events.length > 0),
  {
    message: "event 또는 events 중 하나는 필수입니다",
  }
);

// IP 주소 추출 헬퍼 함수
function getClientIP(req: NextRequest): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return null;
}

export async function POST(req: NextRequest) {
  console.group("📊 분석 이벤트 API 호출");

  try {
    // Clerk 인증 확인 (선택적 - 익명 사용자도 이벤트 추적 가능)
    const { userId } = await auth();
    const supabase = getServiceRoleClient();

    // 사용자 세션 조회 또는 생성
    let sessionId: string | null = null;

    if (userId) {
      console.log("✅ 사용자 인증 확인:", userId);

      const { data: session, error: sessionError } = await supabase
        .from("sessions")
        .select("id")
        .eq("clerk_user_id", userId)
        .single();

      if (session) {
        sessionId = session.id;
        console.log("✅ 기존 세션 사용:", sessionId);
      } else if (!sessionError || sessionError.code === "PGRST116") {
        // 세션이 없으면 새로 생성
        const { data: newSession, error: createError } = await supabase
          .from("sessions")
          .insert({
            clerk_user_id: userId,
            email: "",
          })
          .select()
          .single();

        if (newSession) {
          sessionId = newSession.id;
          console.log("✅ 새 세션 생성:", sessionId);
        } else {
          console.warn("⚠️ 세션 생성 실패:", createError);
        }
      }
    } else {
      console.log("ℹ️ 익명 사용자 이벤트");
    }

    // 요청 본문 파싱 및 검증
    const body = await req.json();
    console.log("📥 요청 데이터:", body);

    const validationResult = AnalyticsRequestSchema.safeParse(body);

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

    const { event, events } = validationResult.data;

    // 단일 이벤트를 배열로 변환
    const eventsToSave = event ? [event] : events || [];

    console.log(`✅ 입력 검증 완료 (${eventsToSave.length}개 이벤트)`);

    // User-Agent 및 IP 주소 추출
    const userAgent = req.headers.get("user-agent") || null;
    const ipAddress = getClientIP(req);

    // 이벤트 저장 (배치 처리)
    const eventsData = eventsToSave.map((evt) => ({
      session_id: sessionId,
      event_name: evt.event_name,
      event_data: evt.event_data || {},
      user_agent: userAgent,
      ip_address: ipAddress,
    }));

    const { data: savedEvents, error: saveError } = await supabase
      .from("events")
      .insert(eventsData)
      .select();

    if (saveError) {
      console.error("❌ 이벤트 저장 실패:", saveError);
      return NextResponse.json(
        {
          error: "Failed to save events",
          details: saveError.message,
        },
        { status: 500 }
      );
    }

    console.log(`✅ ${savedEvents.length}개 이벤트 저장 완료`);
    console.groupEnd();

    return NextResponse.json({
      success: true,
      saved_count: savedEvents.length,
      event_ids: savedEvents.map((e) => e.id),
    });
  } catch (error) {
    console.error("❌ 분석 API 오류:", error);
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

