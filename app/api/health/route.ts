import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase/service-role";

/**
 * 헬스체크 API
 * 
 * 시스템의 전반적인 상태를 확인합니다.
 * 데이터베이스 연결, API 상태, 외부 서비스 상태를 점검합니다.
 * 
 * @file app/api/health/route.ts
 * @description 시스템 헬스체크 API 엔드포인트
 * 
 * 주요 기능:
 * 1. 데이터베이스 연결 상태 확인
 * 2. API 상태 확인
 * 3. 외부 서비스 상태 확인 (선택적)
 * 
 * @dependencies
 * - @supabase/supabase-js: 데이터베이스 연결 확인
 */

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  services: {
    database: {
      status: "healthy" | "unhealthy";
      response_time_ms?: number;
      error?: string;
    };
    api: {
      status: "healthy";
    };
  };
}

export async function GET() {
  console.group("🏥 헬스체크 API 호출");

  const healthStatus: HealthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      database: {
        status: "unhealthy",
      },
      api: {
        status: "healthy",
      },
    },
  };

  try {
    // 데이터베이스 연결 확인
    const dbStartTime = Date.now();
    const supabase = getServiceRoleClient();

    const { error } = await supabase
      .from("sessions")
      .select("id")
      .limit(1);

    const dbResponseTime = Date.now() - dbStartTime;

    if (error) {
      console.error("❌ 데이터베이스 연결 실패:", error);
      healthStatus.services.database = {
        status: "unhealthy",
        response_time_ms: dbResponseTime,
        error: error.message,
      };
      healthStatus.status = "unhealthy";
    } else {
      console.log(`✅ 데이터베이스 연결 성공 (${dbResponseTime}ms)`);
      healthStatus.services.database = {
        status: "healthy",
        response_time_ms: dbResponseTime,
      };
    }

    // 응답 시간이 너무 길면 degraded 상태로 변경
    if (dbResponseTime > 1000) {
      console.warn("⚠️ 데이터베이스 응답 시간이 느림:", dbResponseTime, "ms");
      if (healthStatus.status === "healthy") {
        healthStatus.status = "degraded";
      }
    }

    console.groupEnd();

    // 상태에 따라 HTTP 상태 코드 결정
    const statusCode =
      healthStatus.status === "healthy"
        ? 200
        : healthStatus.status === "degraded"
        ? 200
        : 503;

    return NextResponse.json(healthStatus, { status: statusCode });
  } catch (error) {
    console.error("❌ 헬스체크 오류:", error);
    console.groupEnd();

    healthStatus.status = "unhealthy";
    healthStatus.services.database = {
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(healthStatus, { status: 503 });
  }
}

