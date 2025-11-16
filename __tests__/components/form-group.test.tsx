import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { FormGroup } from "@/components/ui/form-group";

/**
 * FormGroup 컴포넌트 테스트
 * 
 * @file __tests__/components/form-group.test.tsx
 */

// FormProvider 래퍼 컴포넌트
function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: {
      testRadio: "",
      testCheckbox: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe("FormGroup - RadioGroup", () => {
  it("라디오 버튼 그룹을 렌더링해야 함", () => {
    render(
      <FormWrapper>
        <FormGroup
          name="testRadio"
          label="선택하세요"
          type="radio"
          options={[
            { value: "option1", label: "옵션 1" },
            { value: "option2", label: "옵션 2" },
          ]}
        />
      </FormWrapper>
    );

    expect(screen.getByText("선택하세요")).toBeInTheDocument();
    expect(screen.getByLabelText("옵션 1")).toBeInTheDocument();
    expect(screen.getByLabelText("옵션 2")).toBeInTheDocument();
  });

  it("라디오 버튼을 선택할 수 있어야 함", async () => {
    const user = userEvent.setup();
    
    render(
      <FormWrapper>
        <FormGroup
          name="testRadio"
          label="선택하세요"
          type="radio"
          options={[
            { value: "option1", label: "옵션 1" },
            { value: "option2", label: "옵션 2" },
          ]}
        />
      </FormWrapper>
    );

    const option1 = screen.getByLabelText("옵션 1");
    await user.click(option1);
    
    expect(option1).toBeChecked();
  });
});

describe("FormGroup - CheckboxGroup", () => {
  it("체크박스 그룹을 렌더링해야 함", () => {
    render(
      <FormWrapper>
        <FormGroup
          name="testCheckbox"
          label="선택하세요"
          type="checkbox"
          options={[
            { value: "option1", label: "옵션 1" },
            { value: "option2", label: "옵션 2" },
          ]}
        />
      </FormWrapper>
    );

    expect(screen.getByText("선택하세요")).toBeInTheDocument();
    expect(screen.getByLabelText("옵션 1")).toBeInTheDocument();
    expect(screen.getByLabelText("옵션 2")).toBeInTheDocument();
  });

  it("여러 체크박스를 선택할 수 있어야 함", async () => {
    const user = userEvent.setup();
    
    render(
      <FormWrapper>
        <FormGroup
          name="testCheckbox"
          label="선택하세요"
          type="checkbox"
          options={[
            { value: "option1", label: "옵션 1" },
            { value: "option2", label: "옵션 2" },
          ]}
        />
      </FormWrapper>
    );

    const option1 = screen.getByLabelText("옵션 1");
    const option2 = screen.getByLabelText("옵션 2");
    
    await user.click(option1);
    await user.click(option2);
    
    expect(option1).toBeChecked();
    expect(option2).toBeChecked();
  });
});

