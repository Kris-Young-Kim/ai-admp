# 개발 계획서 (Development Plan)

> AI 보조기기 매칭 랜딩페이지 개발 로드맵
> 작성일: 2025년 1월
> 기준 문서: PRD v3.0, TODO.md, DIR.md

---

## 📊 현재 프로젝트 상태 분석 (2025년 1월 업데이트)

### ✅ 완료된 항목

1. **기본 인프라**

   - ✅ Next.js 15.5.6 설치 완료
   - ✅ React 19, TypeScript 5 설정
   - ✅ Tailwind CSS v4 설정
   - ✅ Clerk 인증 완전 연동 (Webhook 포함)
   - ✅ Supabase 클라이언트 설정 (service-role, clerk-client, server)
   - ✅ 기본 UI 컴포넌트 (shadcn/ui: Button, Input, Card, Form, Slider, Dialog 등)

2. **기본 구조**

   - ✅ 프로젝트 디렉토리 구조 생성
   - ✅ 7개 테이블 마이그레이션 완료
   - ✅ 인증 미들웨어 설정 완료
   - ✅ 사용자 동기화 로직 완료 (SyncUserProvider + Webhook)

3. **데이터베이스 스키마** ✅ 완료

   - ✅ 7개 테이블 마이그레이션 파일 생성 및 적용
     - sessions, products, matchings, feedback, events, subscriptions, experts
   - ✅ 모든 인덱스 생성 완료 (단일, 복합, GIN 인덱스)
   - ✅ Foreign Key 관계 설정 완료
   - ✅ RLS 비활성화 완료 (개발 단계)
   - ✅ Storage 버킷 생성 완료 (uploads)

4. **API 라우트** ✅ 완료

   - ✅ 매칭 추천 API (`/api/matching/recommend`)
   - ✅ 피드백 제출 API (`/api/feedback/submit`)
   - ✅ 분석 이벤트 API (`/api/analytics/event`)
   - ✅ 헬스체크 API (`/api/health`)

5. **상태 관리** ✅ 완료

   - ✅ Zustand 스토어 구축 (uiStore, formStore, matchingStore)
   - ✅ API 클라이언트 구현 (matching, feedback, analytics)
   - ✅ 커스텀 훅 개발 (use-matching, use-form, use-analytics, use-auth)

6. **페이지 개발** ✅ 완료

   - ✅ 인덱스 페이지 (`/`) - 기본 구조 및 접근성 기능 통합
   - ✅ 대시보드 페이지 (`/dashboard`) - 인증 보호 및 접근성 기능

7. **접근성 기능** ✅ 대부분 완료

   - ✅ AccessibilityToolbar 컴포넌트
   - ✅ TextToSpeech 컴포넌트
   - ✅ KeyboardScanMode 컴포넌트
   - ✅ SkipLink 컴포넌트
   - ✅ ARIA 속성 및 시맨틱 HTML
   - ✅ WCAG 검증 도구 및 가이드

8. **테스트** ✅ 완료

   - ✅ 단위 테스트 (Vitest + React Testing Library)
   - ✅ E2E 테스트 (Playwright)
   - ✅ 테스트 환경 설정 완료

9. **분석 및 추적** ✅ 완료
   - ✅ Google Analytics 4 통합 (코드 완료, 수동 설정 필요)
   - ✅ Sentry 설정 (코드 완료, 수동 설정 필요)

### ❌ 미완성 항목

1. **랜딩페이지 섹션 컴포넌트**

   - ❌ Hero 섹션 (기본 구조만 있음, 완전한 컴포넌트 필요)
   - ❌ 문제 공감 섹션 (기본 구조만 있음)
   - ❌ AI 데모 섹션 (기본 구조만 있음)
   - ❌ 신뢰 구축 섹션
   - ❌ 작동 방식 섹션 (기본 구조만 있음)
   - ❌ 후기 섹션
   - ❌ 요금제 섹션

2. **접근성 기능 (선택사항)**

   - ❌ OCR 기능
   - ❌ 자막 및 수어 지원
   - ❌ React Aria 컴포넌트 통합

