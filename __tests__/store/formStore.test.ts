import { describe, it, expect, beforeEach } from "vitest";
import { useFormStore } from "@/store/formStore";

/**
 * FormStore 테스트
 * 
 * @file __tests__/store/formStore.test.ts
 */

describe("useFormStore", () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 초기화
    useFormStore.getState().resetForm();
  });

  it("초기 상태가 올바르게 설정되어야 함", () => {
    const state = useFormStore.getState();
    expect(state.formData.primary_body_part).toBe("");
    expect(state.formData.activities).toEqual([]);
    expect(state.formData.budget_min).toBe(0);
    expect(state.formData.budget_max).toBe(0);
    expect(state.formErrors).toEqual({});
    expect(state.isSubmitting).toBe(false);
    expect(state.isDirty).toBe(false);
  });

  it("updateFormData가 폼 데이터를 업데이트해야 함", () => {
    const { updateFormData } = useFormStore.getState();
    
    updateFormData({
      primary_body_part: "arm",
      activities: ["work", "household"],
    });

    const state = useFormStore.getState();
    expect(state.formData.primary_body_part).toBe("arm");
    expect(state.formData.activities).toEqual(["work", "household"]);
    expect(state.isDirty).toBe(true);
  });

  it("validateForm이 유효한 데이터를 통과시켜야 함", () => {
    const { updateFormData, validateForm } = useFormStore.getState();
    
    updateFormData({
      primary_body_part: "arm",
      activities: ["work"],
      budget_min: 100000,
      budget_max: 500000,
    });

    const isValid = validateForm();
    expect(isValid).toBe(true);
    expect(useFormStore.getState().formErrors).toEqual({});
  });

  it("validateForm이 빈 신체 부위를 거부해야 함", () => {
    const { updateFormData, validateForm } = useFormStore.getState();
    
    updateFormData({
      primary_body_part: "",
      activities: ["work"],
      budget_min: 100000,
      budget_max: 500000,
    });

    const isValid = validateForm();
    expect(isValid).toBe(false);
    expect(useFormStore.getState().formErrors.primary_body_part).toBe(
      "신체 부위를 선택해주세요"
    );
  });

  it("validateForm이 빈 활동 배열을 거부해야 함", () => {
    const { updateFormData, validateForm } = useFormStore.getState();
    
    updateFormData({
      primary_body_part: "arm",
      activities: [],
      budget_min: 100000,
      budget_max: 500000,
    });

    const isValid = validateForm();
    expect(isValid).toBe(false);
    expect(useFormStore.getState().formErrors.activities).toBe(
      "최소 1개 이상의 활동을 선택해주세요"
    );
  });

  it("validateForm이 잘못된 예산 범위를 거부해야 함", () => {
    const { updateFormData, validateForm } = useFormStore.getState();
    
    updateFormData({
      primary_body_part: "arm",
      activities: ["work"],
      budget_min: 500000,
      budget_max: 100000, // 최소값이 최대값보다 큼
    });

    const isValid = validateForm();
    expect(isValid).toBe(false);
    expect(useFormStore.getState().formErrors.budget_max).toBe(
      "예산 최대값은 최소값보다 크거나 같아야 합니다"
    );
  });

  it("resetForm이 폼을 초기 상태로 되돌려야 함", () => {
    const { updateFormData, resetForm } = useFormStore.getState();
    
    updateFormData({
      primary_body_part: "arm",
      activities: ["work"],
      budget_min: 100000,
      budget_max: 500000,
    });

    resetForm();

    const state = useFormStore.getState();
    expect(state.formData.primary_body_part).toBe("");
    expect(state.formData.activities).toEqual([]);
    expect(state.formData.budget_min).toBe(0);
    expect(state.formData.budget_max).toBe(0);
    expect(state.formErrors).toEqual({});
    expect(state.isDirty).toBe(false);
  });

  it("setFormError가 특정 필드의 에러를 설정해야 함", () => {
    const { setFormError } = useFormStore.getState();
    
    setFormError("primary_body_part", "에러 메시지");
    
    const state = useFormStore.getState();
    expect(state.formErrors.primary_body_part).toBe("에러 메시지");
  });

  it("setFormError가 null로 에러를 제거해야 함", () => {
    const { setFormError } = useFormStore.getState();
    
    setFormError("primary_body_part", "에러 메시지");
    setFormError("primary_body_part", null);
    
    const state = useFormStore.getState();
    expect(state.formErrors.primary_body_part).toBeUndefined();
  });
});

