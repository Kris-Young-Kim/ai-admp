"use client";

import { useCallback } from "react";
import { useAuth as useClerkAuth, useUser } from "@clerk/nextjs";

/**
 * 인증 정보 커스텀 훅
 * 
 * @file hooks/use-auth.ts
 * @description Clerk 인증 정보를 편리하게 사용하는 커스텀 훅
 * 
 * 주요 기능:
 * 1. 인증 상태 확인
 * 2. 사용자 정보 접근
 * 3. 편의 함수 제공
 * 
 * @dependencies
 * - @clerk/nextjs: Clerk 인증 라이브러리
 */

export function useAuth() {
  const { isLoaded, userId, sessionId, getToken } = useClerkAuth();
  const { user, isSignedIn } = useUser();

  /**
   * 로그인 여부 확인
   */
  const isAuthenticated = isLoaded && isSignedIn;

  /**
   * 사용자 ID 가져오기
   */
  const getUserId = useCallback(() => {
    return userId || null;
  }, [userId]);

  /**
   * 사용자 이메일 가져오기
   */
  const getUserEmail = useCallback(() => {
    return user?.emailAddresses?.[0]?.emailAddress || null;
  }, [user]);

  /**
   * 사용자 이름 가져오기
   */
  const getUserName = useCallback(() => {
    return (
      user?.fullName ||
      user?.firstName ||
      user?.username ||
      getUserEmail() ||
      "Unknown"
    );
  }, [user, getUserEmail]);

  /**
   * 인증 토큰 가져오기
   */
  const getAuthToken = useCallback(async () => {
    if (!isAuthenticated) {
      return null;
    }
    return await getToken();
  }, [isAuthenticated, getToken]);

  return {
    // 상태
    isLoaded,
    isAuthenticated,
    userId,
    sessionId,
    user,
    isSignedIn,

    // 함수
    getUserId,
    getUserEmail,
    getUserName,
    getAuthToken,
    getToken,
  };
}