3. **수동 설정 필요**
   - ❌ GA4 Measurement ID 설정
   - ❌ Sentry DSN 설정 및 SDK 활성화
   - ❌ Clerk Webhook 엔드포인트 등록

---

## 🎯 단계별 개발 계획

### Phase 1: 데이터베이스 스키마 구축 (1-2일) ✅ 완료

**목표**: PRD에 명시된 모든 테이블과 관계 생성

**상태**: ✅ 완료

#### 완료된 작업

1. **마이그레이션 파일 생성** ✅

   ```
   supabase/migrations/
   ├── 20251114194016_create_sessions.sql ✅
   ├── 20251114194116_create_products.sql ✅
   ├── 20251114194216_create_matchings.sql ✅
   ├── 20251114194316_create_feedback.sql ✅
   ├── 20251114194416_create_events.sql ✅
   ├── 20251114194516_create_subscriptions.sql ✅
   └── 20251114194616_create_experts.sql ✅
   ```

2. **테이블 생성 완료** ✅

   - ✅ `sessions` (기본 사용자 세션)
   - ✅ `products` (보조기기 제품 DB)
   - ✅ `matchings` (매칭 결과)
   - ✅ `feedback` (피드백)
   - ✅ `events` (분석 이벤트)
   - ✅ `subscriptions` (구독 정보)
   - ✅ `experts` (전문가 프로필)

3. **인덱스 및 관계 설정** ✅
   - ✅ Foreign Key 제약조건
   - ✅ 인덱스 최적화 (GIN 인덱스 포함)
   - ✅ RLS 비활성화 (개발 단계)
   - ✅ Storage 버킷 생성 (uploads)

**실제 소요 시간**: 완료

**우선순위**: ✅ 완료

---

### Phase 2: 핵심 UI 컴포넌트 개발 (3-5일)

**목표**: 랜딩페이지에 필요한 기본 컴포넌트 구현

#### 작업 내용

1. **공통 컴포넌트** (1일) ✅ 완료

   - [x] `Card` 컴포넌트 ✅ 완료
   - [x] `Slider` 컴포넌트 ✅ 완료
   - [x] `FormGroup` 컴포넌트 ✅ 완료
   - [ ] `Loading` 컴포넌트 (스피너) - 필요 시 추가
   - [ ] `ErrorBoundary` 컴포넌트 - 필요 시 추가

2. **섹션 컴포넌트** (2-3일)

   - [ ] `HeroSection` - 메인 헤드라인 + CTA
   - [ ] `PainPointsSection` - 문제 공감 (3개 카드)
   - [ ] `DemoSection` - AI 데모 도구 (3개 질문 폼)
   - [ ] `ResultsSection` - 추천 결과 표시 (3개 상품 카드)
   - [ ] `TrustSection` - 신뢰 구축 (수치, 전문가, 배지)
   - [ ] `HowItWorksSection` - 작동 방식 (4단계)
   - [ ] `TestimonialSection` - 후기 캐러셀
   - [ ] `PricingSection` - 요금제 (3개 카드)

3. **기능 컴포넌트** (1일)
   - [ ] `DemoTool` - 데모 폼 로직
   - [ ] `RecommendationCard` - 추천 상품 카드
   - [ ] `TestimonialCarousel` - 후기 캐러셀

**예상 소요 시간**: 3-5일

**우선순위**: 🔴 높음

---

### Phase 3: API 라우트 개발 (2-3일) ✅ 완료

**목표**: 백엔드 API 엔드포인트 구현

**상태**: ✅ 완료

#### 완료된 작업

1. **매칭 API** (`/api/matching/recommend`) ✅ 완료

   - [x] 입력 검증 (Zod 스키마)
   - [x] Supabase 쿼리 로직
   - [x] 매칭 알고리즘 (규칙 기반 점수 계산)
   - [x] 결과 저장 (matchings 테이블)
   - [x] 에러 처리

2. **피드백 API** (`/api/feedback/submit`) ✅ 완료

   - [x] 피드백 저장
   - [x] 유효성 검사 (Zod 스키마)
   - [x] 응답 포맷

