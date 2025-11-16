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
   - ✅ 1개 테이블 마이그레이션 완료 (leads)
   - ✅ 인증 미들웨어 설정 완료 (Clerk)

3. **데이터베이스 스키마** ✅ 완료

   - ✅ 1개 테이블 마이그레이션 파일 생성 (단순화된 구조)
     - leads (정보 수집용)
   - ✅ RLS 비활성화 완료 (개발 단계)

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

### ✅ 최근 완료된 항목 (2025년 1월)

1. **랜딩 페이지 단순화** ✅ 완료
   - ✅ Hero 섹션 완성 (A/B 테스트 변형 포함)
   - ✅ 정보 수집 폼 (Lead Form) 구현 완료
   - ✅ Server Action으로 정보 저장 기능 구현
   - ✅ leads 테이블 마이그레이션 생성
   - ✅ 불필요한 페이지 및 컴포넌트 삭제

2. **정보 수집 기능** ✅ 완료
   - ✅ 이름, 이메일, 연락처 수집 폼
   - ✅ Zod 유효성 검사
   - ✅ Supabase 저장 기능
   - ✅ 성공/에러 메시지 표시

### ❌ 미완성 항목 (선택사항)

1. **접근성 기능 (선택사항)**
   - ❌ OCR 기능
   - ❌ 자막 및 수어 지원
   - ❌ React Aria 컴포넌트 통합

