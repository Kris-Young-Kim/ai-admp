import { test, expect } from "@playwright/test";

/**
 * 홈페이지 E2E 테스트
 * 
 * @file tests/e2e/home.spec.ts
 */

test.describe("홈페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("페이지가 정상적으로 로드되어야 함", async ({ page }) => {
    await expect(page).toHaveTitle(/SaaS 템플릿/);
  });

  test("Hero 섹션이 표시되어야 함", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /AI 기반 보조기기 매칭 서비스/ })
    ).toBeVisible();
  });

  test("CTA 버튼이 표시되어야 함", async ({ page }) => {
    const ctaButton = page.getByRole("link", { name: /무료로 시작하기/ });
    await expect(ctaButton).toBeVisible();
  });

  test("문제 공감 섹션이 표시되어야 함", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /이런 고민 있으신가요/ })
    ).toBeVisible();
  });

  test("작동 방식 섹션이 표시되어야 함", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /작동 방식/ })
    ).toBeVisible();
  });

  test("접근성 도구 모음이 표시되어야 함", async ({ page }) => {
    // 접근성 도구 모음 버튼 찾기 (aria-label 또는 role 사용)
    const accessibilityButton = page.getByRole("button", {
      name: /접근성|설정|Settings/i,
    });
    await expect(accessibilityButton).toBeVisible();
  });
});