3. **분석 API** (`/api/analytics/event`) ✅ 완료

   - [x] 이벤트 저장
   - [x] 배치 처리 지원
   - [x] Google Analytics 동기화 (코드 완료)

4. **헬스체크 API** (`/api/health`) ✅ 완료
   - [x] 데이터베이스 상태 확인
   - [x] API 상태 확인

**실제 소요 시간**: 완료

**우선순위**: ✅ 완료

---

### Phase 4: 상태 관리 및 통합 (2일) ✅ 완료

**목표**: 프론트엔드 상태 관리 및 API 연동

**상태**: ✅ 완료

#### 완료된 작업

1. **Zustand 스토어 설정** ✅ 완료

   - [x] `store/uiStore.ts` - UI 상태 (테마, 모달, 스크롤 위치)
   - [x] `store/formStore.ts` - 폼 상태 (검증, 에러 관리)
   - [x] `store/matchingStore.ts` - 매칭 결과 (결과 저장, 히스토리)

2. **API 클라이언트** ✅ 완료

   - [x] `lib/api/matching.ts` - 매칭 추천 API
   - [x] `lib/api/feedback.ts` - 피드백 제출 API
   - [x] `lib/api/analytics.ts` - 분석 이벤트 API
   - [x] 에러 처리 및 재시도 로직 (최대 3회 재시도)

3. **커스텀 훅** ✅ 완료
   - [x] `hooks/use-matching.ts` - 매칭 로직 (자동 분석 이벤트 추적)
   - [x] `hooks/use-form.ts` - 폼 상태 관리
   - [x] `hooks/use-analytics.ts` - 이벤트 추적 (페이지 뷰 자동 추적)
   - [x] `hooks/use-auth.ts` - 인증 정보 (Clerk 래퍼)

**실제 소요 시간**: 완료

**우선순위**: ✅ 완료

---

### Phase 5: 랜딩페이지 통합 (2일) ✅ 부분 완료

**목표**: 모든 섹션을 메인 페이지에 통합

**상태**: ✅ 기본 구조 완료, 섹션 컴포넌트 개발 필요

#### 완료된 작업

1. **메인 페이지 구성** (`app/page.tsx`) ✅ 기본 구조 완료

   - [x] 기본 섹션 구조 (Hero, Pain Points, Demo, How It Works, CTA)
   - [x] 레이아웃 구성 (반응형 그리드)
   - [x] 반응형 테스트 (모바일/태블릿/데스크톱)
   - [x] 접근성 기능 통합 (AccessibilityToolbar, TTS, KeyboardScanMode, SkipLink, ARIA Live Region)
   - [ ] 완전한 섹션 컴포넌트 개발 필요

2. **대시보드 페이지** (`app/dashboard/page.tsx`) ✅ 완료

   - [x] 인증 필수 (Clerk 미들웨어)
   - [x] 사용자 매칭 기록 (기본 구조)
   - [x] 프로필 정보
   - [x] 접근성 기능 통합

3. **네비게이션** ✅ 완료

   - [x] `Navbar` 컴포넌트 (Clerk SignInButton, UserButton)
   - [ ] `Footer` 컴포넌트 생성 (추후 필요)

4. **성능 최적화** (부분 완료)
   - [ ] 이미지 최적화 (이미지 추가 시 필요)
   - [x] 코드 분할 (Next.js 기본)
   - [ ] Lazy loading (이미지 추가 시 필요)

**실제 소요 시간**: 기본 구조 완료

**우선순위**: 🟡 섹션 컴포넌트 개발 필요

---

### Phase 6: 테스트 및 최적화 (2-3일) ✅ 완료

**목표**: 품질 보증 및 성능 최적화

**상태**: ✅ 테스트 환경 구축 완료, 성능 최적화는 진행 중

#### 완료된 작업

