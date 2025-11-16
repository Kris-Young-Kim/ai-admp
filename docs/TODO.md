# TODO.md - 개발 작업 로드맵

> Cursor IDE에서 이 파일을 열어 각 작업 항목을 진행하세요.
> 완료된 항목은 `- [ ]`를 `- [x]`로 변경하세요.

---

## 📋 프로젝트 초기화 (1주차)

### 환경 설정

- [x] **GitHub 리포지토리 생성** ✅ 완료

  - [x] Git 리포지토리 초기화 완료
  - [x] main 브랜치 설정 완료
  - [x] GitHub 원격 저장소 연결 완료: `https://github.com/Kris-Young-Kim/ai-admp.git`
  - [x] 모든 파일 커밋 및 푸시 완료
  - [x] 작업 트리 깨끗한 상태 (working tree clean)
  - [x] origin/main과 동기화 완료

  ```bash
  # 현재 상태 확인
  git status  # ✅ nothing to commit, working tree clean
  git remote -v  # ✅ origin 연결됨: https://github.com/Kris-Young-Kim/ai-admp.git
  git branch -a  # ✅ main 브랜치, origin/main 동기화됨
  ```

- [x] **Supabase 프로젝트 생성** ✅ 완료

  - [x] Supabase 클라이언트 설정 완료 (lib/supabase/)
  - [x] 환경 변수 파일 생성 (.env.local 존재 확인됨)
  - [x] 마이그레이션 파일 준비 완료 (7개 테이블)
  - [x] Storage 버킷 마이그레이션 파일 준비 완료
  - [x] Supabase 클라우드 프로젝트 생성 완료
  - [x] PostgreSQL 데이터베이스 생성 완료 (프로젝트 생성 시 자동)
  - [x] 프로젝트 URL 및 API 키 복사 완료 (.env.local에 설정 완료)
  - [x] 마이그레이션 파일 적용 완료 (Supabase 대시보드 또는 CLI)
  - [x] RLS 정책 기본 설정 완료 (개발 단계: 비활성화 완료, 프로덕션: 필요)
  - [x] Storage 버킷 생성 및 설정 완료 (uploads 버킷)
  - [x] Webhook 구성 ✅ 완료
    - [x] Clerk Webhook 엔드포인트 생성 (`/api/webhooks/clerk`)
    - [x] user.created, user.updated, user.deleted 이벤트 처리
    - [x] Supabase sessions 테이블 자동 동기화
    - [x] middleware.ts에서 webhook 라우트 제외 설정
    - [x] svix 패키지 설치 완료
    - [x] Webhook 설정 가이드 문서 작성 (`docs/WEBHOOK_SETUP.md`)
    - [ ] Clerk 대시보드에서 Webhook 엔드포인트 등록 (수동 작업 필요)
    - [ ] CLERK_WEBHOOK_SECRET 환경 변수 설정 (수동 작업 필요)

- [x] **Clerk 애플리케이션 설정** ✅ 완료

  > 📖 상세 계획: [CLERK_SETUP_PLAN.md](./CLERK_SETUP_PLAN.md) 참고

  - [x] **Phase 1: 개발용 Clerk 프로젝트 생성** ✅ 완료

    > 📖 상세 가이드: [CLERK_PHASE1_GUIDE.md](./CLERK_PHASE1_GUIDE.md) 참고

    - [x] Clerk 대시보드에서 개발용 프로젝트 생성 ✅ (Frontend API URL 확인됨: `https://enough-airedale-80.clerk.accounts.dev`)
    - [x] API Keys 확인 및 복사 (Publishable Key, Secret Key) ✅
      - [x] Clerk Dashboard → API Keys 메뉴 접속
      - [x] Publishable Key (`pk_test_...`) 복사
      - [x] Secret Key (`sk_test_...`) 복사
    - [x] Frontend API URL 확인 ✅ (`https://enough-airedale-80.clerk.accounts.dev`)
    - [x] `.env.local`에 개발용 Clerk 키 설정 ✅
      - [x] 프로젝트 루트에 `.env.local` 파일 생성
      - [x] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 설정
      - [x] `CLERK_SECRET_KEY` 설정
      - [x] Clerk URLs 설정 (`/sign-in`, `/` 등)
    - [x] 기본 인증 설정 확인 (Email 인증 방식) ✅
      - [x] Clerk Dashboard → User & Authentication → Email 인증 방식 확인
      - [x] 개발 서버 실행 및 로그인 테스트 (`http://localhost:3000/sign-in`)

  - [⏭️] **Phase 2: Webhook 구성** (개발 생략)

    > 📖 상세 가이드: [CLERK_PHASE2_GUIDE.md](./CLERK_PHASE2_GUIDE.md) 참고
    >
    > ⚠️ 개발 생략: 나중에 필요 시 진행

  - [⏭️] **Phase 3: OAuth 제공자 연결** (개발 생략, 선택사항)

    > ⚠️ 개발 생략: 나중에 필요 시 진행
    >
    > 포함 항목:
    >
    > - Google OAuth 설정
    > - Kakao OAuth 설정
    > - Apple OAuth 설정

  - [x] **Phase 4: 프로덕션용 Clerk 프로젝트 생성** ✅ 완료 (배포 직전)
    - [x] 프로덕션용 Clerk 프로젝트 생성
    - [x] 프로덕션 API 키 복사 (`pk_live_...`, `sk_live_...`)
    - [x] Vercel 환경 변수에 프로덕션 키 설정
    - [x] 프로덕션 Webhook 엔드포인트 등록 (`https://your-app.vercel.app/api/webhooks/clerk`)
    - [x] 프로덕션 OAuth 제공자 연결 (Redirect URI 프로덕션 URL로 설정)

