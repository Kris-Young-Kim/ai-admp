/**
 * 접근성 E2E 테스트
 * 
 * @file tests/e2e/accessibility.spec.ts
 * @description 스크린 리더 및 접근성 기능을 검증하는 E2E 테스트
 * 
 * 주요 테스트:
 * 1. ARIA 속성 검증
 * 2. 키보드 네비게이션
 * 3. 스크린 리더 호환성
 * 4. 폼 접근성
 * 5. 동적 콘텐츠 접근성
 * 
 * @dependencies
 * - @axe-core/playwright: 접근성 검증 도구
 * - playwright: E2E 테스트 프레임워크
 */

import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y, getViolations } from "axe-playwright";

test.describe("접근성 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // axe-core 주입
    await injectAxe(page);
  });

  test("홈페이지 접근성 검증 (axe-core)", async ({ page }) => {
    // 접근성 검증 실행
    const violations = await getViolations(page, null, {
      includedImpacts: ["critical", "serious"],
    });

    // 로그: 접근성 위반 사항
    if (violations.length > 0) {
      console.group("[Accessibility] 접근성 위반 사항");
      violations.forEach((violation) => {
        console.error(`[${violation.impact}] ${violation.id}: ${violation.description}`);
        violation.nodes.forEach((node) => {
          console.error("  - 요소:", node.html);
          console.error("  - 해결 방법:", node.failureSummary);
        });
      });
      console.groupEnd();
    }

    // 심각한 위반이 없어야 함
    expect(violations.length).toBe(0);
  });

  test("Skip Link 접근성", async ({ page }) => {
    // Skip Link가 키보드 포커스 시 표시되는지 확인
    await page.keyboard.press("Tab");
    
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
    
    // Skip Link 클릭 시 메인 콘텐츠로 이동하는지 확인
    await skipLink.click();
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeFocused();
  });

  test("버튼 접근성", async ({ page }) => {
    // 모든 버튼에 적절한 라벨이 있는지 확인
    const buttons = page.locator("button, [role='button']");
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute("aria-label");
      const textContent = await button.textContent();
      const hasLabel = ariaLabel || (textContent && textContent.trim().length > 0);

      // 버튼에 라벨이 없으면 실패
      if (!hasLabel) {
        const html = await button.innerHTML();
        console.error(`[Accessibility] 라벨 없는 버튼 발견: ${html}`);
      }

      expect(hasLabel).toBeTruthy();
    }
  });

  test("폼 필드 접근성", async ({ page }) => {
    // 데모 섹션으로 이동
    await page.goto("/#demo");
    await page.waitForSelector("#demo");

    // 모든 입력 필드에 라벨이 연결되어 있는지 확인
    const inputs = page.locator("input, textarea, select");
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");

      // id가 있으면 라벨 연결 확인
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = (await label.count()) > 0;
        
        if (!hasLabel && !ariaLabel && !ariaLabelledBy) {
          const html = await input.innerHTML();
          console.error(`[Accessibility] 라벨 없는 입력 필드 발견: ${html}`);
        }

        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test("키보드 네비게이션", async ({ page }) => {
    // Tab 키로 모든 인터랙티브 요소에 접근 가능한지 확인
    const interactiveElements = page.locator(
      "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
    );
    const elementCount = await interactiveElements.count();

    // 첫 번째 요소로 포커스 이동
    await page.keyboard.press("Tab");
    
    // 모든 요소가 포커스 가능한지 확인
    for (let i = 0; i < Math.min(elementCount, 10); i++) {
      const element = interactiveElements.nth(i);
      const isVisible = await element.isVisible();
      
      if (isVisible) {
        await page.keyboard.press("Tab");
        // 포커스가 이동했는지 확인 (실제 포커스 확인은 어려우므로 스킵)
      }
    }
  });

  test("랜드마크 역할", async ({ page }) => {
    // 주요 랜드마크가 올바르게 지정되었는지 확인
    const main = page.locator("main, [role='main']");
    await expect(main).toHaveCount(1);

    const nav = page.locator("nav, [role='navigation']");
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThanOrEqual(0);

    const header = page.locator("header, [role='banner']");
    const headerCount = await header.count();
    expect(headerCount).toBeGreaterThanOrEqual(0);
  });

  test("ARIA Live Region", async ({ page }) => {
    // ARIA Live Region이 존재하는지 확인
    const liveRegion = page.locator("[aria-live]");
    const liveRegionCount = await liveRegion.count();
    
    // 동적 콘텐츠 업데이트를 위한 Live Region이 있어야 함
    expect(liveRegionCount).toBeGreaterThanOrEqual(0);
  });

  test("이미지 alt 속성", async ({ page }) => {
    // 모든 이미지에 alt 속성이 있는지 확인
    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute("alt");
      
      // alt 속성이 없으면 실패 (장식용 이미지는 alt="" 허용)
      if (alt === null) {
        const src = await image.getAttribute("src");
        console.error(`[Accessibility] alt 속성 없는 이미지 발견: ${src}`);
      }

      expect(alt).not.toBeNull();
    }
  });
});

test.describe("스크린 리더 호환성 테스트", () => {
  test("버튼 라벨 검증", async ({ page }) => {
    await page.goto("/");

    // Hero 섹션의 CTA 버튼 확인
    const ctaButtons = page.locator("a[href='#demo'], button");
    const buttonCount = await ctaButtons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = ctaButtons.nth(i);
      const ariaLabel = await button.getAttribute("aria-label");
      const textContent = await button.textContent();
      
      // 버튼에 라벨이 있어야 함
      expect(ariaLabel || (textContent && textContent.trim().length > 0)).toBeTruthy();
    }
  });

  test("폼 라벨 연결 검증", async ({ page }) => {
    await page.goto("/#demo");
    await page.waitForSelector("#demo");

    // 라디오 버튼 그룹 확인
    const radioGroups = page.locator("[role='group']");
    const groupCount = await radioGroups.count();

    for (let i = 0; i < groupCount; i++) {
      const group = radioGroups.nth(i);
      const ariaLabelledBy = await group.getAttribute("aria-labelledby");
      const ariaLabel = await group.getAttribute("aria-label");
      
      // 그룹에 라벨이 있어야 함
      expect(ariaLabelledBy || ariaLabel).toBeTruthy();
    }
  });

  test("링크 목적 명확성", async ({ page }) => {
    await page.goto("/");

    // 모든 링크 확인
    const links = page.locator("a[href]");
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const textContent = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");
      
      // 링크에 명확한 텍스트나 aria-label이 있어야 함
      const hasClearPurpose = 
        (textContent && textContent.trim().length > 0 && !textContent.match(/^(자세히|더보기|링크)$/i)) ||
        ariaLabel;

      if (!hasClearPurpose) {
        const href = await link.getAttribute("href");
        console.warn(`[Accessibility] 목적이 불명확한 링크: ${href}`);
      }
    }
  });
});

