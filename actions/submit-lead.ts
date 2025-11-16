"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * @file actions/submit-lead.ts
 * @description 랜딩 페이지에서 수집한 사용자 정보를 저장하는 Server Action
 *
 * 주요 기능:
 * 1. 이름, 이메일, 연락처 정보 수집
 * 2. Supabase leads 테이블에 저장
 * 3. 에러 처리 및 로깅
 *
 * @dependencies
 * - lib/supabase/server: Supabase 클라이언트
 */

interface SubmitLeadInput {
  name: string;
  email: string;
  phone: string;
}

interface SubmitLeadResult {
  success: boolean;
  error?: string;
  message?: string;
}

export async function submitLead(
  data: SubmitLeadInput
): Promise<SubmitLeadResult> {
  console.group("[submitLead] 정보 수집 시작");
  console.log("입력 데이터:", data);

  try {
    // 입력 데이터 검증
    if (!data.name || !data.email || !data.phone) {
      console.error("필수 필드 누락");
      return {
        success: false,
        error: "모든 필드를 입력해주세요.",
      };
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.error("이메일 형식 오류");
      return {
        success: false,
        error: "올바른 이메일 주소를 입력해주세요.",
      };
    }

    // Supabase 클라이언트 생성 (공개 데이터이므로 anon key 사용)
    const { createPublicClient } = await import("@/lib/supabase/server");
    const supabase = createPublicClient();

    // leads 테이블에 데이터 저장
    const { data: leadData, error } = await supabase
      .from("leads")
      .insert({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase 저장 오류:", error);
      return {
        success: false,
        error: "정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.",
      };
    }

    console.log("정보 저장 성공:", leadData);
    console.groupEnd();

    return {
      success: true,
      message: "신청이 완료되었습니다. 감사합니다!",
    };
  } catch (error) {
    console.error("[submitLead] 예상치 못한 오류:", error);
    console.groupEnd();
    return {
      success: false,
      error: "예상치 못한 오류가 발생했습니다. 다시 시도해주세요.",
    };
  }
}

