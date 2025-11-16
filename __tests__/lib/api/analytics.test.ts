import { describe, it, expect, vi, beforeEach } from "vitest";
import { trackEvent, analytics } from "@/lib/api/analytics";

/**
 * 분석 API 클라이언트 테스트
 * 
 * @file __tests__/lib/api/analytics.test.ts
 */

// fetch 모킹
global.fetch = vi.fn();

describe("trackEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("성공적인 이벤트 추적이 true를 반환해야 함", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        saved_count: 1,
        event_ids: ["event-123"],
      }),
    });

    const result = await trackEvent({
      event_name: "test_event",
      event_data: { key: "value" },
    });

    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/analytics/event",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("실패한 이벤트 추적이 false를 반환해야 함 (에러를 throw하지 않음)", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Failed" }),
    });

    const result = await trackEvent({
      event_name: "test_event",
    });

    expect(result).toBe(false);
  });

  it("네트워크 오류 시 false를 반환해야 함 (에러를 throw하지 않음)", async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

    const result = await trackEvent({
      event_name: "test_event",
    });

    expect(result).toBe(false);
  });
});

describe("analytics 헬퍼 함수들", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, saved_count: 1, event_ids: [] }),
    });
  });

  it("pageView가 올바른 이벤트를 전송해야 함", async () => {
    await analytics.pageView("/test-page");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/analytics/event",
      expect.objectContaining({
        body: expect.stringContaining("page_view"),
      })
    );
  });

  it("ctaClick이 올바른 이벤트를 전송해야 함", async () => {
    await analytics.ctaClick("hero", "btn-1");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/analytics/event",
      expect.objectContaining({
        body: expect.stringContaining("cta_click"),
      })
    );
  });

  it("formSubmit이 올바른 이벤트를 전송해야 함", async () => {
    await analytics.formSubmit("matching-form", true);

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/analytics/event",
      expect.objectContaining({
        body: expect.stringContaining("form_submit"),
      })
    );
  });
});

