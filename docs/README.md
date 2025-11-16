# README.md - AI 보조기기 매칭 랜딩페이지

[![Vercel](https://img.shields.io/badge/vercel-deployed-brightgreen?logo=vercel)](https://gachivalue.vercel.app)
[![GitHub Actions](https://github.com/your-org/gachivalue-landing/workflows/Deploy/badge.svg)](https://github.com/your-org/gachivalue-landing/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=nextjs)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 프로젝트 소개

**함께가치 - AI 보조기기 매칭 랜딩페이지**

AI를 활용하여 사용자의 신체 상황, 활동 목적, 예산에 맞는 최적의 보조기기를 3분 만에 추천해주는 서비스입니다.

### 🎯 핵심 기능

- **AI 기반 매칭**: 1,200개 이상의 보조기기 중 최적의 상품 3개 추천
- **개인화 경험**: 사용자의 신체 부위, 활동 패턴, 예산 고려
- **전문가 연결**: 보조공학사, 작업치료사와의 1:1 비대면/오프라인 상담
- **신뢰성 강화**: 95% 이상의 사용자 만족도, 3,500명 이상 체험
- **접근성 우선**: WCAG 2.1 AA 준수, 모든 사용자를 위한 디자인

### 💡 문제 해결

| 문제 | 해결책 |
|------|--------|
| 정보 검색의 어려움 | 💡 AI가 자동 추천 (3분) |
| 사전 정보 부족 | 📊 상세 상품 정보 제공 |
| 전문가 연결 부재 | 🤝 1:1 전문가 상담 연계 |

---

## 🛠️ 기술 스택

### 프론트엔드
- **프레임워크**: [Next.js 15.5.6](https://nextjs.org/) (App Router)
- **언어**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI**: [React 19](https://react.dev/) + [Tailwind CSS v4](https://tailwindcss.com/)
- **UI 컴포넌트**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI 기반)
- **폼**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **아이콘**: [lucide-react](https://lucide.dev/)

### 백엔드
- **데이터베이스**: [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM**: [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- **API**: Next.js API Routes

### 인증 & 권한
- **인증**: [Clerk](https://clerk.com/) (OAuth/SSO)
- **세션**: Supabase + Clerk 연동

### 배포 & 모니터링
- **호스팅**: [Vercel](https://vercel.com/)
- **버전 관리**: [GitHub](https://github.com/) + [Git](https://git-scm.com/)
- **에러 추적**: [Sentry](https://sentry.io/)
- **분석**: [Google Analytics 4](https://marketingplatform.google.com/about/analytics/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

### 개발 도구
- **IDE**: [Cursor](https://cursor.sh/)
- **패키지 관리자**: [npm](https://www.npmjs.com/) / [pnpm](https://pnpm.io/)
- **린터**: [ESLint](https://eslint.org/)
- **포맷터**: [Prettier](https://prettier.io/)
- **테스트**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react)
- **E2E**: [Playwright](https://playwright.dev/)

---

## 📦 설치 및 시작

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 8.0.0 이상 (또는 pnpm 7.0.0+)
- Git

### 1단계: 클론 및 의존성 설치

```bash
# 저장소 클론
git clone https://github.com/your-org/gachivalue-landing.git
cd gachivalue-landing

# 의존성 설치
npm install
# 또는
pnpm install
```

### 2단계: 환경 변수 설정

```bash
# .env.local 파일 생성
cp .env.example .env.local

# 다음 값들을 입력하세요:
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://...

# 기타
DATABASE_URL=postgresql://...
```

### 3단계: 데이터베이스 마이그레이션

```bash
# Supabase 데이터베이스 초기화
npm run db:setup

# (선택) 개발용 데이터 시딩
npm run db:seed:dev
```

### 4단계: 개발 서버 시작

```bash
# 개발 모드로 시작
npm run dev

# 브라우저에서 열기: http://localhost:3000
```

### 5단계: 빌드 및 테스트

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 테스트 실행
npm run test

# 린트 검사
npm run lint

# 타입 체크
npm run type-check

# 포맷팅
npm run format
```

---

## 📚 프로젝트 구조

```
gachivalue-landing/
├── src/
│   ├── app/                # Next.js 라우트 및 페이지
│   ├── components/         # React 컴포넌트
│   ├── lib/               # 유틸리티 및 헬퍼 함수
│   ├── hooks/             # 커스텀 React 훅
│   ├── types/             # TypeScript 타입 정의
│   └── styles/            # 글로벌 스타일
├── public/                # 정적 자산 (이미지, 폰트)
├── tests/                 # 테스트 파일
├── .github/workflows/     # GitHub Actions
├── scripts/               # 자동화 스크립트
├── docs/                  # 문서
└── package.json           # 프로젝트 설정
```

자세한 구조는 [DIR.md](./DIR.md)를 참고하세요.

---

## 🚀 배포

### Vercel (권장)

#### 초기 배포

1. **GitHub 연결**
   ```bash
   # GitHub에 푸시
   git push origin main
   ```

2. **Vercel 프로젝트 생성**
   - https://vercel.com/new 방문
   - GitHub 리포지토리 선택
   - 환경 변수 설정 (위 참고)
   - Deploy 클릭

3. **배포 완료**
   - 자동으로 배포됨
   - URL: `https://gachivalue.vercel.app`

#### 지속적 배포

```bash
# develop 브랜치에 커밋 → Staging 배포
git push origin develop

# main 브랜치에 커밋 → Production 배포
git push origin main
```

### 환경별 배포

| 환경 | 브랜치 | URL | 설정 |
|------|--------|-----|------|
| 개발 | `develop` | Preview | `NODE_ENV=development` |
| 스테이징 | `staging` | `staging-*.vercel.app` | `NODE_ENV=staging` |
| 프로덕션 | `main` | `gachivalue.vercel.app` | `NODE_ENV=production` |

---

## 📖 문서

- **[PRD (Product Requirements Document)](./docs/AI_Assistive_Device_Matching_Landing_Page_PRD.md)** - 완전한 제품 명세 (v5.0)
- **[TODO (작업 목록)](./docs/TODO.md)** - 개발 단계별 작업 항목
- **[Mermaid (다이어그램)](./docs/Mermaid.md)** - 아키텍처 및 플로우 다이어그램
- **[DIR (디렉토리)](./docs/DIR.md)** - 프로젝트 폴더 구조
- **[ACCESSIBILITY_GUIDE](./docs/ACCESSIBILITY_GUIDE.md)** - 접근성 가이드

---

## 🧪 테스트

### 단위 테스트

```bash
# 테스트 실행
npm run test

# Watch 모드
npm run test:watch

# 커버리지 리포트
npm run test:coverage
```

### E2E 테스트

```bash
# Playwright 테스트 실행
npm run test:e2e

# UI 모드
npm run test:e2e:ui

# Debug 모드
npm run test:e2e:debug
```

### 성능 테스트

```bash
# Lighthouse 검사
npm run lighthouse

# 성능 점수 90 이상 필요
```

---

## 💻 개발 가이드

### Cursor IDE 사용

1. **프로젝트 열기**
   ```bash
   cursor .
   ```

2. **AI 어시스턴트 활용**
   - `Ctrl/Cmd + K`: 채팅 열기
   - `@workspace`: 전체 컨텍스트 포함
   - `@file`: 현재 파일 컨텍스트 포함

3. **추천 프롬프트**
   ```
   "src/components/sections/HeroSection.tsx를 만들어줘. 
   PRD의 Hero Section 요구사항을 모두 포함하고, 
   A/B 테스트 지원 및 접근성을 고려해."
   ```

### Git 워크플로우

```bash
# 1. 새 기능 브랜치 생성
git checkout -b feature/hero-animation

# 2. 변경사항 커밋
git commit -m "feat(hero): Add scroll animation to hero section"

# 3. 푸시
git push origin feature/hero-animation

# 4. GitHub에서 PR 생성
# → Code Review → Merge

# 5. PR 머지 후 로컬 동기화
git checkout develop
git pull origin develop
```

### 커밋 메시지 컨벤션

```
[Type]: [Scope] - [Description]

Type: feat, fix, docs, style, refactor, perf, test, chore
Scope: hero, demo, auth, api, db, infra

예시:
feat(demo): Add AI matching algorithm
fix(hero): Fix mobile responsive layout
docs(api): Update endpoint documentation
```

---

## 🔒 보안

### 환경 변수 보호

- `.env.local`은 `.gitignore`에 포함됨
- 절대 `.env.local`을 커밋하지 마세요
- Vercel 대시보드에서 환경 변수 관리

### 보안 검사

```bash
# 의존성 감시
npm audit

# 취약점 수정
npm audit fix

# 정적 분석
npm run lint

# 보안 정책
# → CONTRIBUTING.md 참고
```

---

## 📊 모니터링

### 에러 추적 (Sentry)

- https://sentry.io/organizations/your-org
- 실시간 에러 알림
- 성능 모니터링

### 분석 (Google Analytics 4)

- https://analytics.google.com
- 사용자 행동 분석
- 전환율 추적

### 성능 (Vercel Analytics)

- Vercel 대시보드에서 확인
- Core Web Vitals
- 배포 이력

---

## 🆘 문제 해결

### 일반적인 문제

#### 1. `Cannot find module '@supabase/supabase-js'`

```bash
# 의존성 재설치
npm install
npm run build
```

#### 2. Clerk 인증 작동 안 함

```bash
# .env.local 확인
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY 존재?
- CLERK_SECRET_KEY 존재?
- CLERK_WEBHOOK_SECRET 존재?

# 확인 후 개발 서버 재시작
npm run dev
```

#### 3. Supabase 연결 실패

```bash
# 연결 테스트
curl https://your-project.supabase.co/rest/v1/sessions \
  -H "apikey: your-anon-key"

# 성공하면 좋음, 실패하면:
# 1. 환경 변수 확인
# 2. Supabase 프로젝트 상태 확인
# 3. RLS 정책 확인
```

### 디버깅 팁

```bash
# 자세한 로그 출력
DEBUG=* npm run dev

# TypeScript 에러 확인
npm run type-check

# 린트 에러 확인
npm run lint

# 비동기 문제 디버깅
# → Chrome DevTools → Console 탭에서 에러 메시지 확인
```

---

## 🤝 기여

이 프로젝트에 기여하려면 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참고하세요.

### 기여 프로세스

1. **이슈 생성**: 버그 또는 기능 요청
2. **Fork & Branch**: 저장소 포크 및 기능 브랜치 생성
3. **구현**: 코드 작성 및 테스트
4. **PR 생성**: Pull Request 제출
5. **리뷰**: 코드 검토 및 피드백
6. **머지**: 승인 후 병합

---

## 📋 체크리스트

### 개발 시작 전
- [ ] Node.js 18+ 설치 확인
- [ ] Cursor IDE 설치
- [ ] GitHub 계정 준비
- [ ] Supabase 프로젝트 생성
- [ ] Clerk 프로젝트 생성

### 개발 중
- [ ] 자주 커밋 (작은 단위)
- [ ] 테스트 작성
- [ ] 코드 리뷰 요청
- [ ] 문서 업데이트

### 배포 전
- [ ] 모든 테스트 통과
- [ ] Lighthouse 점수 90+
- [ ] 보안 감시 완료
- [ ] 환경 변수 확인

---

## 📞 지원

### 문제 보고

GitHub Issues에서 버그를 보고하세요:
- https://github.com/your-org/gachivalue-landing/issues

### 기술 문의

- **Slack**: #dev-support 채널
- **Email**: dev@gachivalue.com

---

## 📄 라이선스

MIT License - [LICENSE](./LICENSE) 파일 참고

---

## 👥 팀

| 역할 | 이름 |
|------|------|
| PM | [이름] |
| Dev Lead | [이름] |
| Frontend | [이름] |
| Backend | [이름] |
| QA | [이름] |

---

## 🔗 링크

- **라이브 사이트**: https://gachivalue.vercel.app
- **GitHub**: https://github.com/your-org/gachivalue-landing
- **Supabase**: https://app.supabase.com
- **Vercel**: https://vercel.com/your-org
- **Clerk**: https://dashboard.clerk.com
- **Sentry**: https://sentry.io

---

## 🎯 향후 계획

### Phase 1 (2024년 12월)
- [x] 랜딩페이지 배포
- [ ] 초기 사용자 1,000명 확보

### Phase 2 (2025년 1월)
- [ ] 모바일 앱 출시 (iOS/Android)
- [ ] 커뮤니티 기능 추가

### Phase 3 (2025년 2월+)
- [ ] 고급 AI 모델 적용
- [ ] 국제 확장

---

**마지막 업데이트**: 2025년 1월  
**유지 보수자**: Dev Team  
**상태**: 🟢 Active Development (일반적인 랜딩페이지 구조 완료)

