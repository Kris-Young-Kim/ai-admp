import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * UI 상태 관리 스토어
 * 
 * @file store/uiStore.ts
 * @description 전역 UI 상태를 관리하는 Zustand 스토어
 * 
 * 주요 기능:
 * 1. 현재 페이지 상태 관리
 * 2. 모달 열림/닫힘 상태
 * 3. 스크롤 위치 저장
 * 4. 테마 설정 (다크/라이트 모드)
 * 5. 로딩 상태 관리
 * 
 * @dependencies
 * - zustand: 상태 관리 라이브러리
 * - zustand/middleware: persist 미들웨어 (localStorage 저장)
 */

interface UIState {
  // 페이지 상태
  currentPage: string;
  scrollPosition: number;
  
  // 모달 상태
  isModalOpen: boolean;
  modalType: string | null;
  
  // 테마 상태
  theme: "light" | "dark" | "system";
  
  // 로딩 상태
  isLoading: boolean;
  loadingMessage: string | null;
  
  // 액션
  setCurrentPage: (page: string) => void;
  setScrollPosition: (position: number) => void;
  openModal: (type: string) => void;
  closeModal: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setLoading: (isLoading: boolean, message?: string) => void;
  reset: () => void;
}

const initialState = {
  currentPage: "/",
  scrollPosition: 0,
  isModalOpen: false,
  modalType: null,
  theme: "system" as const,
  isLoading: false,
  loadingMessage: null,
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentPage: (page) =>
        set({ currentPage: page }),

      setScrollPosition: (position) =>
        set({ scrollPosition: position }),

      openModal: (type) =>
        set({ isModalOpen: true, modalType: type }),

      closeModal: () =>
        set({ isModalOpen: false, modalType: null }),

      setTheme: (theme) =>
        set({ theme }),

      setLoading: (isLoading, message = null) =>
        set({ isLoading, loadingMessage: message }),

      reset: () =>
        set(initialState),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        theme: state.theme,
        currentPage: state.currentPage,
        scrollPosition: state.scrollPosition,
      }),
    }
  )
);

