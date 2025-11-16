# TODO.md - 개발 작업 로드맵

> 단순화된 랜딩페이지 개발 체크리스트

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
- [x] FormGroup, Slider 컴포넌트
- [x] 접근성 컴포넌트 (AccessibilityToolbar, TTS 등)

### 랜딩페이지 구현

- [x] Hero 섹션 컴포넌트
- [x] Lead Form 컴포넌트 (이름, 이메일, 연락처)
- [x] 반응형 레이아웃

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
- [ ] 모니터링 설정 (Sentry, GA4)

### 선택사항

- [ ] 대시보드 페이지 개선
- [ ] 추가 섹션 컴포넌트 (필요 시)
- [ ] A/B 테스트 (필요 시)

---

## 📊 프로젝트 현황

**완료율**: 약 80%

**핵심 기능**:

- ✅ Hero 섹션
- ✅ 정보 수집 폼
- ✅ Server Actions
- ✅ Clerk 인증
- ✅ 접근성 기능

**다음 우선순위**:

1. 쿠팡 API 연동
2. 성능 최적화
3. 배포 준비

---

**마지막 업데이트**: 2025년 1월  
**프로젝트 상태**: 단순화된 랜딩페이지 (핵심 기능 완료)