- [x] **Vercel 프로젝트 설정** ✅ 완료

  - [x] GitHub 리포지토리 연결
  - [x] 환경 변수 설정:
    ```
    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    CLERK_SECRET_KEY
    CLERK_WEBHOOK_SECRET
    NEXT_PUBLIC_SENTRY_DSN
    ```
  - [x] 자동 배포 설정 (develop, main)

- [x] **개발 환경 설정** ✅ 점검 완료
  - [x] Node.js 18+ 설치 확인 ✅ (v22.19.0)
  - [x] npm/yarn/pnpm 선택 및 설치 ✅ (pnpm 10.21.0, npm 10.9.3)
  - [x] Cursor IDE 설정 ✅ (.cursor 디렉토리 및 rules 설정 완료)
  - [ ] Husky & Lint-staged 설정 (선택사항)
    ```bash
    npm install husky lint-staged --save-dev
    npx husky install
    ```
    > ⚠️ 현재 미설정 상태. 필요 시 나중에 설정 가능

---

## 🏗️ 프로젝트 구조 구축 (1주차)

### 디렉토리 구조 생성

- [x] **프로젝트 루트 구조**

  ```
  project-root/
  ├── app/
  │   ├── api/
  │   ├── layout.tsx
  │   └── page.tsx
  ├── components/
  ├── lib/
  ├── hooks/
  ├── public/
  ├── supabase/
  │   └── migrations/
  └── package.json
  ```

- [x] **필수 파일 생성**

  - [x] `.env.local` (로컬 환경 변수)
  - [x] `.env.example` (예시 파일) ✅ 완료
  - [x] `.gitignore` (Git 무시 파일)
  - [x] `tsconfig.json` (TypeScript 설정)
  - [x] `next.config.ts` (Next.js 설정)

- [x] **NPM 패키지 설치**
  - [x] Next.js 15.5.6, React 19, TypeScript 5
  - [x] @supabase/supabase-js, @clerk/nextjs
  - [x] tailwindcss v4, postcss
  - [x] react-hook-form, zod
  - [x] lucide-react, react-icons
  - [x] eslint, @types/react, @types/node

---

## 🎨 UI 컴포넌트 개발 (2-3주차)

### 기본 컴포넌트 (5/5 완료하면 5%)

- [x] **Button 컴포넌트** (shadcn/ui) ✅ 완료

  - [x] Primary, Secondary, Icon 타입 구현
  - [x] Size 속성 (small, medium, large, full)
  - [x] 상태 관리 (disabled, loading, active)
  - [x] 접근성 (aria-label, focus-visible) - 추가 검증 필요
  - [x] 테스트 작성

- [x] **Input 컴포넌트** (shadcn/ui) ✅ 완료

  - [x] Text, Email, Tel, Number 타입
  - [x] 라벨, 도움말, 에러 메시지
  - [x] 포커스 상태 시각화
  - [x] 접근성 (labelledBy, describedBy) - 추가 검증 필요
  - [x] 테스트 작성

