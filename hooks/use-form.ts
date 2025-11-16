"use client";

import { useCallback } from "react";
import { useFormStore, MatchingFormData } from "@/store/formStore";

/**
 * 폼 상태 관리 커스텀 훅
 * 
 * @file hooks/use-form.ts
 * @description 매칭 폼의 상태를 관리하는 커스텀 훅
 * 
 * 주요 기능:
 * 1. 폼 데이터 업데이트
 * 2. 폼 검증
 * 3. 폼 초기화
 * 4. 에러 관리
 * 
 * @dependencies
 * - store/formStore: 폼 상태 관리 스토어
 */

export function useForm() {
  const {
    formData,
    formErrors,
    isSubmitting,
    isDirty,
    updateFormData,
    setFormError,
    setFormErrors,
    setSubmitting,
    resetForm,
    validateForm,
  } = useFormStore();

  /**
   * 폼 필드 업데이트
   */
  const updateField = useCallback(
    <K extends keyof MatchingFormData>(
      field: K,
      value: MatchingFormData[K]
    ) => {
      updateFormData({ [field]: value });
    },
    [updateFormData]
  );

  /**
   * 여러 필드 한 번에 업데이트
   */
  const updateFields = useCallback(
    (data: Partial<MatchingFormData>) => {
      updateFormData(data);
    },
    [updateFormData]
  );

  /**
   * 폼 제출 준비 (검증 포함)
   */
  const prepareSubmit = useCallback(() => {
    return validateForm();
  }, [validateForm]);

  /**
   * 특정 필드 에러 설정
   */
  const setFieldError = useCallback(
    (field: keyof MatchingFormData, error: string | null) => {
      setFormError(field, error);
    },
    [setFormError]
  );

  /**
   * 모든 에러 초기화
   */
  const clearErrors = useCallback(() => {
    setFormErrors({});
  }, [setFormErrors]);

  return {
    // 상태
    formData,
    formErrors,
    isSubmitting,
    isDirty,

    // 액션
    updateField,
    updateFields,
    setSubmitting,
    resetForm,
    validateForm: prepareSubmit,
    setFieldError,
    clearErrors,
  };
}

