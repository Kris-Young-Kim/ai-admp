# DIR.md - 프로젝트 디렉토리 구조

> 일반적인 랜딩페이지 구조 프로젝트

---

## 프로젝트 전체 구조

```
AI-ADMP_landing/
│
├── 📄 프로젝트 설정 파일
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
├── 🖼️ 정적 자산
│   └── public/
│       ├── favicon.ico
│       ├── logo.png
│       ├── og-image.png
│       └── icons/
│
├── 📦 소스 코드
│   │
│   ├── app/                            # Next.js App Router
│   │   ├── layout.tsx                  # 루트 레이아웃
│   │   ├── page.tsx                    # 랜딩 페이지 (8개 섹션)
│   │   ├── globals.css                 # 글로벌 스타일
│   │   │
│   │   ├── api/                        # API Routes (최소한만)
│   │   │   ├── health/
│   │   │   │   └── route.ts            # 헬스체크
│   │   │   ├── sync-user/
│   │   │   │   └── route.ts            # 사용자 동기화
│   │   │   └── webhooks/
│   │   │       └── clerk/
│   │   │           └── route.ts        # Clerk 웹훅
│   │   │
│   │   └── dashboard/                  # 대시보드 (선택사항)
│   │       └── page.tsx
│   │
│   ├── components/                     # React 컴포넌트
│   │   ├── ui/                         # shadcn/ui 기본 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── form.tsx
│   │   │   └── ...
│   │   │
│   │   ├── sections/                   # 페이지 섹션
│   │   │   ├── hero-section.tsx        # Hero 섹션
│   │   │   ├── problem-section.tsx     # 문제 공감 섹션
│   │   │   ├── solution-section.tsx    # 해결책 섹션
│   │   │   ├── features-section.tsx    # 기능/특징 섹션
│   │   │   ├── how-it-works-section.tsx # 작동 방식 섹션
│   │   │   ├── testimonials-section.tsx # 사용자 후기 섹션
│   │   │   └── faq-section.tsx         # FAQ 섹션
│   │   │
│   │   ├── accessibility/              # 접근성 컴포넌트
│   │   │   ├── accessibility-toolbar.tsx
│   │   │   ├── text-to-speech.tsx
│   │   │   └── ...
│   │   │
│   │   ├── providers/                  # Context Provider
│   │   │   ├── sync-user-provider.tsx
│   │   │   └── analytics-provider.tsx
│   │   │
│   │   └── lead-form.tsx               # 정보 수집 폼
│   │
│   ├── actions/                        # Server Actions
│   │   ├── matching.ts                 # 쿠팡 상품 추천
│   │   └── submit-lead.ts              # 정보 수집 저장
│   │
│   ├── lib/                            # 유틸리티
│   │   ├── supabase/                   # Supabase 클라이언트
│   │   │   ├── clerk-client.ts
│   │   │   ├── server.ts
│   │   │   ├── service-role.ts
│   │   │   └── client.ts
│   │   │
│   │   ├── analytics/                  # 분석 (선택사항)
│   │   │   ├── ga4.ts
│   │   │   └── sentry.ts
│   │   │
│   │   └── utils.ts                    # 공통 유틸
│   │
│   ├── hooks/                          # 커스텀 훅
│   │   ├── use-auth.ts
│   │   ├── use-form.ts
│   │   └── use-sync-user.ts
│   │
│   ├── store/                          # Zustand 스토어
│   │   ├── uiStore.ts
│   │   └── formStore.ts
│   │
│   └── middleware.ts                   # Clerk 미들웨어
│
├── 📝 문서
│   ├── README.md
│   ├── TODO.md
│   ├── DIR.md                          # 이 파일
│   ├── Mermaid.md                      # 아키텍처 다이어그램
│   └── AI_Assistive_Device_Matching_Landing_Page_PRD.md
│
├── 🧪 테스트
│   ├── __tests__/                      # 단위 테스트
│   └── tests/                          # E2E 테스트 (Playwright)
│
└── supabase/                           # Supabase 설정
    ├── config.toml
    └── migrations/
        └── 20250115000000_create_leads.sql
```

---

## 핵심 파일 설명

| 파일                                           | 설명                    | 우선도  |
| ---------------------------------------------- | ----------------------- | ------- |
| `app/page.tsx`                                 | 랜딩페이지 (8개 섹션)   | 🔴 높음 |
| `components/sections/hero-section.tsx`         | Hero 섹션               | 🔴 높음 |
| `components/sections/problem-section.tsx`      | 문제 공감 섹션          | 🔴 높음 |
| `components/sections/solution-section.tsx`     | 해결책 섹션             | 🔴 높음 |
| `components/sections/features-section.tsx`     | 기능/특징 섹션          | 🔴 높음 |
| `components/sections/how-it-works-section.tsx` | 작동 방식 섹션          | 🔴 높음 |
| `components/sections/testimonials-section.tsx` | 사용자 후기 섹션        | 🔴 높음 |
| `components/sections/faq-section.tsx`          | FAQ 섹션                | 🔴 높음 |
| `components/lead-form.tsx`                     | 정보 수집 폼            | 🔴 높음 |
| `actions/submit-lead.ts`                       | 정보 저장 Server Action | 🔴 높음 |
| `lib/supabase/`                                | Supabase 클라이언트     | 🔴 높음 |
| `middleware.ts`                                | Clerk 인증 미들웨어     | 🟡 중간 |
| `app/api/health/route.ts`                      | 헬스체크 API            | 🟢 낮음 |

---

## 폴더별 책임

| 폴더          | 책임                         |
| ------------- | ---------------------------- |
| `app/`        | 라우팅 및 페이지 로직        |
| `components/` | UI 렌더링                    |
| `actions/`    | Server Actions (데이터 저장) |
| `lib/`        | 유틸리티 및 외부 통합        |
| `hooks/`      | 커스텀 React 훅              |
| `store/`      | 전역 상태 관리 (Zustand)     |
| `supabase/`   | 데이터베이스 마이그레이션    |

---

## 주요 경로

```bash
# 개발 시작
pnpm install
pnpm dev

# Supabase 연결
cp .env.example .env.local
# .env.local에 Supabase URL과 키 입력

# 테스트 실행
pnpm test

# 배포
git push origin main  # Vercel 자동 배포
```

---

**마지막 업데이트**: 2025년 1월  
**프로젝트 상태**: 일반적인 랜딩페이지 구조 (8개 섹션 완료)
