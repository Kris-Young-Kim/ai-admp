# AI 보조기기 매칭 랜딩페이지 PRD v3.0
## Final Enterprise-Grade PRD with Tech Stack Integration

**프로젝트명**: 함께가치 - AI 보조기기 매칭 랜딩페이지  
**작성일**: 2025년 11월 14일  
**최종 버전**: 3.0 (최종 고도화)  
**기술 스택**: React + Next.js + Supabase + Clerk + Vercel  
**상태**: 개발 시작 준비 완료

---

## 0. 기술 스택 최종 확정

### 0.1 풀스택 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                   Vercel (배포/호스팅)                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌────────────────────────────────────┐                 │
│  │     Next.js 13+ (App Router)       │                 │
│  │  ┌──────────────────────────────┐  │                 │
│  │  │  React Components (Cursor)   │  │                 │
│  │  │  - Hero, Demo, Results, etc  │  │                 │
│  │  └──────────────────────────────┘  │                 │
│  │                                    │                 │
│  │  ┌──────────────────────────────┐  │                 │
│  │  │  Clerk Authentication        │  │ ──────┐         │
│  │  │  - Sign-up, Login, Profile   │  │       │         │
│  │  └──────────────────────────────┘  │       │         │
│  │                                    │       │         │
│  │  ┌──────────────────────────────┐  │       │         │
│  │  │  API Routes (/api/*)         │  │ ──────┼──┐      │
│  │  │  - /matching/recommend       │  │       │  │      │
│  │  │  - /feedback/submit          │  │       │  │      │
│  │  │  - /analytics/event          │  │       │  │      │
│  │  └──────────────────────────────┘  │       │  │      │
│  └────────────────────────────────────┘       │  │      │
│                                                │  │      │
│  ┌────────────────────────────────────┐       │  │      │
│  │  Environment Variables             │       │  │      │
│  │  - NEXT_PUBLIC_SUPABASE_URL        │       │  │      │
│  │  - NEXT_PUBLIC_SUPABASE_ANON_KEY   │       │  │      │
│  │  - CLERK_SECRET_KEY                │       │  │      │
│  │  - NEXT_PUBLIC_CLERK_PUBLISHABLE   │       │  │      │
│  │  - SENTRY_AUTH_TOKEN               │       │  │      │
│  └────────────────────────────────────┘       │  │      │
│                                                │  │      │
└─────────────────────────────────────────────────┼──┼─────┘
                                                  │  │
                                                  │  │
      ┌───────────────────────────────────────────┘  │
      │                                              │
      ▼                                              ▼
┌──────────────────────┐                  ┌──────────────────────┐
│  Supabase            │                  │  Clerk               │
│  ┌────────────────┐  │                  │  ┌────────────────┐  │
│  │  PostgreSQL    │  │                  │  │  User Database │  │
│  │  ┌──────────┐  │  │                  │  │  - Users       │  │
│  │  │ users    │  │  │                  │  │  - Sessions    │  │
│  │  │ sessions │  │  │                  │  │  - Metadata    │  │
│  │  │ matching │  │  │                  │  └────────────────┘  │
│  │  │ feedback │  │  │                  │                      │
│  │  │ events   │  │  │                  │  ┌────────────────┐  │
│  │  │ products │  │  │                  │  │  OAuth/SSO     │  │
│  │  │ experts  │  │  │                  │  │  - Google      │  │
│  │  │ subscr.  │  │  │                  │  │  - Kakao       │  │
│  │  │ products │  │  │                  │  │  - Apple       │  │
│  │  └──────────┘  │  │                  │  └────────────────┘  │
│  │                │  │                  │                      │
│  │  ┌──────────┐  │  │                  │  ┌────────────────┐  │
│  │  │ Storage  │  │  │                  │  │  Webhooks      │  │
│  │  │ (Images) │  │  │                  │  │  - User events │  │
│  │  └──────────┘  │  │                  │  │  - Auth events │  │
│  │                │  │                  │  └────────────────┘  │
│  │  ┌──────────┐  │  │                  └──────────────────────┘
│  │  │ Realtime │  │  │
│  │  │ (Socket) │  │  │
│  │  └──────────┘  │  │
│  │                │  │
│  │  ┌──────────┐  │  │
│  │  │ Edge     │  │  │
│  │  │Functions │  │  │
│  │  └──────────┘  │  │
│  └────────────────┘  │
│  - Row-level         │
│    Security (RLS)    │
│  - Real-time pub/sub │
└──────────────────────┘
        ▲
        │ API
        │
┌───────┴──────────────────────┐
│  3rd Party Services          │
├──────────────────────────────┤
│  - Sentry (Error Tracking)   │
│  - Google Analytics 4        │
│  - Stripe (구독 결제)          │
│  - SendGrid (이메일)          │
│  - LangChain (AI Matching)   │
└──────────────────────────────┘
```

### 0.2 Supabase 데이터베이스 스키마

```sql
-- 1. 사용자 세션 (Clerk과 연계)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  metadata JSONB DEFAULT '{}',
  -- metadata 예시: { "referral_code": "ABC123", "device": "mobile" }
  CONSTRAINT fk_clerk_integration UNIQUE(clerk_user_id)
);

-- 2. 매칭 결과 기록
CREATE TABLE matchings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  clerk_user_id TEXT,
  
  -- 입력 정보
  primary_body_part VARCHAR(50) NOT NULL,
  activities TEXT[] NOT NULL, -- 배열: ['household', 'work', ...]
  budget_min INTEGER NOT NULL,
  budget_max INTEGER NOT NULL,
  
  -- 결과
  recommendations JSONB NOT NULL, -- 상위 3개 상품 배열
  ai_processing_time_ms INTEGER,
  match_accuracy_score DECIMAL(3,1),
  
  -- 메타데이터
  device_type VARCHAR(20), -- 'mobile', 'tablet', 'desktop'
  os VARCHAR(50),
  created_at TIMESTAMP DEFAULT now(),
  
  INDEX idx_user_matchings (clerk_user_id),
  INDEX idx_created_at (created_at)
);

-- 3. 피드백 (추천 평가)
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matching_id UUID NOT NULL REFERENCES matchings(id) ON DELETE CASCADE,
  product_id VARCHAR(100) NOT NULL,
  
  useful BOOLEAN NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  created_at TIMESTAMP DEFAULT now(),
  
  INDEX idx_product_feedback (product_id)
);

-- 4. 이벤트 분석 (GA 동기화)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  event_name VARCHAR(100) NOT NULL,
  
  event_data JSONB,
  -- 예시: { "cta_location": "hero", "element_id": "btn_1" }
  
  user_agent TEXT,
  ip_address INET,
  
  created_at TIMESTAMP DEFAULT now(),
  
  INDEX idx_event_name (event_name),
  INDEX idx_created_at (created_at)
);

-- 5. 보조기기 제품 DB (주기적 동기화)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  
  price_range_min INTEGER,
  price_range_max INTEGER,
  
  body_parts TEXT[] NOT NULL,
  suitable_activities TEXT[] NOT NULL,
  
  image_url TEXT,
  average_rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  
  ai_tags JSONB, -- NLP 분석 결과
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  INDEX idx_category (category),
  INDEX idx_body_parts USING GIN (body_parts)
);

-- 6. 구독 정보 (Stripe 연계)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL UNIQUE,
  
  plan VARCHAR(50), -- 'free', 'monthly', 'annual'
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  
  started_at TIMESTAMP DEFAULT now(),
  renewal_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  
  is_active BOOLEAN DEFAULT true,
  
  metadata JSONB DEFAULT '{}',
  
  INDEX idx_clerk_user (clerk_user_id)
);

-- 7. 전문가 프로필
CREATE TABLE experts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  
  name VARCHAR(100) NOT NULL,
  specialties TEXT[] NOT NULL, -- ['upper_limb', 'elderly', ...]
  experience_years INTEGER,
  bio TEXT,
  profile_image_url TEXT,
  
  -- 연계
  verified BOOLEAN DEFAULT false,
  certification_number VARCHAR(100),
  
  availability_json JSONB, -- { "mon": "09:00-18:00", ... }
  
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  INDEX idx_verified (verified)
);

-- 8. RLS 정책 설정
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own session" ON sessions
  FOR SELECT USING (
    auth.uid()::text = clerk_user_id OR
    auth.uid()::text IN (
      SELECT clerk_user_id FROM sessions WHERE id = sessions.id
    )
  );

-- 인덱스 최적화
CREATE INDEX idx_matchings_user_date 
  ON matchings(clerk_user_id, created_at DESC);
CREATE INDEX idx_events_session_time
  ON events(session_id, created_at DESC);
```

### 0.3 Clerk 통합 전략

```typescript
// app/middleware.ts - 인증 미들웨어
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // 보호되지 않는 라우트 (공개)
  publicRoutes: ["/", "/api/public/*", "/pricing"],
  
  // Clerk이 자동으로 관리할 라우트
  ignoredRoutes: ["/api/webhooks/clerk"],
  
  // 로그인 필요 라우트
  afterAuth: async (auth, req, evt) => {
    // 인증 정보를 Supabase와 동기화
    if (auth.userId) {
      // Supabase에 사용자 세션 생성/업데이트
      const { data, error } = await supabase
        .from('sessions')
        .upsert({
          clerk_user_id: auth.userId,
          email: auth.user?.emailAddresses[0]?.emailAddress,
          updated_at: new Date().toISOString()
        });
    }
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/"],
};

// lib/clerk.ts - 클라이언트 헬퍼
export async function getCurrentUser() {
  const auth = await currentAuth();
  if (!auth?.userId) return null;
  
  return {
    id: auth.userId,
    email: auth.user?.emailAddresses[0]?.emailAddress,
    name: auth.user?.fullName,
    imageUrl: auth.user?.profileImageUrl,
  };
}
```

### 0.4 배포 및 환경 설정 (Vercel)

```yaml
# vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "functions": {
    "api/**": {
      "maxDuration": 30
    }
  },
  "env": [
    {
      "key": "NEXT_PUBLIC_SUPABASE_URL",
      "value": "@supabase_url"
    },
    {
      "key": "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "value": "@supabase_anon_key"
    },
    {
      "key": "SUPABASE_SERVICE_ROLE_KEY",
      "value": "@supabase_service_role_key"
    },
    {
      "key": "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
      "value": "@clerk_publishable_key"
    },
    {
      "key": "CLERK_SECRET_KEY",
      "value": "@clerk_secret_key"
    },
    {
      "key": "CLERK_WEBHOOK_SECRET",
      "value": "@clerk_webhook_secret"
    },
    {
      "key": "NEXT_PUBLIC_SENTRY_DSN",
      "value": "@sentry_dsn"
    }
  ]
}

# .env.local (로컬 개발)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SENTRY_DSN=https://...
DATABASE_URL=postgresql://...
```

---

## 1~7. [기존 PRD v2.0의 모든 내용 유지]

### 1. 사용자 페르소나 및 여정 분석 ✓
### 2. 상세 콘텐츠 및 카피라이팅 ✓
### 3. UI 컴포넌트 상세 명세 ✓
### 4. 마이크로 인터랙션 및 애니메이션 ✓
### 5. 데이터 모델 및 API 명세 ✓
### 6. 에러 상황 및 대응 프로토콜 ✓
### 7. 마이크로카피 및 메시지 가이드 ✓

---

## 8. 웹 접근성 (Web Accessibility) 요구사항

### 8.1 접근성 목표 및 기준

**목표**: WCAG 2.1 AA 레벨 준수 (AAA 레벨 일부 적용)

**적용 범위**:
- 모든 페이지 및 컴포넌트
- 모든 사용자 인터랙션
- 모든 미디어 콘텐츠
- 모든 폼 및 입력 필드

**준수 기준**:
- **인지 가능성 (Perceivable)**: 모든 정보와 UI 요소를 사용자가 인지할 수 있어야 함
- **운용 가능성 (Operable)**: 모든 기능이 키보드로 접근 가능해야 함
- **이해 가능성 (Understandable)**: 정보와 UI 조작이 이해 가능해야 함
- **견고성 (Robust)**: 보조 기술과 호환되어야 함

### 8.2 시각 장애인 지원 기능

#### 8.2.1 스크린 리더 최적화
- **ARIA 속성 완전 구현**
  - 모든 인터랙티브 요소에 `aria-label`, `aria-labelledby`, `aria-describedby` 적용
  - 랜드마크 역할 (`role="main"`, `role="navigation"` 등) 명확히 지정
  - 동적 콘텐츠 업데이트 시 `aria-live` 영역 활용
  - 폼 요소는 `FormLabel`과 `FormDescription`으로 완전히 연결

- **시맨틱 HTML 구조**
  - `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` 적절히 사용
  - 제목 계층 구조 (`<h1>` ~ `<h6>`) 논리적으로 구성
  - 목록은 `<ul>`, `<ol>`, `<dl>` 사용

- **스킵 링크 제공**
  - 페이지 상단에 "주 콘텐츠로 건너뛰기" 링크
  - 키보드 사용자가 반복되는 네비게이션을 건너뛸 수 있음

#### 8.2.2 TTS (Text-to-Speech) 기능
- **Web Speech API 통합**
  ```typescript
  // TTS 기능 구현 예시
  const speak = (text: string, lang: string = 'ko-KR') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.0; // 읽기 속도 조절 가능
    speechSynthesis.speak(utterance);
  };
  ```

- **주요 기능**:
  - 페이지 전체 읽기 (전체 콘텐츠를 순차적으로 읽음)
  - 선택한 텍스트 읽기 (사용자가 선택한 부분만 읽기)
  - 읽기 속도 조절 (0.5x ~ 2.0x)
  - 음성 선택 (한국어, 영어)
  - 일시정지/재개/중지 컨트롤
  - 현재 읽는 위치 하이라이트

- **스크린 리더와의 호환성**
  - TTS 기능이 스크린 리더와 충돌하지 않도록 설계
  - 사용자가 선택적으로 활성화/비활성화 가능

#### 8.2.3 OCR (Optical Character Recognition) 기능
- **이미지 텍스트 추출**
  - Tesseract.js 또는 Google Vision API 통합
  - 사용자가 이미지를 업로드하면 텍스트 자동 추출
  - 추출된 텍스트를 TTS로 읽기
  - 이미지 `alt` 속성 자동 생성 지원

- **사용 시나리오**:
  - 사용자가 이미지로 된 문서를 업로드
  - OCR로 텍스트 추출
  - TTS로 음성으로 읽기
  - 스크린 리더 사용자도 이미지 내용 이해 가능

#### 8.2.4 화면 확대/축소 기능
- **플로팅 버튼 UI**
  - 화면 우측 하단에 접근성 도구 모음 버튼
  - 클릭 시 확대/축소, 고대비, 폰트 크기 조절 등 옵션 표시

- **화면 확대/축소**
  - 50% ~ 200% 범위에서 조절 가능
  - CSS `transform: scale()` 또는 `zoom` 속성 활용
  - 레이아웃 깨짐 방지 (반응형 디자인 유지)

- **고대비 모드**
  - 색상 대비를 극대화한 테마
  - WCAG AAA 레벨 대비 (7:1) 제공
  - 배경/텍스트 색상 반전 옵션

- **폰트 크기 조절**
  - 작게 / 보통 / 크게 / 아주크게 (4단계)
  - `rem` 단위 사용으로 전체적으로 조절
  - 설정 저장 (localStorage)

### 8.3 청각 장애인 지원 기능

#### 8.3.1 자막 지원
- **동영상 자막**
  - 모든 동영상 콘텐츠에 자막 제공
  - WebVTT 형식 자막 파일
  - 자막 위치/크기/색상 조절 가능
  - 자막 배경 투명도 조절

- **실시간 자막 (선택사항)**
  - Web Speech API의 Speech Recognition 활용
  - 실시간 오디오를 텍스트로 변환
  - 주로 라이브 스트리밍이나 화상 회의에 활용

#### 8.3.2 수어 지원 (필요 시)
- **수어 동영상 링크**
  - 중요한 정보는 수어 동영상 링크 제공
  - 별도 페이지에서 수어 동영상 재생

### 8.4 지체 장애인 지원 기능

#### 8.4.1 키보드 네비게이션
- **완전한 키보드 접근**
  - 모든 기능이 마우스 없이 키보드로만 사용 가능
  - Tab 키로 포커스 이동
  - Enter/Space로 활성화
  - Esc로 모달/다이얼로그 닫기
  - 화살표 키로 메뉴/리스트 네비게이션

- **포커스 관리**
  - 포커스 인디케이터 명확히 표시 (최소 2px 두께)
  - 포커스 트랩 (모달 열릴 때 배경 요소로 포커스 이동 방지)
  - 논리적인 Tab 순서

- **키보드 단축키**
  - `Alt + A`: 접근성 도구 모음 열기
  - `Alt + T`: TTS 시작/중지
  - `Alt + K`: 키보드 스캔 모드 토글
  - `Alt + H`: 고대비 모드 토글
  - 모든 단축키는 사용자에게 알림

#### 8.4.2 키보드 스캔 모드
- **스캔 모드 기능**
  - 지체 장애인이 최소한의 입력으로 웹사이트 탐색 가능
  - 자동 스캔: 시간 간격(예: 2초)마다 포커스 자동 이동
  - 수동 스캔: 스페이스바 또는 엔터로 다음 요소로 이동

- **시각적 피드백**
  - 현재 스캔 중인 요소 강조 표시
  - 스캔 순서 시각화 (번호 표시)
  - 포커스 하이라이트 강화

- **스캔 범위 설정**
  - 전체 페이지 스캔
  - 특정 섹션만 스캔
  - 인터랙티브 요소만 스캔

### 8.5 인지 장애인 지원 기능

#### 8.5.1 명확한 레이블 및 지시사항
- **폼 레이블**
  - 모든 입력 필드에 명확한 라벨
  - 필수 항목 별표(*) 표시
  - 입력 힌트 및 도움말 제공
  - 에러 메시지 명확하고 구체적으로 표시

#### 8.5.2 단순화된 인터페이스
- **애니메이션 비활성화 옵션**
  - 사용자가 애니메이션을 끌 수 있음
  - `prefers-reduced-motion` 미디어 쿼리 지원
  - CSS `@media (prefers-reduced-motion: reduce)` 적용

- **줄 간격 조절**
  - 텍스트 가독성 향상을 위한 줄 간격 조절
  - 1.2 / 1.5 / 2.0 배율 선택

### 8.6 기술 구현

#### 8.6.1 React Aria 통합
- **패키지 설치**
  ```bash
  pnpm add @react-aria/components @react-aria/interactions
  ```

- **컴포넌트 마이그레이션**
  - 기존 컴포넌트를 React Aria 기반으로 점진적 마이그레이션
  - 키보드 네비게이션 자동 지원
  - 포커스 관리 자동화
  - 스크린 리더 최적화

#### 8.6.2 접근성 도구 모음 컴포넌트
```typescript
// components/accessibility/AccessibilityToolbar.tsx
interface AccessibilitySettings {
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  zoom: number; // 50 ~ 200
  highContrast: boolean;
  animationsDisabled: boolean;
  lineHeight: number;
  ttsEnabled: boolean;
  scanMode: boolean;
}

export function AccessibilityToolbar() {
  // 플로팅 버튼 UI
  // 설정 패널
  // localStorage 저장
}
```

#### 8.6.3 TTS 컴포넌트
```typescript
// components/accessibility/TextToSpeech.tsx
export function TextToSpeech() {
  const [isReading, setIsReading] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [lang, setLang] = useState('ko-KR');
  
  const speak = (text: string) => {
    // Web Speech API 구현
  };
  
  // 컨트롤 UI (재생/일시정지/중지)
}
```

#### 8.6.4 키보드 스캔 모드 컴포넌트
```typescript
// components/accessibility/KeyboardScanMode.tsx
export function KeyboardScanMode() {
  const [isActive, setIsActive] = useState(false);
  const [scanInterval, setScanInterval] = useState(2000);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 자동/수동 스캔 로직
  // 포커스 이동
  // 시각적 하이라이트
}
```

### 8.7 테스트 및 검증

#### 8.7.1 자동화 테스트
- **axe DevTools**
  - 빌드 파이프라인에 axe-core 통합
  - 접근성 위반 자동 감지

- **Lighthouse 접근성 점수**
  - 목표: 95점 이상
  - CI/CD 파이프라인에 통합

#### 8.7.2 수동 테스트
- **스크린 리더 테스트**
  - NVDA (Windows)
  - JAWS (Windows)
  - VoiceOver (macOS/iOS)
  - TalkBack (Android)

- **키보드 네비게이션 테스트**
  - 모든 기능 키보드만으로 사용 가능한지 확인
  - Tab 순서 논리적인지 확인
  - 포커스 인디케이터 명확한지 확인

- **실제 사용자 테스트**
  - 장애인 사용자 그룹과 협력
  - 피드백 수집 및 개선

### 8.8 문서화

#### 8.8.1 접근성 정책 문서
- 웹사이트 접근성 정책 명시
- WCAG 2.1 AA 준수 선언
- 접근성 기능 사용 가이드

#### 8.8.2 키보드 단축키 가이드
- 모든 키보드 단축키 목록
- 사용 방법 설명
- 접근성 도구 모음 사용법

---

---

## 11. Cursor IDE 개발 워크플로우 (최신)

### 11.1 Cursor 설정 파일

```yaml
# .cursor/settings.json
{
  "codebase_path": "./",
  "ai_provider": "gpt-4",
  "temperature": 0.7,
  "max_tokens": 2000,
  
  "context_rules": [
    {
      "pattern": "**/*.tsx",
      "context_include": [
        "// @cursor: Component",
        "interface Props",
        "export default"
      ]
    },
    {
      "pattern": "**/*.ts",
      "context_include": [
        "// @cursor: Utility",
        "export function",
        "export const"
      ]
    },
    {
      "pattern": "**/*.sql",
      "context_include": [
        "CREATE TABLE",
        "CREATE INDEX"
      ]
    }
  ],
  
  "custom_instructions": {
    "react_components": "Use React 18+ hooks. Implement proper error boundaries. Add accessibility attributes (aria-*, role). Use TypeScript strict mode.",
    "styling": "Use Tailwind CSS v3+. Follow BEM naming for utility combinations. Ensure WCAG AA color contrast.",
    "database": "Use Supabase client. Implement RLS policies. Add proper indexes. Use transactions for multi-step operations."
  }
}

