# DIR.md - 프로젝트 디렉토리 구조

> Cursor에서 이 구조를 참고하며 파일을 생성하세요.

---

## 프로젝트 전체 구조

```
gachivalue-landing/
│
├── 📄 프로젝트 설정 파일
│   ├── package.json                    # npm 의존성
│   ├── package-lock.json               # 의존성 잠금
│   ├── tsconfig.json                   # TypeScript 설정
│   ├── next.config.js                  # Next.js 설정
│   ├── tailwind.config.js              # Tailwind CSS 설정
│   ├── postcss.config.js               # PostCSS 설정
│   ├── jest.config.js                  # Jest 테스트 설정
│   ├── .eslintrc.json                  # ESLint 설정
│   ├── .prettierrc                     # Prettier 포맷팅 설정
│   ├── vercel.json                     # Vercel 배포 설정
│   ├── .env.example                    # 환경 변수 예시
│   ├── .gitignore                      # Git 무시 파일
│   └── README.md                       # 프로젝트 설명
│
├── 🛠️ GitHub & Automation
│   ├── .github/
│   │   ├── ISSUE_TEMPLATE/
│   │   │   ├── bug_report.md           # 버그 리포트 템플릿
│   │   │   └── feature_request.md      # 기능 요청 템플릿
│   │   ├── PULL_REQUEST_TEMPLATE.md    # PR 템플릿
│   │   └── workflows/
│   │       ├── deploy.yml              # 자동 배포 워크플로우
│   │       ├── tests.yml               # 테스트 워크플로우
│   │       └── lighthouse.yml          # Lighthouse CI
│   └── .git/                           # Git 저장소 (숨김)
│
├── 🖼️ 정적 자산
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   │   ├── hero-main.webp
│   │   │   │   ├── hero-main.jpg       # 폴백
│   │   │   │   └── hero-mobile.webp
│   │   │   ├── icons/
│   │   │   │   ├── body-parts/
│   │   │   │   │   ├── upper-body.svg
│   │   │   │   │   ├── lower-body.svg
│   │   │   │   │   └── ...
│   │   │   │   ├── features/
│   │   │   │   └── social/
│   │   │   ├── testimonials/
│   │   │   │   ├── user-1.webp
│   │   │   │   └── ...
│   │   │   ├── logos/
│   │   │   │   ├── partners/
│   │   │   │   ├── certifications/
│   │   │   │   └── social/
│   │   │   └── illustrations/
│   │   │       ├── problem-1.svg
│   │   │       └── ...
│   │   ├── fonts/
│   │   │   ├── noto-sans-kr/
│   │   │   │   ├── noto-sans-kr-300.woff2
│   │   │   │   ├── noto-sans-kr-400.woff2
│   │   │   │   ├── noto-sans-kr-600.woff2
│   │   │   │   └── noto-sans-kr-700.woff2
│   │   │   └── inter/
│   │   │       └── ...
│   │   ├── videos/
│   │   │   ├── testimonial-1.webm
│   │   │   └── ...
│   │   └── data/
│   │       ├── products.json           # 제품 데이터 (캐시)
│   │       └── config.json             # 설정 데이터
│   │
│   └── .vercelignore                   # Vercel 무시 파일
│
├── 📦 소스 코드 (src/)
│   │
│   ├── app/                            # Next.js 13+ App Router
│   │   ├── layout.tsx                  # 루트 레이아웃
│   │   ├── page.tsx                    # 인덱스 페이지 (랜딩)
│   │   ├── globals.css                 # 글로벌 스타일
│   │   │
│   │   ├── (auth)/                     # 인증 관련 라우트 그룹
│   │   │   ├── layout.tsx              # 인증 레이아웃
│   │   │   ├── sign-up/
│   │   │   │   └── page.tsx            # 회원가입
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx            # 로그인
│   │   │   ├── callback/
│   │   │   │   └── page.tsx            # Clerk 콜백
│   │   │   └── verify-email/
│   │   │       └── page.tsx            # 이메일 확인
│   │   │
│   │   ├── (dashboard)/                # 대시보드 라우트 그룹
│   │   │   ├── layout.tsx              # 대시보드 레이아웃
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx            # 대시보드 홈
│   │   │   │   ├── history/
│   │   │   │   │   └── page.tsx        # 매칭 기록
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx        # 사용자 프로필
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx        # 설정
│   │   │   │   └── subscription/
│   │   │   │       └── page.tsx        # 구독 관리
│   │   │   │
│   │   │   ├── experts/
│   │   │   │   ├── page.tsx            # 전문가 디렉토리
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # 전문가 상세
│   │   │   │
│   │   │   └── consulting/
│   │   │       ├── page.tsx            # 상담 예약
│   │   │       └── [id]/
│   │   │           └── page.tsx        # 상담 상세
│   │   │
│   │   ├── api/                        # API 라우트
│   │   │   ├── auth/
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts        # Clerk 웹훅
│   │   │   │
│   │   │   ├── matching/
│   │   │   │   ├── recommend/
│   │   │   │   │   └── route.ts        # AI 추천
│   │   │   │   └── history/
│   │   │   │       └── route.ts        # 매칭 기록 조회
│   │   │   │
│   │   │   ├── feedback/
│   │   │   │   └── submit/
│   │   │   │       └── route.ts        # 피드백 제출
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   └── event/
│   │   │   │       └── route.ts        # 이벤트 추적
│   │   │   │
│   │   │   ├── subscription/
│   │   │   │   ├── create/
│   │   │   │   │   └── route.ts        # 구독 생성
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts        # Stripe 웹훅
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── search/
│   │   │   │   │   └── route.ts        # 상품 검색
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts        # 상품 상세
│   │   │   │
│   │   │   ├── health/
│   │   │   │   └── route.ts            # 헬스체크
│   │   │   │
│   │   │   └── [fallback]/
│   │   │       └── route.ts            # 404 API
│   │   │
│   │   ├── error.tsx                   # 에러 바운더리
│   │   ├── not-found.tsx               # 404 페이지
│   │   ├── loading.tsx                 # 로딩 상태
│   │   ├── middleware.ts               # 미들웨어
│   │   └── opengraph-image.tsx         # OG 이미지 생성
│   │
│   ├── components/                     # React 컴포넌트
│   │   │
│   │   ├── common/                     # 공용 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── forms/                      # 폼 컴포넌트
│   │   │   ├── FormGroup.tsx
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── CheckboxGroup.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── FormError.tsx
│   │   │   └── FormField.tsx
│   │   │
│   │   ├── sections/                   # 페이지 섹션
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PainPointsSection.tsx
│   │   │   ├── DemoSection.tsx
│   │   │   ├── ResultsSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── TestimonialSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── features/                   # 기능 컴포넌트
│   │   │   ├── DemoTool.tsx
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── TestimonialCarousel.tsx
│   │   │   ├── PricingCard.tsx
│   │   │   ├── ExpertCard.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   └── SubscriptionForm.tsx
│   │   │
│   │   ├── providers/                  # Context Provider
│   │   │   ├── RootProvider.tsx
│   │   │   ├── ClerkProvider.tsx
│   │   │   └── AnalyticsProvider.tsx
│   │   │
│   │   └── __tests__/                  # 컴포넌트 테스트
│   │       ├── Button.test.tsx
│   │       ├── HeroSection.test.tsx
│   │       └── DemoTool.test.tsx
│   │
│   ├── lib/                            # 유틸리티 및 헬퍼
│   │   │
│   │   ├── api/                        # API 클라이언트
│   │   │   ├── index.ts
│   │   │   ├── matching.ts             # 매칭 관련
│   │   │   ├── feedback.ts             # 피드백 관련
│   │   │   ├── analytics.ts            # 분석 관련
│   │   │   ├── auth.ts                 # 인증 관련
│   │   │   └── error.ts                # 에러 처리
│   │   │
│   │   ├── supabase/                   # Supabase 클라이언트
│   │   │   ├── client.ts               # 클라이언트 인스턴스
│   │   │   ├── server.ts               # 서버 인스턴스
│   │   │   ├── admin.ts                # Admin API
│   │   │   └── queries.ts              # 공통 쿼리
│   │   │
│   │   ├── clerk/                      # Clerk 관련
│   │   │   ├── index.ts                # Clerk 헬퍼
│   │   │   └── webhooks.ts             # 웹훅 처리
│   │   │
│   │   ├── validations/                # 유효성 검사
│   │   │   ├── formSchema.ts           # 폼 스키마 (Zod)
│   │   │   ├── apiSchema.ts            # API 스키마
│   │   │   └── utils.ts                # 검증 유틸
│   │   │
│   │   ├── sentry/                     # Sentry 설정
│   │   │   ├── index.ts
│   │   │   └── config.ts
│   │   │
│   │   ├── analytics/                  # Google Analytics
│   │   │   ├── gtag.ts                 # GA4 헬퍼
│   │   │   ├── events.ts               # 이벤트 정의
│   │   │   └── tracking.ts             # 추적 로직
│   │   │
│   │   ├── utils/                      # 일반 유틸
│   │   │   ├── cn.ts                   # clsx 헬퍼
│   │   │   ├── format.ts               # 포맷팅 (날짜, 금액)
│   │   │   ├── constants.ts            # 상수
│   │   │   ├── errors.ts               # 에러 클래스
│   │   │   └── test-utils.ts           # 테스트 헬퍼
│   │   │
│   │   └── hooks/
│   │       ├── useAuth.ts              # 인증 훅
│   │       ├── useMatching.ts          # 매칭 훅
│   │       ├── useForm.ts              # 폼 훅
│   │       ├── useAnalytics.ts         # 분석 훅
│   │       ├── useApi.ts               # API 훅
│   │       ├── useLocalStorage.ts      # 로컬 스토리지
│   │       └── useDebounce.ts          # 디바운스
│   │
│   ├── hooks/                          # 커스텀 훅
│   │   ├── index.ts                    # 훅 export
│   │   └── ... (lib/hooks와 동일)
│   │
│   ├── types/                          # TypeScript 타입
│   │   ├── index.ts                    # 전체 export
│   │   ├── api.ts                      # API 타입
│   │   ├── database.ts                 # DB 타입 (자동 생성 가능)
│   │   ├── form.ts                     # 폼 타입
│   │   ├── analytics.ts                # 분석 타입
│   │   └── common.ts                   # 공용 타입
│   │
│   ├── styles/                         # 글로벌 스타일
│   │   ├── globals.css                 # 글로벌 CSS (app/globals.css와 중복 가능)
│   │   ├── animations.css              # 애니메이션
│   │   ├── accessibility.css           # 접근성 스타일
│   │   └── variables.css               # CSS 변수
│   │
│   └── middleware.ts                   # Next.js 미들웨어
│
├── 📝 문서
│   ├── README.md                       # 프로젝트 소개
│   ├── TODO.md                         # 작업 목록
│   ├── Mermaid.md                      # 아키텍처 다이어그램
│   ├── DIR.md                          # 이 파일
│   ├── CONTRIBUTING.md                 # 기여 가이드
│   ├── ARCHITECTURE.md                 # 아키텍처 설명
│   ├── API.md                          # API 문서
│   ├── DATABASE.md                     # 데이터베이스 스키마
│   ├── DEPLOYMENT.md                   # 배포 가이드
│   ├── TESTING.md                      # 테스트 가이드
│   └── PERFORMANCE.md                  # 성능 최적화
│
├── 🧪 테스트
│   ├── __tests__/
│   │   ├── unit/
│   │   │   ├── lib/
│   │   │   │   ├── api.test.ts
│   │   │   │   └── utils.test.ts
│   │   │   └── hooks/
│   │   │       └── useAuth.test.ts
│   │   │
│   │   ├── integration/
│   │   │   ├── matching.test.ts
│   │   │   └── auth.test.ts
│   │   │
│   │   ├── e2e/
│   │   │   ├── hero.spec.ts
│   │   │   ├── demo.spec.ts
│   │   │   └── checkout.spec.ts
│   │   │
│   │   └── fixtures/
│   │       ├── mockData.ts
│   │       ├── mockSupabase.ts
│   │       └── mockApi.ts
│   │
│   ├── jest.config.js                  # Jest 설정 (루트 중복)
│   ├── playwright.config.ts            # Playwright 설정
│   └── coverage/                       # 커버리지 리포트 (생성됨)
│
├── 🛠️ 스크립트
│   ├── scripts/
│   │   ├── db/
│   │   │   ├── seed.ts                 # 데이터 시딩
│   │   │   ├── migrate.ts              # 마이그레이션
│   │   │   └── reset.ts                # 리셋
│   │   │
│   │   ├── supabase/
│   │   │   ├── setup.ts                # Supabase 초기화
│   │   │   └── sync-schema.ts          # 스키마 동기화
│   │   │
│   │   ├── generate/
│   │   │   ├── types.ts                # DB 타입 생성
│   │   │   └── openapi.ts              # OpenAPI 생성
│   │   │
│   │   ├── deploy/
│   │   │   ├── pre-deploy-check.sh     # 배포 전 체크
│   │   │   ├── deploy.sh               # 배포 스크립트
│   │   │   └── rollback.sh             # 롤백 스크립트
│   │   │
│   │   └── dev/
│   │       ├── setup-env.ts            # 환경 설정
│   │       └── seed-dev.ts             # 개발용 시드
│   │
│   ├── package.json (scripts 섹션에 포함)
│   │   npm run dev                    # 개발 서버
│   │   npm run build                  # 빌드
│   │   npm run test                   # 테스트
│   │   npm run lint                   # 린트
│   │   npm run type-check             # 타입 체크
│   │   npm run format                 # 포맷팅
│   │
│   └── Makefile (선택사항)
│
├── 🛡️ 설정 및 CI/CD
│   ├── .cursor/
│   │   ├── settings.json               # Cursor 설정
│   │   └── rules.md                    # AI 규칙
│   │
│   ├── .env.local                      # 로컬 환경 변수 (배제)
│   ├── .env.production                 # 프로덕션 환경 변수 (예시)
│   ├── .env.development                # 개발 환경 변수 (예시)
│   │
│   ├── vercel.json                     # Vercel 설정 (루트 중복)
│   ├── lighthouse-config.json          # Lighthouse 설정
│   ├── .remarkrc.json                  # 마크다운 린트
│   │
│   └── docker/ (선택사항)
│       ├── Dockerfile
│       └── docker-compose.yml
│
└── 📚 기타
    ├── .cursorignore                   # Cursor 무시 파일
    ├── .prettierignore                 # Prettier 무시
    ├── CHANGELOG.md                    # 변경 기록
    ├── LICENSE                         # 라이선스
    └── .dockerignore                   # Docker 무시 (선택)

```

