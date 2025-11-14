import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase/service-role";

/**
 * Clerk Webhook 엔드포인트
 *
 * Clerk에서 발생하는 이벤트를 받아 Supabase에 자동으로 동기화합니다.
 * - user.created: 새 사용자 생성 시 sessions 테이블에 추가
 * - user.updated: 사용자 정보 업데이트 시 sessions 테이블 업데이트
 * - user.deleted: 사용자 삭제 시 sessions 테이블에서 제거 (선택사항)
 *
 * @see https://clerk.com/docs/integrations/webhooks/overview
 */
export async function POST(req: Request) {
  console.group("🔔 Clerk Webhook Received");

  // Webhook 시크릿 확인
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ CLERK_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  // 헤더에서 필요한 정보 가져오기
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing svix headers");
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  // 요청 본문 가져오기
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Webhook 검증
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    console.log("✅ Webhook verified:", evt.type);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  // 이벤트 타입에 따라 처리
  const eventType = evt.type;
  console.log("📋 Event type:", eventType);

  const supabase = getServiceRoleClient();

  try {
    switch (eventType) {
      case "user.created": {
        console.log("👤 User created:", evt.data.id);

        const user = evt.data;
        const email = user.email_addresses?.[0]?.email_address || "";

        // Supabase sessions 테이블에 사용자 추가
        const { data, error } = await supabase
          .from("sessions")
          .upsert(
            {
              clerk_user_id: user.id,
              email: email,
              metadata: {
                created_via: "webhook",
                created_at: new Date().toISOString(),
              },
            },
            {
              onConflict: "clerk_user_id",
            }
          )
          .select()
          .single();

        if (error) {
          console.error("❌ Failed to create session:", error);
          return NextResponse.json(
            { error: "Failed to create session", details: error.message },
            { status: 500 }
          );
        }

        console.log("✅ Session created:", data.id);
        break;
      }

      case "user.updated": {
        console.log("👤 User updated:", evt.data.id);

        const user = evt.data;
        const email = user.email_addresses?.[0]?.email_address || "";

        // Supabase sessions 테이블 업데이트
        const { data, error } = await supabase
          .from("sessions")
          .upsert(
            {
              clerk_user_id: user.id,
              email: email,
              updated_at: new Date().toISOString(),
              metadata: {
                updated_via: "webhook",
                updated_at: new Date().toISOString(),
              },
            },
            {
              onConflict: "clerk_user_id",
            }
          )
          .select()
          .single();

        if (error) {
          console.error("❌ Failed to update session:", error);
          return NextResponse.json(
            { error: "Failed to update session", details: error.message },
            { status: 500 }
          );
        }

        console.log("✅ Session updated:", data.id);
        break;
      }

      case "user.deleted": {
        console.log("👤 User deleted:", evt.data.id);

        const userId = evt.data.id;

        // Supabase sessions 테이블에서 사용자 제거
        // 주의: CASCADE로 인해 관련된 matchings, events도 함께 삭제됨
        const { error } = await supabase
          .from("sessions")
          .delete()
          .eq("clerk_user_id", userId);

        if (error) {
          console.error("❌ Failed to delete session:", error);
          return NextResponse.json(
            { error: "Failed to delete session", details: error.message },
            { status: 500 }
          );
        }

        console.log("✅ Session deleted for user:", userId);
        break;
      }

      default:
        console.log("ℹ️ Unhandled event type:", eventType);
    }

    console.groupEnd();
    return NextResponse.json({ received: true, eventType });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    console.groupEnd();
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