# .cursor/rules.md - Cursor AI 규칙
# Development Rules for Cursor AI

## Code Generation
- Always use TypeScript with strict mode
- Implement error handling with try-catch
- Add JSDoc comments for complex functions
- Use async/await instead of promises

## React Components
- Functional components with hooks only
- Prop validation with TypeScript interfaces
- Accessibility: ARIA labels, semantic HTML
- Performance: useMemo, useCallback for optimization

## Database Queries
- Use parameterized queries (prevent SQL injection)
- Implement connection pooling
- Add logging for slow queries (> 1s)
- Use transactions for consistency

## Testing
- Write unit tests for utilities
- E2E tests for critical user flows
- Mock external API calls
- Achieve 80%+ code coverage

## Deployment
- Run security audit before deploy
- Check performance metrics (Lighthouse 90+)
- Verify error tracking (Sentry)
- Update analytics
```

### 11.2 Cursor 프롬프트 템플릿

```
## [Component Name] 컴포넌트 개발

### 요구사항
- [ ] Props 인터페이스 정의
- [ ] 접근성 구현 (a11y)
- [ ] 에러 상태 처리
- [ ] 로딩 상태 표시
- [ ] 모바일 반응형

### 기술 스택
- React 18+
- TypeScript strict
- Tailwind CSS v3+
- Framer Motion (애니메이션)
- @supabase/supabase-js

