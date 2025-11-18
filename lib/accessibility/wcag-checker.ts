/**
 * WCAG 2.1 AA 준수 검증 도구
 * 
 * @file lib/accessibility/wcag-checker.ts
 * @description WCAG 2.1 AA 기준 준수 여부를 검증하는 유틸리티
 * 
 * 주요 기능:
 * 1. 색상 대비 검사
 * 2. 키보드 네비게이션 검증
 * 3. ARIA 속성 검증
 * 4. 접근성 리포트 생성
 */

export interface WCAGReport {
  level: "A" | "AA" | "AAA";
  passed: number;
  failed: number;
  warnings: number;
  checks: WCAGCheck[];
}

export interface WCAGCheck {
  id: string;
  name: string;
  level: "A" | "AA" | "AAA";
  status: "pass" | "fail" | "warning";
  message: string;
  element?: string;
}

/**
 * WCAG 2.1 AA 검증 실행
 */
export function runWCAGChecks(): WCAGReport {
  const checks: WCAGCheck[] = [];

  // 1. 색상 대비 검사
  checks.push(...checkColorContrast());

  // 2. 키보드 네비게이션 검사
  checks.push(...checkKeyboardNavigation());

  // 3. ARIA 속성 검사
  checks.push(...checkARIAAttributes());

  // 4. 이미지 alt 속성 검사
  checks.push(...checkImageAlt());

  // 5. 폼 라벨 검사
  checks.push(...checkFormLabels());

  // 6. 포커스 인디케이터 검사
  checks.push(...checkFocusIndicators());

  const passed = checks.filter((c) => c.status === "pass").length;
  const failed = checks.filter((c) => c.status === "fail").length;
  const warnings = checks.filter((c) => c.status === "warning").length;

  return {
    level: "AA",
    passed,
    failed,
    warnings,
    checks,
  };
}

/**
 * 색상 대비 검사
 */
function checkColorContrast(): WCAGCheck[] {
  const checks: WCAGCheck[] = [];

  // 모든 텍스트 요소 검사
  const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a, button, label");
  
  textElements.forEach((element, index) => {
    const styles = window.getComputedStyle(element);
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;

    // 실제 대비 계산은 복잡하므로 기본 검증만 수행
    if (color === backgroundColor) {
      checks.push({
        id: `contrast-${index}`,
        name: "색상 대비",
        level: "AA",
        status: "fail",
        message: "텍스트 색상과 배경색이 동일합니다",
        element: element.tagName.toLowerCase(),
      });
    } else {
      checks.push({
        id: `contrast-${index}`,
        name: "색상 대비",
        level: "AA",
        status: "warning",
        message: "대비 비율을 정확히 측정하려면 axe DevTools를 사용하세요",
        element: element.tagName.toLowerCase(),
      });
    }
  });

  return checks;
}

/**
 * 키보드 네비게이션 검사
 */
function checkKeyboardNavigation(): WCAGCheck[] {
  const checks: WCAGCheck[] = [];

  // 포커스 가능한 요소 확인
  const focusableElements = document.querySelectorAll(
    "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"
  );

  if (focusableElements.length === 0) {
    checks.push({
      id: "keyboard-1",
      name: "키보드 네비게이션",
      level: "A",
      status: "warning",
      message: "포커스 가능한 요소가 없습니다",
    });
  } else {
    checks.push({
      id: "keyboard-1",
      name: "키보드 네비게이션",
      level: "A",
      status: "pass",
      message: `${focusableElements.length}개의 포커스 가능한 요소가 있습니다`,
    });
  }

  // 포커스 인디케이터 확인
  const hasFocusStyles = document.querySelector("[style*='outline'], [class*='focus']");
  if (!hasFocusStyles) {
    checks.push({
      id: "keyboard-2",
      name: "포커스 인디케이터",
      level: "AA",
      status: "warning",
      message: "포커스 인디케이터 스타일을 확인하세요",
    });
  } else {
    checks.push({
      id: "keyboard-2",
      name: "포커스 인디케이터",
      level: "AA",
      status: "pass",
      message: "포커스 인디케이터가 설정되어 있습니다",
    });
  }

  return checks;
}

/**
 * ARIA 속성 검사
 */
function checkARIAAttributes(): WCAGCheck[] {
  const checks: WCAGCheck[] = [];

  // 아이콘만 있는 버튼 확인
  const iconButtons = document.querySelectorAll("button:not([aria-label]):not([aria-labelledby])");
  iconButtons.forEach((button, index) => {
    const hasText = button.textContent?.trim().length > 0;
    if (!hasText) {
      checks.push({
        id: `aria-button-${index}`,
        name: "ARIA 라벨",
        level: "A",
        status: "fail",
        message: "텍스트가 없는 버튼은 aria-label이 필요합니다",
        element: "button",
      });
    }
  });

  // 랜드마크 역할 확인
  const hasMain = document.querySelector("main, [role='main']");
  if (!hasMain) {
    checks.push({
      id: "aria-landmark-1",
      name: "랜드마크 역할",
      level: "A",
      status: "fail",
      message: "주 콘텐츠 영역에 <main> 태그나 role='main'이 필요합니다",
    });
  } else {
    checks.push({
      id: "aria-landmark-1",
      name: "랜드마크 역할",
      level: "A",
      status: "pass",
      message: "주 콘텐츠 영역이 올바르게 마크업되어 있습니다",
    });
  }

  return checks;
}