- [x] **FormGroup 컴포넌트** ✅ 완료

  - [x] Radio button 그룹
  - [x] Checkbox 그룹
  - [x] 선택 유효성 검사
  - [x] 접근성 (role="group")
  - [x] 테스트 작성

- [x] **Slider 컴포넌트** ✅ 완료

  - [x] 단일 슬라이더 (budget)
  - [x] 이중 슬라이더 (범위)
  - [x] 실시간 값 표시
  - [x] 키보드 상호작용
  - [x] 접근성 (role="slider")
  - [x] 테스트 작성

- [x] **Card 컴포넌트** ✅ 완료

  - [x] 기본 카드 (shadow, border, radius)
  - [x] 호버 애니메이션
  - [x] 반응형 레이아웃
  - [x] 슬롯 구조 (header, body, footer)
  - [x] 테스트 작성

- [x] **접근성 컴포넌트** ✅ 완료

  - [x] **AccessibilityToolbar 컴포넌트** ✅ 완료

    - [x] 플로팅 버튼 UI
    - [x] 화면 확대/축소 컨트롤
    - [x] 고대비 모드 토글
    - [x] 폰트 크기 조절
    - [x] 줄 간격 조절
    - [x] 애니메이션 비활성화 옵션
    - [x] 설정 저장/불러오기 (localStorage)
    - [x] 키보드 단축키 지원
    - [x] 접근성 (ARIA 속성, 키보드 네비게이션)

  - [x] **TextToSpeech 컴포넌트** ✅ 완료

    - [x] Web Speech API 통합
    - [x] 페이지 전체 읽기
    - [x] 선택 텍스트 읽기
    - [x] 읽기 속도 조절
    - [x] 음성 선택 (한국어/영어)
    - [x] 재생/일시정지/중지 컨트롤
    - [x] 현재 읽는 위치 하이라이트
    - [x] 접근성 (스크린 리더 호환)

  - [x] **KeyboardScanMode 컴포넌트** ✅ 완료

    - [x] 스캔 모드 활성화/비활성화
    - [x] 자동 스캔 (시간 간격 설정)
    - [x] 수동 스캔 (스페이스바/엔터)
    - [x] 스캔 순서 시각화
    - [x] 포커스 하이라이트 강화
    - [x] 접근성 (키보드 네비게이션)

  - [x] **SkipLink 컴포넌트** ✅ 완료
    - [x] 주 콘텐츠로 건너뛰기 링크
    - [x] 키보드 포커스 시에만 표시
    - [x] 접근성 (스크린 리더 최적화)

### 섹션 컴포넌트 (7/7 완료하면 15%)

- [ ] **Hero 섹션**

  - [ ] 헤드라인 + 서브카피
  - [ ] 백그라운드 이미지/애니메이션
  - [ ] CTA 버튼 그룹
  - [ ] 신뢰 배지
  - [ ] 반응형 레이아웃
  - [ ] 애니메이션 (fade-in, slide-up)
  - [ ] A/B 테스트 변수 관리
  - Cursor 프롬프트: `HeroSection.tsx - A/B 테스트 지원, 3개 헤드라인 변형 포함`

- [ ] **문제 공감 섹션**

  - [ ] 3개 문제 카드
  - [ ] 각 카드 아이콘 + 제목 + 설명
  - [ ] 호버 애니메이션
  - [ ] Bento Grid 레이아웃
  - [ ] 스크롤 트리거 애니메이션

- [ ] **AI 데모 섹션**

  - [ ] 3개 질문 폼 (라디오, 체크박스, 슬라이더)
  - [ ] 폼 검증 로직
  - [ ] 로딩 상태 (스피너)
  - [ ] 실시간 추천 결과 표시
  - [ ] 결과 카드 (상품 3개)
  - [ ] 에러 처리

- [ ] **신뢰 구축 섹션**

  - [ ] 수치 카드 (Counter 애니메이션)
  - [ ] 전문가 프로필 카드
  - [ ] 보안 배지 (SSL, GDPR)
  - [ ] 파트너 로고 월

- [ ] **작동 방식 섹션**

  - [ ] 4단계 프로세스 다이어그램
  - [ ] 각 단계 설명 텍스트
  - [ ] 애니메이션 (스테거드 진입)

- [ ] **후기 섹션**

  - [ ] 후기 카드 컴포넌트
  - [ ] 모바일 캐러셀
  - [ ] 페이징 인디케이터
  - [ ] 사용자 프로필 사진