1. **단위 테스트** ✅ 완료

   - [x] 컴포넌트 테스트 (React Testing Library) - Button, Card, FormGroup
   - [x] API 클라이언트 테스트 - matching, analytics
   - [x] 유틸리티 함수 테스트 - utils, formStore
   - [x] 테스트 환경 설정 (Vitest, React Testing Library, @vitest/coverage-v8)

2. **E2E 테스트** ✅ 완료

   - [x] 사용자 여정 테스트 (Playwright) - 홈페이지, 인증 플로우
   - [x] 에러 시나리오 테스트
   - [x] Playwright 설정 완료 (다중 브라우저 지원)
   - [ ] 폼 제출 플로우 (구현 후 추가)

3. **성능 최적화** (진행 중)

   - [ ] Lighthouse 점수 90+ 달성 (측정 필요)
   - [ ] 이미지 최적화 (WebP) - 이미지 추가 시 필요
   - [ ] 번들 크기 최적화 (측정 필요)
   - [ ] Core Web Vitals 개선 (측정 필요)

4. **접근성 검증** ✅ 도구 완료
   - [x] WCAG 검증 도구 구현 (`lib/accessibility/wcag-checker.ts`)
   - [x] 접근성 검증 페이지 (`app/accessibility-check/page.tsx`)
   - [x] 접근성 가이드 문서 (`docs/ACCESSIBILITY_GUIDE.md`)
   - [x] 키보드 네비게이션 구현 완료
   - [ ] 실제 스크린 리더 테스트 (수동 작업 필요)

**실제 소요 시간**: 테스트 환경 구축 완료

**우선순위**: ✅ 테스트 완료, 성능 최적화는 진행 중

---

### Phase 6.5: 웹 접근성 기능 개발 (3-4일) ✅ 대부분 완료

**목표**: WCAG 2.1 AA 준수 및 장애인 지원 기능 구현

**상태**: ✅ 핵심 기능 완료, 선택사항 남음

#### 완료된 작업

1. **접근성 컴포넌트 개발** ✅ 완료

   - [x] `AccessibilityToolbar` 컴포넌트 ✅ 완료
     - [x] 플로팅 버튼 UI
     - [x] 화면 확대/축소 (50% ~ 200%)
     - [x] 고대비 모드 토글
     - [x] 폰트 크기 조절 (4단계)
     - [x] 줄 간격 조절
     - [x] 애니메이션 비활성화 옵션
     - [x] 설정 저장/불러오기 (localStorage)
     - [x] 키보드 단축키 지원 (Alt + A)
   - [x] `TextToSpeech` 컴포넌트 ✅ 완료
     - [x] Web Speech API 통합
     - [x] 페이지 전체 읽기
     - [x] 선택 텍스트 읽기
     - [x] 읽기 속도/음성 조절
     - [x] 재생/일시정지/중지 컨트롤
     - [x] 현재 읽는 위치 하이라이트
   - [x] `KeyboardScanMode` 컴포넌트 ✅ 완료
     - [x] 자동/수동 스캔 모드
     - [x] 스캔 순서 시각화
     - [x] 포커스 하이라이트 강화
   - [x] `SkipLink` 컴포넌트 ✅ 완료
     - [x] 주 콘텐츠로 건너뛰기 링크
   - [x] `AriaLiveRegion` 컴포넌트 ✅ 완료
     - [x] 동적 콘텐츠 업데이트 알림
     - [x] GlobalAriaLiveRegion Provider

2. **ARIA 속성 및 시맨틱 HTML** ✅ 완료

   - [x] 모든 인터랙티브 요소에 ARIA 속성 적용
   - [x] 랜드마크 역할 명확히 지정
   - [x] `aria-live` 영역 설정
   - [x] 시맨틱 HTML 구조 개선
   - [x] ARIA 헬퍼 함수 구현 (`lib/accessibility/aria-helper.ts`)
   - [x] 페이지에 ARIA 속성 추가 (aria-label 등)

3. **WCAG 검증 도구** ✅ 완료

   - [x] WCAG 검증 도구 구현 (`lib/accessibility/wcag-checker.ts`)
   - [x] 접근성 검증 페이지 (`app/accessibility-check/page.tsx`)
   - [x] 접근성 가이드 문서 (`docs/ACCESSIBILITY_GUIDE.md`)

