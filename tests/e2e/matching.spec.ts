import { test, expect } from "@playwright/test";

/**
 * 매칭 플로우 E2E 테스트
 * 
 * @file tests/e2e/matching.spec.ts
 */

test.describe("매칭 플로우", () => {
  test("데모 섹션으로 스크롤할 수 있어야 함", async ({ page }) => {
    await page.goto("/");
    
    // 데모 섹션으로 스크롤
    const demoSection = page.locator("#demo");
    await demoSection.scrollIntoViewIfNeeded();
    
    await expect(
      page.getByRole("heading", { name: /AI가 추천해드립니다/i })
    ).toBeVisible();
  });

  test("CTA 버튼 클릭 시 데모 섹션으로 이동해야 함", async ({ page }) => {
    await page.goto("/");
    
    const ctaButton = page.getByRole("link", { name: /무료로 시작하기/i });
    await ctaButton.click();
    
    // URL에 #demo가 포함되어야 함
    await expect(page).toHaveURL(/#demo/);
  });
});

test.describe("에러 시나리오", () => {
  test("네트워크 오류 시 적절한 처리가 되어야 함", async ({ page }) => {
    // 네트워크 요청 실패 시뮬레이션
    await page.route("**/api/matching/recommend", (route) => {
      route.abort("failed");
    });

    await page.goto("/");
    
    // 네트워크 오류가 발생해도 페이지가 크래시되지 않아야 함
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("폼 검증 에러가 표시되어야 함", async ({ page }) => {
    await page.goto("/");
    
    // 데모 섹션으로 이동
    const demoSection = page.locator("#demo");
    await demoSection.scrollIntoViewIfNeeded();
    
    // 폼이 구현되면 여기에 검증 테스트 추가
    // 현재는 데모 도구가 아직 구현되지 않았으므로 기본 구조만 확인
    await expect(demoSection).toBeVisible();
  });
});