2. **수동 설정 필요**
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
   └── 20250115000000_create_leads.sql ✅
   ```

2. **테이블 생성 완료** ✅

   - ✅ `leads` (정보 수집용 - 이름, 이메일, 연락처)

3. **기본 설정** ✅
   - ✅ RLS 비활성화 (개발 단계)
   - ✅ 권한 부여 (anon, authenticated, service_role)

**실제 소요 시간**: 완료

**우선순위**: ✅ 완료

---

### Phase 2: 핵심 UI 컴포넌트 개발 ✅ 완료

**목표**: 랜딩페이지에 필요한 기본 컴포넌트 구현

**상태**: ✅ 완료 (단순화된 구조)

#### 완료된 작업

1. **공통 컴포넌트** ✅ 완료

   - [x] `Card` 컴포넌트 ✅ 완료
   - [x] `Slider` 컴포넌트 ✅ 완료
   - [x] `FormGroup` 컴포넌트 ✅ 완료
   - [x] `Input` 컴포넌트 ✅ 완료
   - [x] `Button` 컴포넌트 ✅ 완료
   - [x] `Form` 컴포넌트 ✅ 완료

2. **섹션 컴포넌트** ✅ 완료

   - [x] `HeroSection` - 메인 헤드라인 + CTA ✅ 완료
   - [x] `LeadForm` - 정보 수집 폼 (이름, 이메일, 연락처) ✅ 완료

3. **Server Action** ✅ 완료
   - [x] `submitLead` - 정보 저장 Server Action ✅ 완료

**실제 소요 시간**: 완료

**우선순위**: ✅ 완료

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

### Phase 5: 랜딩페이지 통합 ✅ 완료

**목표**: 단순화된 랜딩 페이지 구성

**상태**: ✅ 완료

#### 완료된 작업

1. **메인 페이지 구성** (`app/page.tsx`) ✅ 완료

   - [x] Hero 섹션 통합 ✅ 완료
   - [x] 정보 수집 폼 섹션 통합 ✅ 완료
   - [x] 반응형 레이아웃 ✅ 완료
   - [x] 단순화된 구조 (2개 섹션만) ✅ 완료

2. **정보 수집 기능** ✅ 완료

   - [x] `LeadForm` 컴포넌트 구현 ✅ 완료
   - [x] `submitLead` Server Action 구현 ✅ 완료
   - [x] `leads` 테이블 마이그레이션 생성 ✅ 완료
   - [x] 폼 유효성 검사 (Zod) ✅ 완료
   - [x] 성공/에러 메시지 표시 ✅ 완료

3. **데이터베이스** ✅ 완료

   - [x] `leads` 테이블 생성 마이그레이션 ✅ 완료
   - [x] RLS 비활성화 (개발 단계) ✅ 완료

4. **정리 작업** ✅ 완료
   - [x] 불필요한 페이지 삭제 (테스트 페이지, matching 페이지 등) ✅ 완료
   - [x] 불필요한 섹션 컴포넌트 삭제 ✅ 완료

**실제 소요 시간**: 완료

**우선순위**: ✅ 완료

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

## 📅 전체 일정 요약 (단순화된 구조)

| Phase     | 작업 내용           | 상태        | 우선순위  |
| --------- | ------------------- | ----------- | --------- |
| Phase 1   | 데이터베이스 스키마 | ✅ 완료     | ✅ 완료   |
| Phase 2   | UI 컴포넌트 개발    | ✅ 완료     | ✅ 완료   |
| Phase 3   | API 라우트 개발     | ✅ 완료     | ✅ 완료   |
| Phase 4   | 상태 관리 및 통합   | ✅ 완료     | ✅ 완료   |
| Phase 5   | 랜딩페이지 통합     | ✅ 완료     | ✅ 완료   |
| Phase 6   | 테스트 및 최적화    | 🟡 부분 완료| 🟡 중간   |
| Phase 6.5 | 웹 접근성 기능 개발 | ✅ 완료     | ✅ 완료   |
| Phase 7   | 배포 준비           | ⏳ 대기     | 🟢 낮음   |
| **총계**  |                     | **약 85%**  |           |

**참고**: 단순화된 구조로 인해 예상 소요 시간이 크게 단축되었습니다.

---

## 🚀 다음 우선순위 작업

### 즉시 시작 가능한 작업

1. **마이그레이션 적용** 🔴 최우선

   - Supabase에 `leads` 테이블 마이그레이션 적용
   - 마이그레이션 파일: `supabase/migrations/20250115000000_create_leads.sql`

2. **성능 최적화** (Phase 6) 🟡 중간

   - Lighthouse 점수 측정 및 개선
   - 이미지 최적화 (이미지 추가 시)
   - 번들 크기 최적화
   - Core Web Vitals 개선

3. **수동 설정 작업** 🟡 중간

   - GA4 Measurement ID 설정 (선택사항)
   - Sentry DSN 설정 및 SDK 활성화 (선택사항)
   - Clerk Webhook 엔드포인트 등록 (선택사항)

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

### 즉시 수행할 작업

1. **마이그레이션 적용** (필수)
   - Supabase 대시보드에서 `leads` 테이블 마이그레이션 적용
   - 또는 Supabase CLI 사용: `supabase db push`

2. **테스트** (권장)
   - 개발 서버 실행: `pnpm dev`
   - 정보 수집 폼 테스트
   - Supabase에서 데이터 저장 확인

### 향후 확장 가능한 작업 (선택사항)

필요 시 다음 기능들을 추가할 수 있습니다:
- 추가 섹션 컴포넌트 (문제 공감, 작동 방식 등)
- AI 매칭 기능
- 전문가 상담 기능
- 구독 결제 기능

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

   - 1개 테이블 마이그레이션 완료 (leads)
   - 단순화된 구조로 완료

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

### ✅ 추가 완료된 Phase (2025년 1월)

6. **Phase 2: UI 컴포넌트** ✅ 완료

   - ✅ 기본 컴포넌트 완료 (Card, Slider, FormGroup, Input, Button, Form)
   - ✅ Hero 섹션 컴포넌트 완료
   - ✅ LeadForm 컴포넌트 완료
   - ✅ 단순화된 구조로 완료

7. **Phase 5: 랜딩페이지 통합** ✅ 완료

   - ✅ Hero 섹션 통합 완료
   - ✅ 정보 수집 폼 섹션 통합 완료
   - ✅ 단순화된 구조 (2개 섹션만) 완료
   - ✅ Server Action 구현 완료
   - ✅ 데이터베이스 마이그레이션 생성 완료

### 🟡 부분 완료된 Phase

1. **Phase 6: 성능 최적화** 🟡
   - ✅ 테스트 완료
   - ❌ Lighthouse 최적화 필요 (선택사항)
   - ❌ 이미지 최적화 필요 (이미지 추가 시)

### ⏳ 대기 중인 Phase

1. **Phase 7: 배포 준비** ⏳
   - 마이그레이션 적용 (필수)
   - 환경 변수 설정 (일부 수동 작업 필요)
   - 문서화 업데이트
   - 최종 체크리스트

### 📈 전체 진행률

- **완료**: 약 85% (단순화된 구조 기준)
- **부분 완료**: 약 10%
- **미완료**: 약 5% (선택사항 기능)

**마지막 업데이트**: 2025년 1월  
**다음 리뷰**: 마이그레이션 적용 및 테스트 완료 시
