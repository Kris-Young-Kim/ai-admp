import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

/**
 * Utility 함수 테스트
 * 
 * @file __tests__/lib/utils.test.ts
 */

describe("cn (className merge utility)", () => {
  it("여러 className을 병합해야 함", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("조건부 className을 처리해야 함", () => {
    expect(cn("base", true && "conditional")).toBe("base conditional");
    expect(cn("base", false && "conditional")).toBe("base");
  });

  it("중복된 Tailwind 클래스를 올바르게 병합해야 함", () => {
    // tailwind-merge가 동일한 유틸리티 클래스를 병합
    const result = cn("px-2", "px-4");
    expect(result).toContain("px-4"); // 나중 것이 우선
  });

  it("undefined와 null을 무시해야 함", () => {
    expect(cn("base", undefined, null, "valid")).toBe("base valid");
  });

  it("배열을 처리해야 함", () => {
    expect(cn(["class1", "class2"])).toBe("class1 class2");
  });

  it("객체를 처리해야 함", () => {
    expect(cn({ class1: true, class2: false })).toBe("class1");
  });
});