### 구현 가이드
1. Props 타입 정의 (TypeScript)
2. 상태 초기화 (hooks)
3. 부작용 처리 (useEffect)
4. 렌더링 로직
5. 에러/로딩 상태
6. 접근성 속성 추가

### 테스트 항목
- [ ] Props 검증
- [ ] 이벤트 핸들러
- [ ] 조건부 렌더링
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 호환성
```

---

## 12. Git & GitHub 워크플로우

### 12.1 Git 커밋 메시지 컨벤션

```
# Conventional Commits 사용

[Type]: [Scope] - [Description]

Type:
- feat: 새 기능
- fix: 버그 수정
- docs: 문서
- style: 포맷팅 (코드 변경 없음)
- refactor: 코드 구조 개선
- perf: 성능 최적화
- test: 테스트 추가/수정
- chore: 빌드, 의존성 등

Scope:
- hero: Hero 섹션
- demo: AI 데모 도구
- auth: 인증 관련
- api: API 엔드포인트
- db: 데이터베이스
- infra: 인프라/배포

Example:
feat(demo): Add real-time AI matching preview
- Implement Supabase realtime subscription
- Add loading animation (200ms ease-out)
- Create TypeScript types for recommendations

Resolves #123
```

### 12.1 Git 브랜치 전략

```
main (프로덕션)
├─ hotfix/[이슈명] (긴급 수정)
└─ develop (통합 개발)
   ├─ feature/[기능명] (기능 개발)
   ├─ fix/[이슈명] (버그 수정)
   ├─ refactor/[부분] (리팩토링)
   └─ docs/[문서명] (문서)

