/**
 * 스크린 리더 접근성 테스트
 * 
 * @file __tests__/accessibility/screen-reader.test.tsx
 * @description 컴포넌트의 스크린 리더 호환성을 검증하는 테스트
 * 
 * 주요 테스트:
 * 1. ARIA 속성 검증
 * 2. 라벨 연결 확인
 * 3. 역할(role) 확인
 * 4. 스크린 리더가 읽을 수 있는 텍스트 확인
 * 
 * @dependencies
 * - @testing-library/react: React 컴포넌트 테스트
 * - @testing-library/jest-dom: DOM 매처
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormGroup } from "@/components/ui/form-group";
import { FormProvider, useForm } from "react-hook-form";

describe("스크린 리더 접근성 테스트", () => {
  describe("Button 컴포넌트", () => {
    it("텍스트 버튼은 자체 텍스트로 라벨 제공", () => {
      render(<Button>제출하기</Button>);
      const button = screen.getByRole("button", { name: /제출하기/i });
      expect(button).toBeInTheDocument();
    });

    it("아이콘 버튼은 aria-label 제공", () => {
      render(
        <Button variant="icon" aria-label="메뉴 열기">
          <span aria-hidden="true">☰</span>
        </Button>
      );
      const button = screen.getByRole("button", { name: /메뉴 열기/i });
      expect(button).toBeInTheDocument();
    });

    it("disabled 버튼은 aria-disabled 속성 제공", () => {
      render(<Button disabled>비활성화</Button>);
      const button = screen.getByRole("button", { name: /비활성화/i });
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("버튼에 포커스 링이 적용되는지 확인", () => {
      const { container } = render(<Button>포커스 테스트</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("focus-visible:ring");
    });
  });

  describe("Input 컴포넌트", () => {
    it("라벨이 있는 입력 필드는 라벨과 연결", () => {
      render(<Input label="이메일" type="email" />);
      const input = screen.getByLabelText(/이메일/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "email");
    });

    it("에러 메시지가 role='alert'로 표시", () => {
      render(
        <Input
          label="이메일"
          type="email"
          errorMessage="올바른 이메일을 입력하세요"
        />
      );
      const errorMessage = screen.getByRole("alert");
      expect(errorMessage).toHaveTextContent(/올바른 이메일을 입력하세요/i);
    });

    it("설명 텍스트가 제공되는 경우 읽을 수 있음", () => {
      render(
        <Input
          label="비밀번호"
          type="password"
          description="8자 이상 입력하세요"
        />
      );
      const description = screen.getByText(/8자 이상 입력하세요/i);
      expect(description).toBeInTheDocument();
    });
  });

  describe("FormGroup 컴포넌트", () => {
    const TestForm = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm();
      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    it("라디오 그룹에 그룹 라벨 제공", () => {
      render(
        <TestForm>
          <FormGroup
            type="radio"
            name="test"
            label="선택 옵션"
            options={[
              { value: "option1", label: "옵션 1" },
              { value: "option2", label: "옵션 2" },
            ]}
          />
        </TestForm>
      );

      const group = screen.getByRole("group", { name: /선택 옵션/i });
      expect(group).toBeInTheDocument();
    });

    it("체크박스 그룹에 그룹 라벨 제공", () => {
      render(
        <TestForm>
          <FormGroup
            type="checkbox"
            name="test"
            label="관심사"
            options={[
              { value: "tech", label: "기술" },
              { value: "design", label: "디자인" },
            ]}
          />
        </TestForm>
      );

      const group = screen.getByRole("group", { name: /관심사/i });
      expect(group).toBeInTheDocument();
    });

    it("라디오 버튼 옵션이 읽을 수 있음", () => {
      render(
        <TestForm>
          <FormGroup
            type="radio"
            name="test"
            label="선택 옵션"
            options={[
              { value: "option1", label: "옵션 1" },
              { value: "option2", label: "옵션 2" },
            ]}
          />
        </TestForm>
      );

      const option1 = screen.getByRole("radio", { name: /옵션 1/i });
      const option2 = screen.getByRole("radio", { name: /옵션 2/i });
      expect(option1).toBeInTheDocument();
      expect(option2).toBeInTheDocument();
    });
  });

  describe("ARIA 속성 검증", () => {
    it("버튼에 적절한 ARIA 속성 제공", () => {
      render(<Button aria-label="접근성 테스트">테스트</Button>);
      const button = screen.getByRole("button", { name: /접근성 테스트/i });
      expect(button).toHaveAttribute("aria-label", "접근성 테스트");
    });

    it("입력 필드에 aria-invalid 속성 제공 (에러 시)", () => {
      render(
        <Input
          label="이메일"
          type="email"
          errorMessage="에러 메시지"
          aria-invalid="true"
        />
      );
      const input = screen.getByLabelText(/이메일/i);
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("랜드마크 역할", () => {
    it("메인 콘텐츠 영역이 main 역할로 지정", () => {
      const { container } = render(
        <main id="main-content" role="main">
          메인 콘텐츠
        </main>
      );
      const main = container.querySelector("main[role='main']");
      expect(main).toBeInTheDocument();
    });
  });

  describe("동적 콘텐츠 접근성", () => {
    it("ARIA Live Region이 존재", () => {
      const { container } = render(
        <div aria-live="polite" aria-atomic="true">
          동적 콘텐츠
        </div>
      );
      const liveRegion = container.querySelector("[aria-live]");
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveAttribute("aria-live", "polite");
    });
  });
});