/**
 * 이미지 alt 속성 검사
 */
function checkImageAlt(): WCAGCheck[] {
  const checks: WCAGCheck[] = [];

  const images = document.querySelectorAll("img");
  images.forEach((img, index) => {
    const alt = img.getAttribute("alt");
    const isDecorative = img.getAttribute("role") === "presentation" || img.getAttribute("aria-hidden") === "true";

    if (!alt && !isDecorative) {
      checks.push({
        id: `image-alt-${index}`,
        name: "이미지 대체 텍스트",
        level: "A",
        status: "fail",
        message: "의미 있는 이미지는 alt 속성이 필요합니다",
        element: "img",
      });
    } else if (alt || isDecorative) {
      checks.push({
        id: `image-alt-${index}`,
        name: "이미지 대체 텍스트",
        level: "A",
        status: "pass",
        message: isDecorative ? "장식용 이미지로 올바르게 표시되었습니다" : "alt 속성이 설정되어 있습니다",
        element: "img",
      });
    }
  });

  return checks;
}

/**
 * 폼 라벨 검사
 */
function checkFormLabels(): WCAGCheck[] {
  const checks: WCAGCheck[] = [];

  const inputs = document.querySelectorAll("input:not([type='hidden']), textarea, select");
  inputs.forEach((input, index) => {
    const id = input.getAttribute("id");
    const ariaLabel = input.getAttribute("aria-label");
    const ariaLabelledBy = input.getAttribute("aria-labelledby");
    const label = id ? document.querySelector(`label[for="${id}"]`) : null;

    if (!label && !ariaLabel && !ariaLabelledBy) {
      checks.push({
        id: `form-label-${index}`,
        name: "폼 라벨",
        level: "A",
        status: "fail",
        message: "입력 필드에 라벨이나 aria-label이 필요합니다",
        element: input.tagName.toLowerCase(),
      });
    } else {
      checks.push({
        id: `form-label-${index}`,
        name: "폼 라벨",
        level: "A",
        status: "pass",
        message: "입력 필드가 올바르게 라벨링되어 있습니다",
        element: input.tagName.toLowerCase(),
      });
    }
  });

  return checks;
}

/**
 * 포커스 인디케이터 검사
 */
function checkFocusIndicators(): WCAGCheck[] {
  const checks: WCAGCheck[] = [];

  // CSS에서 포커스 스타일 확인
  const styleSheets = Array.from(document.styleSheets);
  let hasFocusStyles = false;

  try {
    for (const sheet of styleSheets) {
      const rules = Array.from(sheet.cssRules || []);
      for (const rule of rules) {
        if (rule instanceof CSSStyleRule) {
          if (rule.selectorText?.includes(":focus") || rule.selectorText?.includes(":focus-visible")) {
            hasFocusStyles = true;
            break;
          }
        }
      }
      if (hasFocusStyles) break;
    }
  } catch {
    // CORS 오류 등으로 인한 예외 처리
  }

  if (!hasFocusStyles) {
    checks.push({
      id: "focus-indicator-1",
      name: "포커스 인디케이터",
      level: "AA",
      status: "warning",
      message: "포커스 스타일을 확인하세요 (최소 2px outline 또는 box-shadow 필요)",
    });
  } else {
    checks.push({
      id: "focus-indicator-1",
      name: "포커스 인디케이터",
      level: "AA",
      status: "pass",
      message: "포커스 스타일이 설정되어 있습니다",
    });
  }

  return checks;
}

/**
 * 접근성 리포트를 콘솔에 출력
 */
export function logAccessibilityReport(): void {
  const report = runWCAGChecks();
  
  console.group("♿ WCAG 2.1 AA 접근성 검증 리포트");
  console.log(`레벨: ${report.level}`);
  console.log(`✅ 통과: ${report.passed}개`);
  console.log(`❌ 실패: ${report.failed}개`);
  console.log(`⚠️ 경고: ${report.warnings}개`);
  
  if (report.failed > 0) {
    console.group("❌ 실패한 검사");
    report.checks
      .filter((c) => c.status === "fail")
      .forEach((check) => {
        console.error(`[${check.level}] ${check.name}: ${check.message}`, check.element);
      });
    console.groupEnd();
  }
  
  if (report.warnings > 0) {
    console.group("⚠️ 경고");
    report.checks
      .filter((c) => c.status === "warning")
      .forEach((check) => {
        console.warn(`[${check.level}] ${check.name}: ${check.message}`, check.element);
      });
    console.groupEnd();
  }
  
  console.groupEnd();
}