- [ ] **요금제 섹션**
  - [ ] 3개 요금제 카드
  - [ ] 기능 체크리스트
  - [ ] 권장 배지 (카드 2)
  - [ ] 가격 표시

---

## 🔌 백엔드 개발 (2-3주차)

### Supabase 설정

- [x] **데이터베이스 스키마 생성**

  - [x] `sessions` 테이블 (마이그레이션 파일 생성 완료)
  - [x] `matchings` 테이블 (마이그레이션 파일 생성 완료)
  - [x] `feedback` 테이블 (마이그레이션 파일 생성 완료)
  - [x] `events` 테이블 (마이그레이션 파일 생성 완료)
  - [x] `products` 테이블 (마이그레이션 파일 생성 완료)
  - [x] `subscriptions` 테이블 (마이그레이션 파일 생성 완료)
  - [x] `experts` 테이블 (마이그레이션 파일 생성 완료)
  - [x] SQL 스크립트 실행 및 검증 (Supabase에 적용 필요) ✅ 완료

- [x] **RLS 정책 설정** (개발 단계: 비활성화 완료)

  - [x] 모든 테이블 RLS 비활성화 (개발 단계)
  - [ ] 프로덕션용 RLS 정책 설정 (배포 전 필요)
  - [ ] `sessions` 테이블 RLS 활성화 (프로덕션)
  - [ ] 사용자는 자신의 세션만 조회 가능 (프로덕션)
  - [ ] `matchings` - 사용자별 데이터 격리 (프로덕션)
  - [ ] `feedback` - 사용자별 피드백 격리 (프로덕션)
  - [ ] `events` - 분석 목적 접근 제어 (프로덕션)

- [x] **인덱스 생성**
  - [x] `sessions(clerk_user_id)` UNIQUE
  - [x] `matchings(clerk_user_id, created_at DESC)` - 복합 인덱스
  - [x] `events(event_name, created_at DESC)` - 복합 인덱스
  - [x] `products(category)`, `products(body_parts GIN)` - GIN 인덱스
  - [x] 모든 테이블의 필수 인덱스 생성 완료

### API 개발

- [x] **인증 미들웨어**

  - [x] `middleware.ts` - Clerk 연계 완료
  - [ ] `lib/auth.ts` - 헬퍼 함수 (추가 필요 시)
  - [x] 세션 생성/업데이트 로직 (SyncUserProvider 구현 완료)

- [x] **매칭 API** (`/api/matching/recommend`) ✅ 완료

  - [x] 입력 검증 (Zod 스키마)
  - [x] Supabase 쿼리 로직
  - [x] AI 알고리즘 (규칙 기반 점수 계산)
  - [x] 결과 저장 (matchings 테이블)
  - [x] 에러 처리

- [x] **피드백 API** (`/api/feedback/submit`) ✅ 완료

  - [x] 피드백 저장
  - [x] 유효성 검사 (Zod 스키마)
  - [x] 응답 포맷

- [x] **분석 API** (`/api/analytics/event`) ✅ 완료

  - [x] 이벤트 저장
  - [x] 배치 처리 (여러 이벤트 한 번에 저장)
  - [ ] Google Analytics 동기화 (추후 구현)

- [x] **헬스체크 API** (`/api/health`) ✅ 완료
  - [x] 데이터베이스 상태
  - [x] API 상태
  - [ ] 외부 서비스 상태 (추후 구현)

---

## 🎭 프론트엔드 통합 (2주차)

### 상태 관리 및 서비스

- [x] **Zustand 스토어 구축** ✅ 완료

  - [x] `store/uiStore.ts` - UI 상태 (테마, 모달, 스크롤 위치)
  - [x] `store/formStore.ts` - 폼 상태 (검증, 에러 관리)
  - [x] `store/matchingStore.ts` - 매칭 결과 (결과 저장, 히스토리)

- [x] **API 클라이언트** ✅ 완료

  - [x] `lib/api/matching.ts` - 매칭 추천 API
  - [x] `lib/api/feedback.ts` - 피드백 제출 API
  - [x] `lib/api/analytics.ts` - 분석 이벤트 API
  - [x] 에러 처리 및 재시도 로직 (최대 3회 재시도)

