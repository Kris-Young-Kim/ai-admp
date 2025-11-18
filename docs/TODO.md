# TODO.md - 개발 작업 로드맵

> 일반적인 랜딩페이지 구조 개발 체크리스트

---

## ✅ 완료된 작업

### 프로젝트 초기화

- [x] GitHub 리포지토리 생성 및 연결
- [x] Supabase 프로젝트 생성 및 설정
- [x] Clerk 인증 설정
- [x] Vercel 배포 설정
- [x] 개발 환경 설정 (Node.js, pnpm, Cursor IDE)

### 프로젝트 구조

- [x] Next.js 15.5.6 + React 19 설정
- [x] TypeScript 설정
- [x] Tailwind CSS v4 설정
- [x] 기본 디렉토리 구조 생성

### 기본 UI 컴포넌트

- [x] Button, Input, Card, Form 컴포넌트 (shadcn/ui)
- [x] Accordion 컴포넌트 (FAQ 섹션용)
- [x] FormGroup, Slider 컴포넌트
- [x] 접근성 컴포넌트 (AccessibilityToolbar, TTS 등)

### 랜딩페이지 구현

- [x] Hero 섹션 컴포넌트
- [x] 문제 공감 섹션 컴포넌트 (ProblemSection)
- [x] 해결책 섹션 컴포넌트 (SolutionSection)
- [x] 기능/특징 섹션 컴포넌트 (FeaturesSection)
- [x] 작동 방식 섹션 컴포넌트 (HowItWorksSection)
- [x] 사용자 후기 섹션 컴포넌트 (TestimonialsSection)
- [x] FAQ 섹션 컴포넌트 (FAQSection)
- [x] Lead Form 컴포넌트 (이름, 이메일, 연락처)
- [x] 반응형 레이아웃
- [x] 스크롤 애니메이션 (Intersection Observer)

### 백엔드 구현

- [x] Supabase 클라이언트 설정 (clerk-client, server, service-role)
- [x] `leads` 테이블 마이그레이션
- [x] Server Actions 구현
  - [x] `actions/submit-lead.ts` - 정보 수집 저장
  - [x] `actions/matching.ts` - 쿠팡 상품 추천 (모의 데이터)
- [x] API Routes (최소한만)
  - [x] `/api/health` - 헬스체크
  - [x] `/api/sync-user` - 사용자 동기화
  - [x] `/api/webhooks/clerk` - Clerk 웹훅

### 인증 및 권한

- [x] Clerk 미들웨어 설정
- [x] 사용자 동기화 로직 (SyncUserProvider)
- [x] ClerkProvider 설정

### 접근성

- [x] AccessibilityToolbar 컴포넌트
- [x] TTS (Text-to-Speech) 기능
- [x] 키보드 스캔 모드
- [x] ARIA 속성 및 시맨틱 HTML
- [x] React Aria 통합 (Button, Input)

### 분석 및 추적

- [x] Google Tag Manager (GTM) 설치 및 설정
  - [x] GTM 스크립트 설치 (GTM-KXLFQX2R)
  - [x] GTM 이벤트 추적 유틸리티 생성 (`lib/analytics/gtm.ts`)
  - [x] 페이지뷰 자동 추적 (`PageViewTracker` 컴포넌트)
  - [x] 폼 제출 이벤트 추적 (성공/실패)
  - [x] CTA 클릭 이벤트 추적 (Hero, Solution 섹션)
  - [x] 섹션 스크롤 이벤트 추적
- [x] Google Analytics 4 (gtag.js) 설치 및 설정
  - [x] GA4 스크립트 설치 (G-V280YE71BV)
  - [x] GA4 이벤트 추적 유틸리티 통합 (`lib/analytics/ga4.ts`)
  - [x] GTM + GA4 이중 추적 시스템 구축
  - [x] 모든 주요 이벤트에 GTM/GA4 동시 전송

---

## 🔄 진행 중 / 향후 작업

### 개선 사항

- [ ] 쿠팡 API 실제 연동 (현재 모의 데이터)
- [ ] 에러 처리 강화
- [ ] 성능 최적화 (이미지 최적화, 코드 분할)
- [ ] 접근성 검증 (스크린 리더 테스트)

### 배포 준비

- [ ] Lighthouse 점수 확인 (목표: 90+)
- [ ] 보안 감사 실행
- [ ] 프로덕션 환경 변수 확인
- [x] 모니터링 설정 (Sentry, GA4, GTM)

### 선택사항

- [ ] A/B 테스트 (Hero 섹션 헤드라인 변형) - Hero 섹션에 이미 3개 변형 구현됨
- [ ] 추가 섹션 컴포넌트 (필요 시)

---

## 📊 프로젝트 현황

**완료율**: 약 97%

**핵심 기능** (모두 완료):

- ✅ Hero 섹션 (3개 A/B 테스트 변형 포함)
- ✅ 문제 공감 섹션 (3개 문제 카드)
- ✅ 해결책 섹션 (4개 장점 리스트)
- ✅ 기능/특징 섹션 (4개 기능 카드)
- ✅ 작동 방식 섹션 (4단계 프로세스)
- ✅ 사용자 후기 섹션 (3개 후기 카드)
- ✅ FAQ 섹션 (6개 FAQ, 아코디언 형태)
- ✅ 정보 수집 폼 (이름, 이메일, 연락처)
- ✅ Server Actions (submitLead, getCoupangRecommendations)
- ✅ Clerk 인증 (SyncUserProvider 포함)
- ✅ 접근성 기능 (AccessibilityToolbar, TTS, 키보드 스캔 모드)
- ✅ 반응형 레이아웃 (모바일, 태블릿, 데스크톱)
- ✅ 스크롤 애니메이션 (Intersection Observer)
- ✅ 분석 및 추적 도구 (GTM, GA4 이중 추적 시스템)

**다음 우선순위**:

1. 쿠팡 API 실제 연동 (현재 모의 데이터)
2. 성능 최적화 및 Lighthouse 점수 확인
3. 배포 준비 (환경 변수, 보안 감사)

---

**마지막 업데이트**: 2025년 1월  
**프로젝트 상태**: 일반적인 랜딩페이지 구조 (핵심 기능 완료, 분석 도구 설정 완료, 배포 준비 단계)

**최근 완료 사항**:

- ✅ 8개 섹션 모두 구현 완료
- ✅ 불필요한 테스트 페이지 및 복잡한 기능 제거
- ✅ PRD v5.0에 맞게 프로젝트 구조 정리 완료
- ✅ Google Tag Manager (GTM) 설치 및 이벤트 추적 설정 완료
- ✅ Google Analytics 4 (gtag.js) 설치 및 이벤트 추적 설정 완료
- ✅ GTM + GA4 이중 추적 시스템 구축 완료
- ✅ 주요 이벤트 추적 구현 (페이지뷰, 폼 제출, CTA 클릭, 섹션 스크롤)
