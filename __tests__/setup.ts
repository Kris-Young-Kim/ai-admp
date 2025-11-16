import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

/**
 * 테스트 설정 파일
 * 
 * @file __tests__/setup.ts
 * @description 모든 테스트 전에 실행되는 설정
 */

// 각 테스트 후 DOM 정리
afterEach(() => {
  cleanup();
});