브랜치 생성 예시:
git checkout -b feature/hero-section-animation
git checkout -b fix/demo-form-validation
git checkout -b refactor/component-optimization

PR 프로세스:
1. feature 브랜치 생성
2. 커밋 & 푸시
3. GitHub PR 생성 (develop 대상)
4. 코드 리뷰 (최소 1명)
5. 머지 (rebase or squash)
6. 자동 배포 (develop → staging)

배포 프로세스:
1. 주간 금요일 develop → main 머지
2. main 배포 트리거 (Vercel)
3. 프로덕션 배포 완료 알림
4. 모니터링 & 롤백 대기 (24시간)
```

---

## 13. 배포 파이프라인 (Vercel + GitHub)

### 13.1 자동 배포 설정

```yaml
# GitHub Actions Workflow (.github/workflows/deploy.yml)
name: Deploy to Vercel

on:
  push:
    branches:
      - develop  # staging 배포
      - main     # production 배포
  pull_request:
    branches:
      - develop
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run linting
        run: npm run lint
      
      - name: Security audit
        run: npm audit --audit-level=moderate
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'preview' }}
      
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          uploadArtifacts: true
          configPath: './lighthouse-config.json'
      
      - name: Slack notification
        if: always()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "Deploy ${{ job.status }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Deploy to ${{ github.ref_name }}*\nStatus: ${{ job.status }}\nAuthor: ${{ github.actor }}"
                  }
                }
              ]
            }

  # 성능 모니터링
  performance-check:
    needs: deploy
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Check Lighthouse scores
        run: |
          # 최소 점수 확인
          if [ "$LIGHTHOUSE_SCORE" -lt 85 ]; then
            echo "Performance score too low"
            exit 1
          fi
      
      - name: Check error rate (Sentry)
        run: |
          curl -H "Authorization: Bearer ${{ secrets.SENTRY_TOKEN }}" \
               https://sentry.io/api/0/projects/org/project/stats/ \
               | jq '.[] | select(.stat=="total") | .value'