4. **React Aria 통합** (선택사항)

   - [ ] `@react-aria/components` 패키지 설치
   - [ ] 기존 컴포넌트 점진적 마이그레이션
   - [ ] 키보드 네비게이션 자동 지원

5. **OCR 기능 (선택사항)**

   - [ ] Tesseract.js 또는 Google Vision API 통합
   - [ ] 이미지 텍스트 추출
   - [ ] TTS로 읽기 기능

6. **자막 및 수어 지원 (선택사항)**
   - [ ] 동영상 자막 표시
   - [ ] 실시간 자막 (Web Speech API)
   - [ ] 수어 동영상 링크 제공

**실제 소요 시간**: 핵심 기능 완료

**우선순위**: ✅ 핵심 기능 완료, 선택사항은 추후 구현 가능

---

### Phase 7: 배포 준비 (1일)

**목표**: 프로덕션 배포 준비

#### 작업 내용

1. **환경 변수 설정**

   - [ ] `.env.example` 업데이트
   - [ ] Vercel 환경 변수 설정

2. **문서화**

   - [ ] README.md 업데이트
   - [ ] API 문서 작성
   - [ ] 배포 가이드 작성

3. **최종 체크리스트**
   - [ ] 모든 기능 테스트 완료
   - [ ] 보안 감사
   - [ ] 성능 점수 확인
   - [ ] 에러 추적 설정 (Sentry)

**예상 소요 시간**: 1일

**우선순위**: 🟢 낮음 (배포 직전)

---

## 📅 전체 일정 요약

| Phase     | 작업 내용           | 예상 소요   | 우선순위  |
| --------- | ------------------- | ----------- | --------- |
| Phase 1   | 데이터베이스 스키마 | 1-2일       | 🔴 최우선 |
| Phase 2   | UI 컴포넌트 개발    | 3-5일       | 🔴 높음   |
| Phase 3   | API 라우트 개발     | 2-3일       | 🔴 높음   |
| Phase 4   | 상태 관리 및 통합   | 2일         | 🟡 중간   |
| Phase 5   | 랜딩페이지 통합     | 2일         | 🔴 높음   |
| Phase 6   | 테스트 및 최적화    | 2-3일       | 🟡 중간   |
| Phase 6.5 | 웹 접근성 기능 개발 | 3-4일       | 🔴 높음   |
| Phase 7   | 배포 준비           | 1일         | 🟢 낮음   |
| **총계**  |                     | **16-22일** |           |

---

## 🚀 다음 우선순위 작업

### 즉시 시작 가능한 작업

1. **섹션 컴포넌트 개발** (Phase 2, Phase 5) 🔴 최우선

   - Hero 섹션 컴포넌트 (완전한 구현)
   - 문제 공감 섹션 컴포넌트
   - AI 데모 섹션 컴포넌트
   - 신뢰 구축 섹션 컴포넌트
   - 작동 방식 섹션 컴포넌트
   - 후기 섹션 컴포넌트
   - 요금제 섹션 컴포넌트

2. **성능 최적화** (Phase 6) 🟡 중간

   - Lighthouse 점수 측정 및 개선
   - 이미지 최적화 (이미지 추가 시)
   - 번들 크기 최적화
   - Core Web Vitals 개선

3. **수동 설정 작업** 🟡 중간

   - GA4 Measurement ID 설정
   - Sentry DSN 설정 및 SDK 활성화
   - Clerk Webhook 엔드포인트 등록

4. **선택사항 기능** (Phase 6.5) 🟢 낮음
   - OCR 기능 구현
   - 자막 및 수어 지원
   - React Aria 통합

---

## 📝 개발 시 주의사항

### 필수 준수 사항

1. **RLS 비활성화**

   - 개발 단계에서는 모든 테이블의 RLS를 비활성화
   - 프로덕션 배포 전에만 활성화

2. **타입 안정성**

   - 모든 API 요청/응답에 TypeScript 타입 정의
   - Zod 스키마로 런타임 검증

