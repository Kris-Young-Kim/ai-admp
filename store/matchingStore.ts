import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 매칭 결과 상태 관리 스토어
 * 
 * @file store/matchingStore.ts
 * @description 매칭 추천 결과를 관리하는 Zustand 스토어
 * 
 * 주요 기능:
 * 1. 매칭 결과 저장
 * 2. 선택된 상품 관리
 * 3. 로딩 상태 관리
 * 4. 매칭 기록 관리
 * 
 * @dependencies
 * - zustand: 상태 관리 라이브러리
 * - zustand/middleware: persist 미들웨어 (localStorage 저장)
 */

export interface RecommendedProduct {
  product_id: string;
  name: string;
  description: string | null;
  category: string | null;
  price_range_min: number | null;
  price_range_max: number | null;
  image_url: string | null;
  average_rating: number | null;
  review_count: number | null;
  match_score: number;
}

export interface MatchingResult {
  recommendations: RecommendedProduct[];
  matching_id: string | null;
  processing_time_ms: number;
  created_at?: string;
}

interface MatchingState {
  // 현재 매칭 결과
  currentResult: MatchingResult | null;
  
  // 선택된 상품
  selectedProduct: RecommendedProduct | null;
  
  // 로딩 상태
  isLoading: boolean;
  error: string | null;
  
  // 매칭 기록 (최근 10개)
  history: MatchingResult[];
  
  // 액션
  setResult: (result: MatchingResult) => void;
  setSelectedProduct: (product: RecommendedProduct | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addToHistory: (result: MatchingResult) => void;
  clearResult: () => void;
  clearHistory: () => void;
}

const initialState = {
  currentResult: null,
  selectedProduct: null,
  isLoading: false,
  error: null,
  history: [],
};

export const useMatchingStore = create<MatchingState>()(
  persist(
    (set) => ({
      ...initialState,

      setResult: (result) =>
        set({ currentResult: result, error: null }),

      setSelectedProduct: (product) =>
        set({ selectedProduct: product }),

      setLoading: (isLoading) =>
        set({ isLoading, error: isLoading ? null : undefined }),

      setError: (error) =>
        set({ error }),

      addToHistory: (result) =>
        set((state) => ({
          history: [result, ...state.history].slice(0, 10), // 최근 10개만 유지
        })),

      clearResult: () =>
        set({
          currentResult: null,
          selectedProduct: null,
          error: null,
        }),

      clearHistory: () =>
        set({ history: [] }),
    }),
    {
      name: "matching-storage",
      partialize: (state) => ({
        history: state.history,
      }),
    }
  )
);