```

### 13.2 배포 전 체크리스트

```yaml
# scripts/pre-deploy-check.sh
#!/bin/bash

echo "🔍 Pre-deployment checks..."

# 1. 테스트 실행
echo "Running tests..."
npm run test -- --coverage
if [ $? -ne 0 ]; then
  echo "❌ Tests failed"
  exit 1
fi

# 2. Lint 확인
echo "Running linter..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint errors found"
  exit 1
fi

# 3. 빌드 확인
echo "Building project..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

# 4. 보안 감사
echo "Running security audit..."
npm audit --production
if [ $? -gt 0 ]; then
  echo "⚠️  Security vulnerabilities found"
fi

# 5. Lighthouse 검사
echo "Running Lighthouse..."
npm run lighthouse
if [ $? -ne 0 ]; then
  echo "⚠️  Performance score low"
fi

# 6. 타입 체크
echo "Checking TypeScript..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found"
  exit 1
fi

echo "✅ All pre-deployment checks passed!"
```

---

## 14. 모니터링 및 롤백 전략

### 14.1 배포 후 모니터링

```typescript
// lib/monitoring.ts
import * as Sentry from "@sentry/nextjs";
import { createClient } from '@supabase/supabase-js';

export async function monitorDeployment() {
  // 1. 에러 율 확인 (Sentry)
  const errors = await Sentry.captureLastEventId();
  
  // 2. 성능 메트릭 (Core Web Vitals)
  const vitals = {
    lcp: performance.getEntriesByName('largest-contentful-paint'),
    fid: performance.getEntriesByName('first-input'),
    cls: 0, // Cumulative Layout Shift
  };
  
  // 3. 데이터베이스 상태
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data, error } = await supabase
    .from('_health')
    .select('status')
    .single();
  
  // 4. API 엔드포인트 상태
  const apiStatus = await fetch('/api/health').then(r => r.json());
  
  // 5. 결과 리포트
  return {
    timestamp: new Date().toISOString(),
    errors: errors?.length || 0,
    vitals,
    database: data?.status === 'ok',
    api: apiStatus.ok,
    allHealthy: errors?.length === 0 && apiStatus.ok,
  };
}