- [x] **Hooks 개발** ✅ 완료
  - [x] `hooks/use-matching.ts` - 매칭 로직 (자동 분석 이벤트 추적)
  - [x] `hooks/use-form.ts` - 폼 상태 관리
  - [x] `hooks/use-analytics.ts` - 이벤트 추적 (페이지 뷰 자동 추적)
  - [x] `hooks/use-auth.ts` - 인증 정보 (Clerk 래퍼)

### 페이지 개발

- [x] **인덱스 페이지** (`/`) ✅ 완료

  - [x] 모든 섹션 통합 (기본 구조)
  - [x] 레이아웃 구성 (반응형 그리드)
  - [x] 반응형 테스트 (모바일/태블릿/데스크톱)
  - [x] 성능 최적화 (최소한의 컴포넌트 로드)
  - [x] **웹 접근성 기능 통합** ✅ 완료
    - [x] 접근성 도구 모음 (Accessibility Toolbar) 컴포넌트
    - [x] 화면 확대/축소 플로팅 버튼
    - [x] TTS (Text-to-Speech) 기능
    - [x] 키보드 스캔 모드 (지체장애인용)
    - [x] 고대비 모드 토글
    - [x] 폰트 크기 조절 기능
    - [x] Skip Link (주 콘텐츠로 건너뛰기)

- [x] **대시보드** (`/dashboard`) ✅ 완료
  - [x] 인증 필수 (Clerk 미들웨어)
  - [x] 사용자 매칭 기록 (기본 구조)
  - [x] 프로필 정보 (사용자 ID, 상태)
  - [x] 구독 상태 (무료 플랜 표시)
  - [x] **접근성 기능** ✅ 완료
    - [x] 키보드 네비게이션 지원
    - [x] 스크린 리더 최적화 (시맨틱 HTML)
    - [x] 포커스 관리 (focus:ring 스타일)

---

## 🔐 인증 및 권한 (1주차)

### Clerk 통합

- [x] **인증 라우트 설정** ✅ 완료

  - [x] Sign-up 페이지 (Clerk 기본 모달 사용 - SignInButton mode="modal")
  - [x] Sign-in 페이지 (Clerk 기본 모달 사용 - SignInButton mode="modal")
  - [x] Callback 라우트 (Clerk 자동 처리)
  - [x] 사용자 프로필 (UserButton 컴포넌트 사용)

- [x] **미들웨어 설정**

  - [x] 보호된 라우트 정의 (middleware.ts 완료)
  - [x] 인증 상태 확인 (Clerk 미들웨어 완료)
  - [x] Supabase 세션 동기화 (SyncUserProvider 구현 완료)

- [x] **Webhook 구성** ✅ 완료
  - [x] `user.created` - 세션 생성 (Webhook + SyncUserProvider 이중 처리)
  - [x] `user.updated` - 프로필 업데이트 (Webhook으로 처리)
  - [x] `user.deleted` - 정리 작업 (sessions 테이블에서 삭제, CASCADE 처리)

---

## 🧪 테스트 개발 (1-2주차)

### 단위 테스트

- [x] **컴포넌트 테스트** (React Testing Library) ✅ 완료

  - [x] Button 컴포넌트 테스트 (렌더링, 클릭, variant, size, 접근성)
  - [x] FormGroup 테스트 (Radio, Checkbox 그룹)
  - [x] Card 컴포넌트 테스트 (전체 구조, 슬롯)
  - [ ] 목표: 80% 이상 커버리지 (테스트 실행 필요)

- [x] **Utility 함수 테스트** (Vitest) ✅ 완료
  - [x] API 클라이언트 테스트 (matching, analytics)
  - [x] 폼 검증 로직 테스트 (formStore)
  - [x] 분석 이벤트 테스트 (trackEvent, 헬퍼 함수)
  - [x] Utils 함수 테스트 (cn 함수)

### E2E 테스트 (Playwright)

- [x] **사용자 여정 테스트** ✅ 완료

  - [x] 홈페이지 로드 및 섹션 확인
  - [x] Hero CTA 클릭 → 데모 섹션 이동
  - [x] 인증 플로우 (로그인 버튼, 모달)
  - [ ] 데모 도구 → 추천받기 (구현 후 추가)
  - [ ] 피드백 제출 (구현 후 추가)

- [x] **에러 시나리오** ✅ 완료
  - [x] 네트워크 오류 처리
  - [x] 폼 검증 에러 (기본 구조)
  - [ ] API 타임아웃 (구현 후 추가)

---

## 📊 분석 및 추적 (1주차)

