# AI 보조기기 매칭 랜딩페이지 PRD v4.0
## 단순화된 랜딩페이지

**프로젝트명**: 함께가치 - AI 보조기기 매칭 랜딩페이지  
**작성일**: 2025년 1월  
**버전**: 4.0 (단순화)  
**기술 스택**: Next.js 15 + React 19 + Supabase + Clerk + Vercel  
**상태**: 핵심 기능 완료

---

## 1. 프로젝트 개요

### 1.1 목표
사용자 정보를 수집하고 AI가 적합한 보조기기를 추천하는 단순한 랜딩페이지

### 1.2 핵심 기능
1. **Hero 섹션**: 메인 헤드라인과 CTA 버튼
2. **정보 수집 폼**: 이름, 이메일, 연락처 입력
3. **Server Actions**: 데이터 저장 및 상품 추천 (모의 데이터)
4. **인증**: Clerk를 통한 사용자 인증 (선택사항)
5. **접근성**: 웹 접근성 기능 (화면 확대, TTS 등)

---

## 2. 기술 스택

### 2.1 프론트엔드
- **Next.js 15.5.6** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **shadcn/ui** (UI 컴포넌트)

### 2.2 백엔드
- **Supabase** (PostgreSQL)
- **Clerk** (인증)
- **Server Actions** (데이터 처리)

### 2.3 배포
- **Vercel** (호스팅)

---

## 3. 데이터베이스 스키마

### 3.1 leads 테이블 (정보 수집)

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 인덱스
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
```

### 3.2 users 테이블 (Clerk 동기화)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 인덱스
CREATE UNIQUE INDEX idx_users_clerk_id ON users(clerk_user_id);
```

---

## 4. 페이지 구조

### 4.1 랜딩 페이지 (`/`)

```
┌─────────────────────────────┐
│      Hero 섹션                │
│  - 헤드라인                   │
│  - 서브카피                   │
│  - CTA 버튼                   │
└─────────────────────────────┘
┌─────────────────────────────┐
│      정보 수집 폼             │
│  - 이름 입력                  │
│  - 이메일 입력                │
│  - 연락처 입력                │
│  - 제출 버튼                  │
└─────────────────────────────┘
```

### 4.2 주요 컴포넌트

- `HeroSection`: Hero 섹션 컴포넌트
- `LeadForm`: 정보 수집 폼 컴포넌트
- `AccessibilityToolbar`: 접근성 도구 모음

---

## 5. Server Actions

### 5.1 submitLead

```typescript
// actions/submit-lead.ts
export async function submitLead(data: {
  name: string;
  email: string;
  phone: string;
}): Promise<{ success: boolean; error?: string }>
```

**기능**:
- 입력 데이터 검증 (Zod)
- Supabase `leads` 테이블에 저장
- 에러 처리

### 5.2 getCoupangRecommendations (선택사항)

```typescript
// actions/matching.ts
export async function getCoupangRecommendations(
  request: MatchingRequest
): Promise<MatchingResult>
```

**기능**:
- 쿠팡 상품 추천 (현재 모의 데이터)
- 추후 실제 API 연동 예정

---

## 6. 접근성 요구사항

### 6.1 WCAG 2.1 AA 준수
- ARIA 속성 완전 구현
- 키보드 네비게이션 지원
- 스크린 리더 최적화

### 6.2 접근성 기능
- **화면 확대/축소**: 50% ~ 200%
- **TTS (Text-to-Speech)**: 페이지 읽기
- **고대비 모드**: 색상 대비 향상
- **폰트 크기 조절**: 4단계
- **키보드 스캔 모드**: 지체장애인 지원

---

## 7. 배포 및 환경 설정

### 7.1 환경 변수

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# 선택사항
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
```

### 7.2 배포 프로세스
1. GitHub에 푸시
2. Vercel 자동 배포
3. 환경 변수 설정 확인

---

## 8. 향후 개선 사항

### 8.1 우선순위 높음
- [ ] 쿠팡 API 실제 연동
- [ ] 에러 처리 강화
- [ ] 성능 최적화

### 8.2 선택사항
- [ ] 추가 섹션 컴포넌트
- [ ] A/B 테스트
- [ ] 복잡한 분석 기능

---

## 9. 체크리스트

### 개발 완료
- [x] 프로젝트 초기화
- [x] Hero 섹션 구현
- [x] Lead Form 구현
- [x] Server Actions 구현
- [x] Clerk 인증 설정
- [x] 접근성 기능 구현

### 배포 준비
- [ ] Lighthouse 점수 확인 (목표: 90+)
- [ ] 보안 감사
- [ ] 프로덕션 환경 변수 확인

---

**최종 버전**: 4.0 (단순화)  
**프로젝트 상태**: 핵심 기능 완료, 배포 준비 중
