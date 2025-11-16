import { describe, it, expect, vi, beforeEach } from "vitest";
import { getMatchingRecommendations, APIError } from "@/lib/api/matching";

/**
 * 매칭 API 클라이언트 테스트
 * 
 * @file __tests__/lib/api/matching.test.ts
 */

// fetch 모킹
global.fetch = vi.fn();

describe("getMatchingRecommendations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("성공적인 매칭 요청이 정상적으로 처리되어야 함", async () => {
    const mockResponse = {
      success: true,
      recommendations: [
        {
          product_id: "prod1",
          name: "제품 1",
          match_score: 85.5,
        },
      ],
      matching_id: "match-123",
      processing_time_ms: 150,
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getMatchingRecommendations({
      primary_body_part: "arm",
      activities: ["work"],
      budget_min: 100000,
      budget_max: 500000,
    });

    expect(result.recommendations).toHaveLength(1);
    expect(result.matching_id).toBe("match-123");
    expect(result.processing_time_ms).toBe(150);
  });

  it("API 오류 시 APIError를 throw해야 함", async () => {
    const mockResponse = {
      error: "Invalid input",
      details: { field: "primary_body_part" },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => mockResponse,
    });

    await expect(
      getMatchingRecommendations({
        primary_body_part: "",
        activities: ["work"],
        budget_min: 100000,
        budget_max: 500000,
      })
    ).rejects.toThrow(APIError);
  });

  it("네트워크 오류 시 재시도해야 함", async () => {
    // 첫 번째 시도: 서버 오류 (500)
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server error" }),
      })
      // 두 번째 시도: 성공
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          recommendations: [],
          matching_id: null,
          processing_time_ms: 100,
        }),
      });

    const result = await getMatchingRecommendations({
      primary_body_part: "arm",
      activities: ["work"],
      budget_min: 100000,
      budget_max: 500000,
    });

    expect(result.recommendations).toEqual([]);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

