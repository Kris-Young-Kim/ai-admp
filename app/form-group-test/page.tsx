"use client"

/**
 * @file app/form-group-test/page.tsx
 * @description FormGroup 컴포넌트 테스트 페이지
 *
 * 이 페이지는 FormGroup 컴포넌트의 Radio button 그룹과 Checkbox 그룹을
 * 테스트하기 위한 예제 페이지입니다.
 *
 * 주요 테스트 항목:
 * 1. Radio button 그룹 (단일 선택)
 * 2. Checkbox 그룹 (다중 선택)
 * 3. 유효성 검사 (required)
 * 4. 접근성 (role="group", aria-label)
 * 5. 수평/수직 레이아웃
 */

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { FormGroup } from "@/components/ui/form-group"
import { Button } from "@/components/ui/button"

// 폼 스키마 정의
const formSchema = z.object({
  preference: z.string().min(1, "선호도를 선택해주세요."),
  interests: z.array(z.string()).min(1, "최소 1개 이상의 관심사를 선택해주세요."),
  experience: z.string().optional(),
  features: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function FormGroupTestPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preference: "",
      interests: [],
      experience: "",
      features: [],
    },
  })

  const onSubmit = (data: FormValues) => {
    console.group("[FormGroup Test] 폼 제출")
    console.log("제출된 데이터:", data)
    console.groupEnd()
    alert(`폼이 제출되었습니다!\n\n${JSON.stringify(data, null, 2)}`)
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">FormGroup 컴포넌트 테스트</h1>
          <p className="text-muted-foreground">
            Radio button 그룹과 Checkbox 그룹의 동작을 테스트합니다.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Radio Group - 필수 */}
            <FormGroup
              type="radio"
              name="preference"
              label="선호도"
              description="가장 선호하는 옵션을 선택해주세요."
              required
              options={[
                { value: "option1", label: "옵션 1", description: "첫 번째 옵션입니다." },
                { value: "option2", label: "옵션 2", description: "두 번째 옵션입니다." },
                { value: "option3", label: "옵션 3", description: "세 번째 옵션입니다." },
              ]}
            />

            {/* Checkbox Group - 필수 */}
            <FormGroup
              type="checkbox"
              name="interests"
              label="관심사"
              description="관심 있는 항목을 모두 선택해주세요."
              required
              options={[
                { value: "tech", label: "기술" },
                { value: "design", label: "디자인" },
                { value: "business", label: "비즈니스" },
                { value: "marketing", label: "마케팅" },
              ]}
            />

            {/* Radio Group - 선택사항, 수평 레이아웃 */}
            <FormGroup
              type="radio"
              name="experience"
              label="경험 수준"
              description="당신의 경험 수준을 선택해주세요. (선택사항)"
              orientation="horizontal"
              options={[
                { value: "beginner", label: "초보자" },
                { value: "intermediate", label: "중급자" },
                { value: "advanced", label: "고급자" },
              ]}
            />

            {/* Checkbox Group - 선택사항 */}
            <FormGroup
              type="checkbox"
              name="features"
              label="원하는 기능"
              description="원하는 기능을 선택해주세요. (선택사항)"
              options={[
                { value: "feature1", label: "기능 1", description: "첫 번째 기능 설명" },
                { value: "feature2", label: "기능 2", description: "두 번째 기능 설명" },
                { value: "feature3", label: "기능 3", description: "세 번째 기능 설명" },
                { value: "feature4", label: "기능 4", disabled: true, description: "비활성화된 기능" },
              ]}
            />

            <div className="flex gap-4">
              <Button type="submit">제출하기</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  console.log("[FormGroup Test] 폼 리셋")
                }}
              >
                리셋
              </Button>
            </div>
          </form>
        </Form>

        {/* 현재 폼 값 표시 (디버깅용) */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-2">현재 폼 값 (디버깅용)</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

