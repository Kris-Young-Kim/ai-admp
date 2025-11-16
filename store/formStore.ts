import { create } from "zustand";

/**
 * 폼 상태 관리 스토어
 * 
 * @file store/formStore.ts
 * @description 매칭 폼의 상태를 관리하는 Zustand 스토어
 * 
 * 주요 기능:
 * 1. 폼 데이터 저장 (신체 부위, 활동, 예산)
 * 2. 폼 에러 상태 관리
 * 3. 제출 상태 관리
 * 4. 폼 초기화
 * 
 * @dependencies
 * - zustand: 상태 관리 라이브러리
 */

export interface MatchingFormData {
  primary_body_part: string;
  activities: string[];
  budget_min: number;
  budget_max: number;
}

interface FormState {
  // 폼 데이터
  formData: MatchingFormData;
  
  // 폼 상태
  formErrors: Partial<Record<keyof MatchingFormData, string>>;
  isSubmitting: boolean;
  isDirty: boolean;
  
  // 액션
  updateFormData: (data: Partial<MatchingFormData>) => void;
  setFormError: (field: keyof MatchingFormData, error: string | null) => void;
  setFormErrors: (errors: Partial<Record<keyof MatchingFormData, string>>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
  validateForm: () => boolean;
}

const initialFormData: MatchingFormData = {
  primary_body_part: "",
  activities: [],
  budget_min: 0,
  budget_max: 0,
};

export const useFormStore = create<FormState>((set, get) => ({
  formData: initialFormData,
  formErrors: {},
  isSubmitting: false,
  isDirty: false,

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
      isDirty: true,
      // 데이터 업데이트 시 해당 필드의 에러 제거
      formErrors: Object.keys(data).reduce(
        (acc, key) => {
          const field = key as keyof MatchingFormData;
          const { [field]: _, ...rest } = acc;
          return rest;
        },
        state.formErrors
      ),
    })),

  setFormError: (field, error) =>
    set((state) => ({
      formErrors: error
        ? { ...state.formErrors, [field]: error }
        : Object.keys(state.formErrors)
            .filter((key) => key !== field)
            .reduce(
              (acc, key) => {
                acc[key as keyof MatchingFormData] =
                  state.formErrors[key as keyof MatchingFormData]!;
                return acc;
              },
              {} as Partial<Record<keyof MatchingFormData, string>>
            ),
    })),

  setFormErrors: (errors) =>
    set({ formErrors: errors }),

  setSubmitting: (isSubmitting) =>
    set({ isSubmitting }),

  resetForm: () =>
    set({
      formData: initialFormData,
      formErrors: {},
      isSubmitting: false,
      isDirty: false,
    }),

  validateForm: () => {
    const { formData } = get();
    const errors: Partial<Record<keyof MatchingFormData, string>> = {};

    // 신체 부위 검증
    if (!formData.primary_body_part || formData.primary_body_part.trim() === "") {
      errors.primary_body_part = "신체 부위를 선택해주세요";
    }

    // 활동 검증
    if (!formData.activities || formData.activities.length === 0) {
      errors.activities = "최소 1개 이상의 활동을 선택해주세요";
    }

    // 예산 검증
    if (formData.budget_min < 0) {
      errors.budget_min = "예산 최소값은 0 이상이어야 합니다";
    }

    if (formData.budget_max < 0) {
      errors.budget_max = "예산 최대값은 0 이상이어야 합니다";
    }

    if (formData.budget_min > formData.budget_max) {
      errors.budget_max = "예산 최대값은 최소값보다 크거나 같아야 합니다";
    }

    set({ formErrors: errors });
    return Object.keys(errors).length === 0;
  },
}));