---

## 파일 생성 순서 (권장)

### Phase 1: 프로젝트 초기화 (1일)
```
1. 루트 설정 파일
   - package.json
   - tsconfig.json
   - next.config.js
   - tailwind.config.js
   
2. 환경 파일
   - .env.example
   - .gitignore
   
3. 문서
   - README.md
   - TODO.md (이미 생성됨)
   - Mermaid.md (이미 생성됨)
   - DIR.md (이 파일)
```

### Phase 2: 핵심 구조 (2-3일)
```
4. src/app/ 기본 구조
   - layout.tsx
   - page.tsx
   - error.tsx
   - not-found.tsx
   - middleware.ts
   
5. src/components/common/
   - Button.tsx
   - Input.tsx
   - Card.tsx
   
6. src/lib/ 핵심 유틸
   - supabase/client.ts
   - api/index.ts
   - auth.ts
```

### Phase 3: 기능 구현 (3-4주)
```
7. 나머지 컴포넌트 구현
8. API 라우트 구현
9. 데이터베이스 연동
10. 인증 통합
```

---

## 중요 파일 설명

| 파일 | 설명 | 우선도 |
|-----|------|--------|
| `src/app/page.tsx` | 랜딩페이지 (메인) | 🔴 높음 |
| `src/app/api/matching/recommend/route.ts` | AI 추천 API | 🔴 높음 |
| `src/lib/supabase/client.ts` | Supabase 클라이언트 | 🔴 높음 |
| `src/components/sections/` | 모든 섹션 컴포넌트 | 🔴 높음 |
| `src/lib/api/matching.ts` | 매칭 API 클라이언트 | 🟡 중간 |
| `src/app/middleware.ts` | 인증 미들웨어 | 🟡 중간 |
| `.github/workflows/deploy.yml` | 자동 배포 | 🟡 중간 |
| `tests/__tests__/` | 테스트 파일 | 🟢 낮음 |