### Google Analytics 4 설정

- [ ] **GA4 속성 생성**

  - [ ] 데이터 스트림 생성
  - [ ] Measurement ID 복사
  - [ ] 추적 코드 설치

- [ ] **이벤트 정의**
  - [ ] `page_view` - 페이지 진입
  - [ ] `cta_click` - CTA 버튼 클릭
  - [ ] `form_submit` - 폼 제출
  - [ ] `section_scroll` - 섹션 도달

### Sentry 설정

- [ ] **Sentry 프로젝트 생성**
  - [ ] DSN 복사
  - [ ] SDK 설치 및 초기화
  - [ ] 에러 트래킹 확인
  - [ ] 성능 모니터링 활성화

---

## ♿ 접근성 검증 및 구현 (1주차)

### 웹 접근성 기능 개발

- [ ] **접근성 도구 모음 (Accessibility Toolbar) 컴포넌트**

  - [ ] 플로팅 버튼 UI 구현
  - [ ] 화면 확대/축소 기능 (50% ~ 200%)
  - [ ] 고대비 모드 토글
  - [ ] 폰트 크기 조절 (작게/보통/크게/아주크게)
  - [ ] 줄 간격 조절
  - [ ] 애니메이션 비활성화 옵션
  - [ ] 설정 저장 (localStorage)
  - [ ] 키보드 단축키 지원 (Alt + A)

- [ ] **TTS (Text-to-Speech) 기능**

  - [ ] Web Speech API 통합
  - [ ] 페이지 전체 읽기 기능
  - [ ] 선택한 텍스트 읽기
  - [ ] 읽기 속도 조절
  - [ ] 음성 선택 (한국어/영어)
  - [ ] 일시정지/재개/중지 컨트롤
  - [ ] 스크린 리더와의 호환성 확인

- [ ] **OCR (Optical Character Recognition) 기능**

  - [ ] 이미지 업로드 및 텍스트 추출
  - [ ] Tesseract.js 또는 Google Vision API 통합
  - [ ] 추출된 텍스트 TTS로 읽기
  - [ ] 이미지 대체 텍스트 자동 생성

- [ ] **키보드 스캔 모드 (지체장애인용)**

  - [ ] 스캔 모드 활성화/비활성화
  - [ ] 자동 스캔 (시간 간격 설정)
  - [ ] 수동 스캔 (스페이스바/엔터)
  - [ ] 스캔 순서 시각화
  - [ ] 포커스 하이라이트 강화

- [ ] **자막 및 수어 지원 (청각장애인용)**

  - [ ] 동영상 자막 표시
  - [ ] 실시간 자막 (Web Speech API)
  - [ ] 자막 위치/크기/색상 조절
  - [ ] 수어 동영상 링크 제공 (필요 시)

- [ ] **ARIA 속성 및 시맨틱 HTML**

  - [ ] 모든 인터랙티브 요소에 적절한 ARIA 속성
  - [ ] `aria-label`, `aria-labelledby`, `aria-describedby` 적용
  - [ ] `role` 속성 적절히 사용
  - [ ] `aria-live` 영역 설정 (동적 콘텐츠)
  - [ ] 랜드마크 역할 (`main`, `nav`, `aside` 등)
  - [ ] 폼 요소 접근성 (FormLabel, FormDescription 활용)

- [ ] **React Aria 컴포넌트 통합**

  - [ ] `@react-aria/components` 패키지 설치
  - [ ] 기존 컴포넌트를 React Aria로 마이그레이션
  - [ ] 키보드 네비게이션 자동 지원
  - [ ] 포커스 관리 자동화
  - [ ] 스크린 리더 최적화

### WCAG 2.1 AA 준수 검증

- [ ] **색상 대비 검사**

  - [ ] axe DevTools 실행
  - [ ] 모든 텍스트 4.5:1 이상 확보
  - [ ] 큰 텍스트 3:1 이상
  - [ ] 고대비 모드에서도 대비 확인

- [ ] **키보드 네비게이션**

  - [ ] Tab 키 순서 확인 (논리적 순서)
  - [ ] Shift + Tab 역순 네비게이션
  - [ ] 포커스 인디케이터 명확히 표시 (최소 2px)
  - [ ] 포커스 트랩 확인 (모달, 다이얼로그)
  - [ ] 키보드 단축키 문서화
  - [ ] 스킵 링크 제공 (주 콘텐츠로 바로 이동)