3. **에러 처리**

   - 모든 API 호출에 try-catch
   - 사용자 친화적인 에러 메시지

4. **로그 남기기**

   - 핵심 기능에 `console.log` 추가
   - 디버깅 후 제거 또는 최소화

5. **접근성 (WCAG 2.1 AA 준수)**
   - 모든 버튼에 `aria-label` 또는 적절한 라벨
   - 키보드 네비게이션 완전 지원 (Tab, Enter, Space, Esc, 화살표)
   - 색상 대비 WCAG AA 준수 (4.5:1 이상)
   - 스크린 리더 최적화 (ARIA 속성, 시맨틱 HTML)
   - 접근성 도구 모음 통합 (화면 확대, TTS, 스캔 모드 등)
   - 모든 이미지에 `alt` 속성
   - 동영상 자막 제공
   - 포커스 인디케이터 명확히 표시 (최소 2px)

---

## 🎯 다음 단계

### 추천 시작 순서

1. **오늘**: Phase 1 (데이터베이스 스키마) 시작
2. **내일**: Phase 2 (Hero 섹션) 시작
3. **3일차**: Phase 3 (매칭 API) 시작

### 진행 방법

각 Phase를 시작하기 전에:

1. 해당 Phase의 작업 내용 확인
2. 필요한 파일 구조 확인 (DIR.md 참고)
3. PRD의 해당 섹션 요구사항 확인
4. 구현 시작

---

## 📚 참고 문서

- **PRD**: `docs/AI_Assistive_Device_Matching_Landing_Page_PRD.md`
- **TODO**: `docs/TODO.md`
- **디렉토리 구조**: `docs/DIR.md`
- **아키텍처**: `docs/Mermaid.md`
- **README**: `docs/README.md`

---

---

## 📊 최종 진행 상황 요약 (2025년 1월)

### ✅ 완료된 Phase

1. **Phase 1: 데이터베이스 스키마** ✅

   - 7개 테이블 마이그레이션 완료
   - 모든 인덱스 및 관계 설정 완료
   - Storage 버킷 생성 완료

2. **Phase 3: API 라우트 개발** ✅

   - 매칭, 피드백, 분석, 헬스체크 API 완료
   - Zod 검증, 에러 처리 완료

3. **Phase 4: 상태 관리 및 통합** ✅

   - Zustand 스토어 3개 완료
   - API 클라이언트 3개 완료
   - 커스텀 훅 4개 완료

4. **Phase 6: 테스트** ✅

   - 단위 테스트 환경 구축 완료
   - E2E 테스트 환경 구축 완료
   - 테스트 파일 작성 완료

5. **Phase 6.5: 웹 접근성 (핵심)** ✅
   - 접근성 컴포넌트 5개 완료
   - ARIA 속성 및 시맨틱 HTML 완료
   - WCAG 검증 도구 완료

### 🟡 부분 완료된 Phase

1. **Phase 2: UI 컴포넌트** 🟡

   - ✅ 기본 컴포넌트 완료 (Card, Slider, FormGroup)
   - ❌ 섹션 컴포넌트 필요 (Hero, PainPoints, Demo 등)

2. **Phase 5: 랜딩페이지 통합** 🟡

   - ✅ 기본 구조 완료
   - ✅ 접근성 기능 통합 완료
   - ❌ 완전한 섹션 컴포넌트 필요

3. **Phase 6: 성능 최적화** 🟡
   - ✅ 테스트 완료
   - ❌ Lighthouse 최적화 필요
   - ❌ 이미지 최적화 필요

### ⏳ 대기 중인 Phase

1. **Phase 7: 배포 준비** ⏳
   - 환경 변수 설정 (일부 수동 작업 필요)
   - 문서화 업데이트
   - 최종 체크리스트

### 📈 전체 진행률

- **완료**: 약 60%
- **부분 완료**: 약 25%
- **미완료**: 약 15%

**마지막 업데이트**: 2025년 1월  
**다음 리뷰**: 섹션 컴포넌트 개발 완료 시