---

## 폴더별 책임 (SOLID)

| 폴더 | 책임 |
|-----|------|
| `app/` | 라우팅 및 페이지 로직 |
| `components/` | UI 렌더링 |
| `lib/` | 비즈니스 로직 및 외부 통합 |
| `types/` | TypeScript 타입 정의 |
| `styles/` | 전역 스타일 |
| `tests/` | 테스트 케이스 |
| `scripts/` | 자동화 스크립트 |
| `.github/` | CI/CD 및 자동화 |
| `public/` | 정적 자산 |

---

## Cursor에서 사용하기

### 1. 폴더 열기
```bash
# Cursor에서 프로젝트 루트 폴더 열기
cursor .
```

### 2. 파일 탐색
```
Ctrl/Cmd + P: 파일 검색
Ctrl/Cmd + Shift + F: 전체 텍스트 검색
Ctrl/Cmd + B: 사이드바 토글
```

### 3. 컨텍스트 활용
```
@workspace: 전체 프로젝트 컨텍스트
@file: 현재 파일 컨텍스트
@terminal: 터미널 출력 컨텍스트
```

### 4. AI 어시스턴트 활용
```
Ctrl/Cmd + K: 채팅 열기
"src/components/Button.tsx를 만들어줘"
```

---

## 주요 경로 (빠른 접근)

```bash
# 개발 시작
cd gachivalue-landing
npm install
npm run dev

# Supabase 연결
cp .env.example .env.local
# .env.local에 Supabase URL과 키 입력

# 데이터베이스 마이그레이션
npm run db:migrate

# 테스트 실행
npm run test

# 배포
git push origin main  # 자동으로 Vercel 배포 시작
```

---

**마지막 업데이트**: 2025년 11월 14일  
**다음 단계**: 각 폴더 및 파일 생성 시작