- [ ] **스크린 리더 테스트**

  - [ ] NVDA (Windows) 테스트
  - [ ] JAWS (Windows) 테스트
  - [ ] VoiceOver (macOS/iOS) 테스트
  - [ ] TalkBack (Android) 테스트
  - [ ] 모든 버튼/폼에 적절한 라벨 확인
  - [ ] 의미 전달 확인 (컨텍스트 이해)
  - [ ] 랜드마크 네비게이션 테스트

- [ ] **이미지 및 미디어 접근성**

  - [ ] 모든 이미지에 `alt` 속성 제공
  - [ ] 장식용 이미지는 `alt=""` 처리
  - [ ] 복잡한 이미지는 긴 설명 제공
  - [ ] 동영상 자막 제공
  - [ ] 오디오 트랜스크립트 제공

- [ ] **폼 접근성**

  - [ ] 모든 입력 필드에 라벨 연결
  - [ ] 필수 항목 명확히 표시
  - [ ] 에러 메시지 접근 가능하게 제공
  - [ ] 입력 힌트 및 도움말 제공
  - [ ] 폼 검증 실시간 피드백

- [ ] **동적 콘텐츠 접근성**

  - [ ] `aria-live` 영역 설정
  - [ ] AJAX 업데이트 알림
  - [ ] 로딩 상태 접근 가능하게 표시
  - [ ] 에러 메시지 접근 가능하게 표시

- [ ] **모바일 접근성**

  - [ ] 터치 타겟 최소 44x44px
  - [ ] 제스처 대체 방법 제공
  - [ ] 모바일 스크린 리더 테스트
  - [ ] 화면 회전 대응

---

## 🚀 배포 준비 (1주차)

### 최적화 및 성능

- [ ] **Lighthouse 최적화**

  - [ ] 성능: 90+ 달성
  - [ ] 접근성: 95+ 달성
  - [ ] SEO: 90+ 달성
  - [ ] 모범 사례: 90+ 달성

- [ ] **이미지 최적화**

  - [ ] WebP 변환
  - [ ] Responsive images (srcset)
  - [ ] Lazy loading 구현
  - [ ] 총 바이트 500KB 이하

- [ ] **코드 분할**
  - [ ] Route-based 분할
  - [ ] Component lazy loading
  - [ ] 번들 크기 150KB 이하 (gzipped)

### 보안 검사

- [ ] **OWASP Top 10 검증**

  - [ ] 입력 검증
  - [ ] SQL Injection 방지
  - [ ] XSS 방지
  - [ ] CSRF 보호

- [ ] **의존성 감시**
  - [ ] `npm audit` 실행
  - [ ] 취약점 없음 확인
  - [ ] Lock 파일 커밋

---

## 📱 모바일 최적화 (1주차)

- [ ] **반응형 테스트**

  - [ ] 모바일 (375px, 667px)
  - [ ] 태블릿 (768px, 1024px)
  - [ ] 데스크톱 (1920px)

- [ ] **터치 최적화**

  - [ ] 버튼 최소 44x44px
  - [ ] 터치 반응 시간 < 100ms
  - [ ] 제스처 지원 (스와이프)

- [ ] **성능 최적화**
  - [ ] 모바일 로딩 2초 이내
  - [ ] 모바일 LCP < 2.5s
  - [ ] 모바일 FID < 100ms

---

## 📝 문서화 (1주차)

- [x] **README.md 작성** (기본 문서 완료)

  - [x] 프로젝트 소개
  - [x] 설치 가이드
  - [x] 개발 시작
  - [ ] 배포 가이드 (상세 내용 추가 필요)

- [x] **프로젝트 문서 작성**

  - [x] PRD 문서 (AI_Assistive_Device_Matching_Landing_Page_PRD.md)
  - [x] 개발 계획서 (DEVELOPMENT_PLAN.md)
  - [x] TODO.md (작업 로드맵)
  - [x] 디렉토리 구조 (DIR.md)
  - [x] 아키텍처 다이어그램 (Mermaid.md)

- [ ] **API 문서**

  - [ ] OpenAPI 스펙
  - [ ] 엔드포인트 설명
  - [ ] 요청/응답 예시

- [ ] **컴포넌트 문서**
  - [ ] Storybook 설정
  - [ ] 각 컴포넌트 사용법

---

## 🎯 최종 점검 (배포 전)

### 런칭 체크리스트

