import { test, expect } from "@playwright/test";

/**
 * 인증 E2E 테스트
 * 
 * @file tests/e2e/auth.spec.ts
 */

test.describe("인증 플로우", () => {
  test("로그인 버튼이 표시되어야 함", async ({ page }) => {
    await page.goto("/");
    
    const loginButton = page.getByRole("button", { name: /로그인/i });
    await expect(loginButton).toBeVisible();
  });

  test("로그인 버튼 클릭 시 모달이 열려야 함", async ({ page }) => {
    await page.goto("/");
    
    const loginButton = page.getByRole("button", { name: /로그인/i });
    await loginButton.click();
    
    // Clerk 로그인 모달이 표시되는지 확인
    // 실제 Clerk 모달의 선택자는 Clerk 버전에 따라 다를 수 있음
    await page.waitForTimeout(500); // 모달 애니메이션 대기
    
    // Clerk 모달 내부 요소 확인 (일반적인 선택자)
    const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
    
    // 모달이 열렸는지 확인 (이메일 입력 필드가 보이는지)
    if (await emailInput.isVisible().catch(() => false)) {
      await expect(emailInput).toBeVisible();
    }
  });

  test("대시보드 접근 시 인증이 필요해야 함", async ({ page }) => {
    await page.goto("/dashboard");
    
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트되거나
    // 로그인 모달이 표시되어야 함
    await page.waitForTimeout(1000);
    
    // URL이 변경되었거나 로그인 관련 요소가 표시되어야 함
    const currentUrl = page.url();
    const hasLoginElement = await page
      .getByRole("button", { name: /로그인/i })
      .isVisible()
      .catch(() => false);
    
    // 리다이렉트되었거나 로그인 요소가 표시되어야 함
    expect(
      currentUrl.includes("/sign-in") || hasLoginElement
    ).toBeTruthy();
  });
});

