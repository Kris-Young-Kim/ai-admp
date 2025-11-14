"use client"

/**
 * @file app/input-test/page.tsx
 * @description Input 컴포넌트 접근성 및 기능 테스트 페이지
 *
 * 이 페이지는 Input 컴포넌트의 접근성 속성(labelledBy, describedBy)과
 * 다양한 기능을 테스트하기 위한 예제 페이지입니다.
 *
 * 주요 테스트 항목:
 * 1. 접근성 속성 검증 (aria-labelledby, aria-describedby)
 * 2. 라벨 연결 (htmlFor/id)
 * 3. 설명 텍스트 연결
 * 4. 에러 메시지 연결
 * 5. 다양한 Input 타입 (text, email, tel, number)
 * 6. 필수 항목 표시
 * 7. 유효성 검사
 */

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// 폼 스키마 정의
const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요.").min(2, "이름은 최소 2자 이상이어야 합니다."),
  email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
  phone: z.string().min(1, "전화번호를 입력해주세요.").regex(/^[0-9-]+$/, "숫자와 하이픈(-)만 입력 가능합니다."),
  age: z.coerce.number().min(1, "나이를 입력해주세요.").min(1, "나이는 1 이상이어야 합니다.").max(150, "나이는 150 이하여야 합니다."),
  website: z.string().url("올바른 URL 형식이 아닙니다.").optional().or(z.literal("")),
  bio: z.string().max(100, "자기소개는 100자 이하여야 합니다.").optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function InputTestPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: undefined,
      website: "",
      bio: "",
    },
  })

  const onSubmit = (data: FormValues) => {
    console.group("[Input Test] 폼 제출")
    console.log("제출된 데이터:", data)
    console.groupEnd()
    alert(`폼이 제출되었습니다!\n\n${JSON.stringify(data, null, 2)}`)
  }

  // 접근성 속성 확인 함수
  const checkAccessibility = () => {
    const inputs = document.querySelectorAll('input[data-slot="input"]')
    const results: Array<{
      field: string
      hasLabel: boolean
      hasAriaLabelledBy: boolean
      hasAriaDescribedBy: boolean
      hasAriaInvalid: boolean
      labelId?: string
      describedBy?: string
    }> = []

    inputs.forEach((input) => {
      const id = input.getAttribute("id")
      const ariaLabelledBy = input.getAttribute("aria-labelledby")
      const ariaDescribedBy = input.getAttribute("aria-describedby")
      const ariaInvalid = input.getAttribute("aria-invalid")

      // 라벨 찾기
      const label = document.querySelector(`label[for="${id}"]`)
      const labelId = label?.getAttribute("id")

      results.push({
        field: id || "unknown",
        hasLabel: !!label,
        hasAriaLabelledBy: !!ariaLabelledBy,
        hasAriaDescribedBy: !!ariaDescribedBy,
        hasAriaInvalid: ariaInvalid === "true",
        labelId: labelId || undefined,
        describedBy: ariaDescribedBy || undefined,
      })
    })

    console.group("[Input Test] 접근성 속성 검증 결과")
    console.table(results)
    console.groupEnd()

    // 결과를 alert로 표시
    const summary = results.map((r) => {
      const checks = [
        r.hasLabel ? "✓ 라벨" : "✗ 라벨",
        r.hasAriaLabelledBy ? "✓ aria-labelledby" : "✗ aria-labelledby",
        r.hasAriaDescribedBy ? "✓ aria-describedby" : "✗ aria-describedby",
      ].join(", ")
      return `${r.field}: ${checks}`
    }).join("\n")

    alert(`접근성 검증 결과:\n\n${summary}`)
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Input 컴포넌트 접근성 테스트</h1>
          <p className="text-muted-foreground mb-4">
            Input 컴포넌트의 접근성 속성(labelledBy, describedBy)과 기능을 테스트합니다.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={checkAccessibility}
            className="mb-4"
          >
            접근성 속성 검증
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Text Input - 필수, 라벨, 설명, 에러 메시지 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>이름</FormLabel>
                  <FormDescription>
                    본인의 실명을 입력해주세요. (최소 2자 이상)
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="홍길동"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Input - 필수, 라벨, 설명, 에러 메시지 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>이메일</FormLabel>
                  <FormDescription>
                    로그인에 사용할 이메일 주소를 입력해주세요.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tel Input - 필수, 라벨, 설명, 에러 메시지 */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>전화번호</FormLabel>
                  <FormDescription>
                    연락 가능한 전화번호를 입력해주세요. (숫자와 하이픈만 가능)
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="010-1234-5678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number Input - 필수, 라벨, 설명, 에러 메시지 */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>나이</FormLabel>
                  <FormDescription>
                    본인의 나이를 입력해주세요. (1-150)
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="25"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL Input - 선택사항, 라벨, 설명 */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>웹사이트</FormLabel>
                  <FormDescription>
                    개인 웹사이트나 블로그 URL을 입력해주세요. (선택사항)
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Text Input - 선택사항, 최대 길이 제한 */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>자기소개</FormLabel>
                  <FormDescription>
                    간단한 자기소개를 입력해주세요. (최대 100자, 선택사항)
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="안녕하세요!"
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">제출하기</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  console.log("[Input Test] 폼 리셋")
                }}
              >
                리셋
              </Button>
            </div>
          </form>
        </Form>

        {/* 접근성 가이드 */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-2">접근성 검증 체크리스트</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>✓ 모든 Input에 라벨이 연결되어 있는가? (htmlFor/id)</li>
            <li>✓ aria-labelledby 속성이 올바르게 설정되어 있는가?</li>
            <li>✓ aria-describedby 속성이 설명/에러 메시지와 연결되어 있는가?</li>
            <li>✓ 에러 발생 시 aria-invalid="true"가 설정되는가?</li>
            <li>✓ 필수 항목에 별표(*) 표시가 있는가?</li>
            <li>✓ 스크린 리더가 라벨, 설명, 에러 메시지를 모두 읽을 수 있는가?</li>
          </ul>
        </div>

        {/* 현재 폼 값 표시 (디버깅용) */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-2">현재 폼 값 (디버깅용)</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

