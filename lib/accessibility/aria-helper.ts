/**
 * ARIA 속성 헬퍼 함수
 * 
 * @file lib/accessibility/aria-helper.ts
 * @description ARIA 속성 검증 및 생성 유틸리티
 * 
 * 주요 기능:
 * 1. ARIA 속성 검증
 * 2. 접근성 속성 자동 생성
 * 3. 시맨틱 HTML 검증
 */

/**
 * 버튼의 접근성 속성 검증
 */
export function validateButtonAria(
  hasLabel: boolean,
  ariaLabel?: string
): { isValid: boolean; error?: string } {
  if (!hasLabel && !ariaLabel) {
    return {
      isValid: false,
      error: "버튼에 텍스트나 aria-label이 필요합니다",
    };
  }
  return { isValid: true };
}

/**
 * 이미지의 alt 속성 검증
 */
export function validateImageAlt(
  alt?: string,
  isDecorative: boolean = false
): { isValid: boolean; error?: string } {
  if (isDecorative && alt !== "") {
    return {
      isValid: false,
      error: "장식용 이미지는 alt=''로 설정해야 합니다",
    };
  }
  if (!isDecorative && !alt) {
    return {
      isValid: false,
      error: "의미 있는 이미지는 alt 속성이 필요합니다",
    };
  }
  return { isValid: true };
}

/**
 * 폼 필드의 라벨 연결 검증
 */
export function validateFormLabel(
  hasLabel: boolean,
  htmlFor?: string,
  ariaLabel?: string
): { isValid: boolean; error?: string } {
  if (!hasLabel && !ariaLabel) {
    return {
      isValid: false,
      error: "폼 필드에 라벨이나 aria-label이 필요합니다",
    };
  }
  if (hasLabel && !htmlFor) {
    return {
      isValid: false,
      error: "라벨과 입력 필드는 htmlFor/id로 연결되어야 합니다",
    };
  }
  return { isValid: true };
}

/**
 * 랜드마크 역할 검증
 */
export function validateLandmark(element: HTMLElement): {
  isValid: boolean;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  const tagName = element.tagName.toLowerCase();

  // 시맨틱 HTML 태그 확인
  const semanticTags = ["header", "nav", "main", "aside", "footer", "article", "section"];
  if (!semanticTags.includes(tagName) && !element.getAttribute("role")) {
    suggestions.push(`시맨틱 태그(<${semanticTags.join(">, <")}>) 사용을 고려하세요`);
  }

  // role 속성 확인
  if (element.getAttribute("role")) {
    const role = element.getAttribute("role");
    if (semanticTags.includes(tagName) && role === tagName) {
      suggestions.push(`시맨틱 태그를 사용하면 role 속성이 불필요합니다`);
    }
  }

  return {
    isValid: suggestions.length === 0,
    suggestions,
  };
}

/**
 * 포커스 인디케이터 스타일 검증
 */
export function validateFocusIndicator(element: HTMLElement): {
  isValid: boolean;
  error?: string;
} {
  const styles = window.getComputedStyle(element, ":focus-visible");
  const outlineWidth = parseInt(styles.outlineWidth) || 0;
  const boxShadow = styles.boxShadow;

  if (outlineWidth < 2 && !boxShadow) {
    return {
      isValid: false,
      error: "포커스 인디케이터는 최소 2px 이상이어야 합니다",
    };
  }

  return { isValid: true };
}

/**
 * 색상 대비 계산 (간단한 검증)
 */
export function calculateContrastRatio(
  foreground: string,
  background: string
): number {
  // 실제 구현은 더 복잡하지만, 기본 구조만 제공
  // 실제로는 RGB 값을 파싱하고 상대 휘도를 계산해야 함
  return 4.5; // 임시 값
}

/**
 * 접근성 검증 리포트 생성
 */
export function generateAccessibilityReport(
  element: HTMLElement
): {
  element: string;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // 버튼 검증
  if (element.tagName === "BUTTON" || element.getAttribute("role") === "button") {
    const hasText = element.textContent?.trim().length > 0;
    const ariaLabel = element.getAttribute("aria-label");
    const validation = validateButtonAria(hasText, ariaLabel || undefined);
    if (!validation.isValid) {
      issues.push(validation.error!);
    }
  }

  // 이미지 검증
  if (element.tagName === "IMG") {
    const alt = element.getAttribute("alt");
    const isDecorative = element.getAttribute("role") === "presentation";
    const validation = validateImageAlt(alt || undefined, isDecorative);
    if (!validation.isValid) {
      issues.push(validation.error!);
    }
  }

  // 랜드마크 검증
  const landmarkValidation = validateLandmark(element);
  if (!landmarkValidation.isValid) {
    suggestions.push(...landmarkValidation.suggestions);
  }

  return {
    element: element.tagName.toLowerCase(),
    issues,
    suggestions,
  };
}

