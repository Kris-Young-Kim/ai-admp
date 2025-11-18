"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/actions/submit-lead";
import type { SubmitLeadInput } from "@/actions/submit-lead";
import { CheckCircle2, Loader2 } from "lucide-react";
import { gtm } from "@/lib/analytics/gtm";

/**
 * @file components/lead-form.tsx
 * @description 랜딩 페이지 정보 수집 폼 컴포넌트
 *
 * 주요 기능:
 * 1. 이름, 이메일, 연락처 정보 수집
 * 2. 폼 유효성 검사 (Zod)
 * 3. Server Action을 통한 데이터 저장
 * 4. 성공/에러 상태 표시
 *
 * @dependencies
 * - react-hook-form: 폼 관리
 * - zod: 유효성 검사
 * - actions/submit-lead: 정보 저장 Server Action
 */

const leadFormSchema = z.object({
  name: z.string().min(2, "이름은 최소 2글자 이상 입력해주세요."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  phone: z.string().min(10, "연락처를 올바르게 입력해주세요."),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    console.group("[LeadForm] 폼 제출 시작");
    console.log("입력 데이터:", data);

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const payload: SubmitLeadInput = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

      const result = await submitLead(payload);

      console.log("제출 결과:", result);
      console.groupEnd();

      setSubmitResult(result);

      if (result.success) {
        // GTM 이벤트 추적: 폼 제출 성공
        gtm.formSubmit("lead_form", true, {
          form_location: "landing_page",
        });
        console.log("[LeadForm] GTM 이벤트 전송: form_submit (success)");

        // 성공 시 폼 초기화
        form.reset();
      } else {
        // GTM 이벤트 추적: 폼 제출 실패
        gtm.formSubmit("lead_form", false, {
          form_location: "landing_page",
          error_message: result.error,
        });
        console.log("[LeadForm] GTM 이벤트 전송: form_submit (failure)");
      }
    } catch (error) {
      console.error("[LeadForm] 제출 오류:", error);
      console.groupEnd();
      setSubmitResult({
        success: false,
        error: "예상치 못한 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 이름 입력 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>이름</FormLabel>
                <FormControl>
                  <Input
                    placeholder="홍길동"
                    {...field}
                    disabled={isSubmitting}
                    aria-label="이름 입력"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 이메일 입력 */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                    disabled={isSubmitting}
                    aria-label="이메일 입력"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 연락처 입력 */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>연락처</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="010-1234-5678"
                    {...field}
                    disabled={isSubmitting}
                    aria-label="연락처 입력"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 제출 결과 메시지 */}
          {submitResult && (
            <div
              className={`p-4 rounded-md ${
                submitResult.success
                  ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                  : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
              }`}
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center gap-2">
                {submitResult.success && (
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                )}
                <p className="font-medium">
                  {submitResult.success
                    ? submitResult.message
                    : submitResult.error}
                </p>
              </div>
            </div>
          )}

          {/* 제출 버튼 */}
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg py-6"
            disabled={isSubmitting}
            aria-label="신청하기"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                처리 중...
              </>
            ) : (
              "신청하기"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