// 자동 롤백 함수
export async function autoRollback() {
  const status = await monitorDeployment();
  
  if (!status.allHealthy) {
    console.error('❌ Deployment health check failed');
    console.log('🔄 Initiating rollback...');
    
    // Vercel API로 이전 버전으로 롤백
    await fetch('https://api.vercel.com/v13/deployments/rollback', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: process.env.VERCEL_PROJECT_ID,
      }),
    });
    
    console.log('✅ Rollback completed');
  }
}
```

---

## 최종 체크리스트

### 개발 시작 전
- [ ] Cursor IDE 설정 완료
- [ ] GitHub 리포지토리 생성 및 README 작성
- [ ] Supabase 프로젝트 생성 및 RLS 정책 설정
- [ ] Clerk 애플리케이션 생성 및 Webhook 설정
- [ ] Vercel 프로젝트 연결 및 환경 변수 설정
- [ ] Sentry 프로젝트 생성 및 DSN 설정
- [ ] GitHub Actions 워크플로우 테스트

### 개발 중 (주간)
- [ ] PRD 요구사항 충족 확인
- [ ] 코드 리뷰 (팀 또는 AI 조수)
- [ ] 테스트 작성 (최소 80% 커버리지)
- [ ] Lighthouse 점수 모니터링 (90 이상)
- [ ] 접근성 검사 (axe DevTools)

### 배포 전
- [ ] 모든 테스트 통과 확인
- [ ] 보안 감사 실행
- [ ] 성능 최적화 확인
- [ ] 데이터베이스 마이그레이션 테스트
- [ ] 배포 롤백 계획 확인

### 배포 후
- [ ] 모니터링 대시보드 확인
- [ ] 에러 추적 (Sentry) 확인
- [ ] 성능 메트릭 확인
- [ ] 사용자 피드백 수집
- [ ] 롤백 준비 (24시간)

---

**최종 PRD 버전**: 3.0 (프로덕션 레디)  
**기술 스택 확정**: React + Next.js 13+ + TypeScript + Supabase + Clerk + Vercel  
**개발 도구**: Cursor IDE + GitHub + Git  
**배포 전략**: GitHub Actions → Vercel (자동)  
**모니터링**: Sentry + Google Analytics 4 + Lighthouse  
**다음 단계**: TODO.md 작성 및 개발 시작