- [ ] 모든 기능 테스트 완료
- [ ] 모든 링크 작동 확인
- [ ] 폼 제출 테스트 (성공/실패)
- [ ] 이메일 확인 메시지 테스트
- [ ] SEO 메타 태그 확인
- [ ] Open Graph 이미지 설정
- [ ] DNS 및 SSL 인증서 확인
- [ ] 분석 코드 배포 확인

### 모니터링 준비

- [ ] Sentry 모니터링 활성화
- [ ] Google Analytics 4 확인
- [ ] 에러 알림 설정
- [ ] 성능 알림 설정
- [ ] 슬랙 통지 설정

---

## 📈 런칭 후 활동 (지속)

### 주간 점검

- [ ] KPI 대시보드 확인
- [ ] 사용자 피드백 검토
- [ ] 에러 로그 분석
- [ ] 성능 메트릭 확인

### A/B 테스트 실행

- [ ] 테스트 1: Hero 헤드라인
- [ ] 테스트 2: CTA 버튼 문구
- [ ] 테스트 3: 데모 도구 간소화
- [ ] 결과 분석 및 개선

### 지속적 개선

- [ ] 사용자 피드백 수집
- [ ] 버그 수정
- [ ] 성능 최적화
- [ ] 새 기능 추가

---

## 💡 팁

**Cursor에서 각 작업을 더 효율적으로 하려면:**

1. **섹션 단위 개발**: 각 섹션별로 별도 파일로 작성
2. **타입 우선**: TypeScript 인터페이스부터 정의
3. **테스트 주도**: 컴포넌트 개발 전 테스트 케이스 작성
4. **커밋 자주**: 각 기능 완성 후 즉시 커밋
5. **PR 리뷰**: 팀원이나 AI와 코드 검토

**진행 상황 추적:**

- 완료한 항목: `- [x]`로 변경
- 진행 중: `- [ ] (진행 중)`로 표시
- 블로킹: `- [ ] ⚠️ [이유]`로 표시

---

## 📊 완료 현황 요약 (2025년 1월 업데이트)

### ✅ 완료된 주요 작업

1. **프로젝트 초기화**

   - ✅ 프로젝트 구조 구축 완료
   - ✅ 필수 파일 생성 완료 (tsconfig.json, next.config.ts 등)
   - ✅ NPM 패키지 설치 완료 (Next.js 15.5.6, React 19, Clerk, Supabase 등)

2. **데이터베이스 스키마**

   - ✅ 7개 테이블 마이그레이션 파일 생성 완료
     - sessions, products, matchings, feedback, events, subscriptions, experts
   - ✅ 모든 인덱스 생성 완료 (단일, 복합, GIN 인덱스 포함)
   - ✅ Foreign Key 관계 설정 완료
   - ✅ RLS 비활성화 완료 (개발 단계)
   - ✅ Supabase 클라우드 프로젝트 생성 완료
   - ✅ 마이그레이션 파일 적용 완료 (Supabase에 적용됨)
   - ✅ Storage 버킷 생성 완료 (uploads)

3. **인증 및 권한**

   - ✅ Clerk 미들웨어 설정 완료
   - ✅ 사용자 동기화 로직 구현 완료 (SyncUserProvider)
   - ✅ ClerkProvider 설정 완료

4. **기본 UI 컴포넌트**

   - ✅ Button, Input 컴포넌트 (shadcn/ui)
   - ✅ Form, Label, Dialog, Accordion 등 기본 컴포넌트

5. **문서화**
   - ✅ PRD 문서 작성 완료
   - ✅ 개발 계획서 작성 완료
   - ✅ TODO.md 작업 로드맵 작성 완료
   - ✅ 디렉토리 구조 문서 작성 완료
   - ✅ 아키텍처 다이어그램 작성 완료

### 🔄 다음 단계 (우선순위)

1. **데이터베이스 마이그레이션 적용** (최우선)

   - Supabase에 마이그레이션 파일 적용
   - 테이블 생성 검증

2. **UI 컴포넌트 개발** (Phase 2)

   - Hero 섹션 컴포넌트
   - AI 데모 섹션 컴포넌트
   - FormGroup, Slider 컴포넌트

3. **API 라우트 개발** (Phase 3)
   - 매칭 추천 API
   - 피드백 제출 API
   - 분석 이벤트 API

---

**최종 목표**: 모든 항목 완료 후 배포 ✅
