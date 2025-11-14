# Mermaid.md - 아키텍처 및 플로우 다이어그램

> Mermaid 다이어그램들입니다. VSCode 또는 GitHub에서 렌더링됩니다.

---

## 1. 시스템 아키텍처

```mermaid
graph TB
    User["👤 사용자<br/>Browser"]
    
    CDN["🌐 Vercel CDN<br/>정적 자산"]
    Next["⚡ Next.js<br/>API + SSR"]
    
    Clerk["🔐 Clerk<br/>인증"]
    Supabase["🗄️ Supabase<br/>PostgreSQL"]
    Analytics["📊 Analytics<br/>Sentry + GA4"]
    External["🔗 외부 서비스<br/>AI/LLM"]
    
    User -->|요청| CDN
    CDN -->|반환| User
    
    User -->|로그인| Clerk
    Clerk -->|인증| User
    
    User -->|API 요청| Next
    Next -->|인증 확인| Clerk
    Next -->|데이터 쿼리| Supabase
    Supabase -->|결과| Next
    
    Next -->|이벤트| Analytics
    Analytics -->|수집| Analytics
    
    Next -->|AI 요청| External
    External -->|결과| Next
    
    Next -->|렌더링| User
    
    style User fill:#e1f5ff
    style CDN fill:#fff3e0
    style Next fill:#c8e6c9
    style Clerk fill:#f3e5f5
    style Supabase fill:#ffe0b2
    style Analytics fill:#fce4ec
    style External fill:#e0f2f1
```

---

## 2. 데이터 흐름 (사용자 여정)

```mermaid
graph LR
    A["👤 사용자 방문"] --> B["🎯 Hero 섹션<br/>CTA 클릭"]
    
    B -->|인증 필요| C{"🔐 로그인<br/>여부"}
    
    C -->|미로그인| D["📝 회원가입<br/>Clerk"]
    C -->|로그인| E["🎮 데모 도구<br/>질문 3개"]
    
    D -->|✅ 가입 완료| E
    
    E --> F["🔄 데이터 제출<br/>API"]
    F --> G["🧠 AI 분석<br/>Supabase"]
    G --> H["📋 결과 표시<br/>상위 3개 상품"]
    
    H --> I{"👍 피드백<br/>제출"}
    I -->|Yes| J["💾 피드백 저장"]
    J --> K["📊 분석 기록"]
    
    I -->|No| K
    
    K --> L["💳 구독 제안<br/>요금제"]
    L --> M{"구독<br/>선택"}
    
    M -->|무료| N["✅ 무료 계정"]
    M -->|월간| O["💰 월간 구독<br/>Stripe"]
    M -->|연간| P["💰 연간 구독<br/>Stripe"]
    
    O --> Q["🎉 구독 완료"]
    P --> Q
    N --> Q
    
    Q --> R["🚀 대시보드<br/>접근"]
    
    style A fill:#e3f2fd
    style C fill:#fff9c4
    style D fill:#c8e6c9
    style E fill:#bbdefb
    style F fill:#ffe0b2
    style G fill:#f0f4c3
    style H fill:#c5cae9
    style I fill:#fff9c4
    style J fill:#c8e6c9
    style K fill:#b2dfdb
    style L fill:#ffccbc
    style Q fill:#a5d6a7
    style R fill:#81c784
```

---

## 3. 데이터베이스 ER 다이어그램

```mermaid
erDiagram
    SESSIONS ||--o{ MATCHINGS : has
    SESSIONS ||--o{ EVENTS : generates
    MATCHINGS ||--o{ FEEDBACK : receives
    MATCHINGS ||--o{ PRODUCTS : recommends
    SUBSCRIPTIONS ||--|| SESSIONS : links
    EXPERTS ||--o{ SESSIONS : assists
    
    SESSIONS {
        UUID id PK
        TEXT clerk_user_id UK
        TEXT email
        TIMESTAMP created_at
        JSONB metadata
    }
    
    MATCHINGS {
        UUID id PK
        UUID session_id FK
        VARCHAR primary_body_part
        TEXT[] activities
        INTEGER budget_min
        INTEGER budget_max
        JSONB recommendations
        INTEGER ai_processing_time_ms
        TIMESTAMP created_at
    }
    
    FEEDBACK {
        UUID id PK
        UUID matching_id FK
        VARCHAR product_id
        BOOLEAN useful
        INTEGER rating
        TEXT comment
        TIMESTAMP created_at
    }
    
    EVENTS {
        UUID id PK
        UUID session_id FK
        VARCHAR event_name
        JSONB event_data
        TIMESTAMP created_at
    }
    
    PRODUCTS {
        UUID id PK
        VARCHAR product_id UK
        VARCHAR name
        VARCHAR category
        INTEGER price_range_min
        VARCHAR[] body_parts
        TEXT[] suitable_activities
        TEXT image_url
        DECIMAL average_rating
    }
    
    SUBSCRIPTIONS {
        UUID id PK
        TEXT clerk_user_id UK
        VARCHAR plan
        TEXT stripe_customer_id
        BOOLEAN is_active
        TIMESTAMP renewal_at
    }
    
    EXPERTS {
        UUID id PK
        TEXT clerk_user_id UK
        VARCHAR name
        TEXT[] specialties
        INTEGER experience_years
        BOOLEAN verified
    }
```

---

## 4. API 호출 흐름

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Browser as 브라우저
    participant NextJS as Next.js API
    participant Supabase as Supabase
    participant Clerk as Clerk
    
    User->>Browser: 데모 도구 제출
    Browser->>NextJS: POST /api/matching/recommend
    
    NextJS->>Clerk: 토큰 검증
    Clerk-->>NextJS: ✅ 유효
    
    NextJS->>Supabase: 세션 조회
    Supabase-->>NextJS: 세션 데이터
    
    NextJS->>Supabase: 상품 데이터 쿼리<br/>(신체부위, 활동, 가격)
    Supabase-->>NextJS: 상품 배열
    
    NextJS->>NextJS: AI 매칭 알고리즘<br/>(점수 계산)
    
    NextJS->>Supabase: 매칭 결과 저장
    Supabase-->>NextJS: 저장 완료
    
    NextJS-->>Browser: JSON 응답<br/>(상위 3개 추천)
    Browser->>User: 결과 표시
    
    User->>Browser: 피드백 제출
    Browser->>NextJS: POST /api/feedback/submit
    
    NextJS->>Supabase: 피드백 저장
    Supabase-->>NextJS: 저장 완료
    
    NextJS-->>Browser: 성공 메시지
    Browser->>User: ✅ 완료
```

---

## 5. 인증 플로우 (Clerk)

```mermaid
graph TD
    A["👤 사용자 방문"] --> B{"로그인<br/>상태"}
    
    B -->|미로그인| C["📝 Sign-up 페이지"]
    B -->|로그인| D["✅ 인증됨"]
    
    C --> E["선택: OAuth 또는<br/>이메일"]
    E -->|Google| F["Google 로그인"]
    E -->|이메일| G["이메일 + 비밀번호"]
    
    F -->|redirect| H["Clerk Callback"]
    G -->|verify| H
    
    H -->|사용자 생성| I["Supabase<br/>sessions 테이블"]
    I -->|webhook| J["clerk.webhooks"]
    J -->|처리| K["사용자 프로필<br/>초기화"]
    
    K --> L["🎉 로그인 완료"]
    L --> D
    
    D --> M["🔐 보호된 리소스<br/>접근"]
    M -->|토큰 검증| N["API 요청"]
    N -->|✅ 유효| O["데이터 반환"]
    
    O -->|❌ 무효| P["401 Unauthorized"]
    P -->|redirect| C
    
    style C fill:#ffccbc
    style D fill:#c8e6c9
    style F fill:#b3e5fc
    style G fill:#b3e5fc
    style L fill:#a5d6a7
    style M fill:#fff9c4
    style O fill:#c8e6c9
    style P fill:#ffcdd2
```

---

## 6. 배포 파이프라인

```mermaid
graph LR
    A["💾 Git Commit<br/>feature branch"] --> B["📤 Push to GitHub"]
    
    B --> C["🔍 GitHub Actions<br/>Trigger"]
    
    C --> D["🏗️ Build"]
    D --> E["🧪 Tests"]
    E --> F["📊 Lint"]
    
    F -->|모두 통과| G["✅ PR Created"]
    F -->|실패| H["❌ Build Failed<br/>알림"]
    
    G --> I["👥 Code Review"]
    I -->|승인| J["Merge to develop"]
    I -->|변경요청| K["수정 & 재검토"]
    
    K --> J
    
    J --> L["🚀 Deploy to<br/>Staging (Vercel)"]
    L --> M["📝 Preview URL"]
    
    M --> N{"금요일<br/>배포}
    
    N -->|주간 배포| O["Merge to main"]
    N -->|긴급| O
    
    O --> P["🚀 Deploy to<br/>Production"]
    P --> Q["🔄 Auto Rollback<br/>if Failed"]
    
    Q -->|성공| R["✅ Live"]
    Q -->|실패| S["🔙 Rollback<br/>이전 버전"]
    
    R --> T["📊 Monitor<br/>Sentry + GA4"]
    
    style A fill:#bbdefb
    style B fill:#90caf9
    style C fill:#64b5f6
    style D fill:#42a5f5
    style E fill:#2196f3
    style F fill:#1e88e5
    style G fill:#c8e6c9
    style J fill:#a5d6a7
    style L fill:#fff9c4
    style P fill:#ffe0b2
    style R fill:#c8e6c9
    style S fill:#ffcdd2
    style T fill:#b2dfdb
```

---

## 7. 상태 관리 (Zustand)

```mermaid
graph TB
    subgraph "Global State"
        direction TB
        UI["UI Store<br/>- currentPage<br/>- modalOpen<br/>- scrollPos"]
        
        Form["Form Store<br/>- formData<br/>- formErrors<br/>- isSubmitting"]
        
        Matching["Matching Store<br/>- results<br/>- selectedProduct<br/>- loading"]
    end
    
    subgraph "Components"
        Hero["Hero Section"]
        Demo["Demo Tool"]
        Results["Results Page"]
        Checkout["Checkout"]
    end
    
    subgraph "Effects"
        API["API Calls"]
        Analytics["Analytics"]
        LocalStorage["LocalStorage"]
    end
    
    UI -->|subscribe| Hero
    UI -->|subscribe| Demo
    UI -->|subscribe| Results
    
    Form -->|subscribe| Demo
    Form -->|subscribe| Checkout
    
    Matching -->|subscribe| Results
    Matching -->|subscribe| Checkout
    
    Hero -->|dispatch| UI
    Demo -->|dispatch| Form
    Demo -->|dispatch| Matching
    Results -->|dispatch| Matching
    
    Matching -->|trigger| API
    Form -->|trigger| Analytics
    UI -->|persist| LocalStorage
    
    style UI fill:#b3e5fc
    style Form fill:#c5cae9
    style Matching fill:#bbdefb
    style API fill:#ffe0b2
    style Analytics fill:#c8e6c9
    style LocalStorage fill:#d1c4e9
```

---

## 8. 에러 처리 플로우

```mermaid
graph TD
    A["Error Occurs"] --> B{"Error Type"}
    
    B -->|Network| C["🌐 Network Error"]
    B -->|Validation| D["📝 Form Error"]
    B -->|Server 5xx| E["⚠️ Server Error"]
    B -->|Client 4xx| F["❌ Client Error"]
    
    C --> C1["Retry Logic<br/>3x exponential backoff"]
    C1 --> C2{"Success?"}
    C2 -->|Yes| C3["Continue"]
    C2 -->|No| C4["Show Error Message<br/>Support Link"]
    
    D --> D1["Highlight Invalid Fields<br/>Red Border"]
    D1 --> D2["Show Error Text<br/>Field-level"]
    D2 --> D3["User Corrects"]
    D3 --> D4["Resubmit"]
    
    E --> E1["Log to Sentry"]
    E1 --> E2["Show Modal"]
    E2 --> E3["Suggest Action<br/>Refresh/Support"]
    E3 --> E4["Users.choices"]
    
    F --> F1["Show Specific<br/>Error Message"]
    F1 --> F2["Redirect or<br/>Clear Form"]
    
    C3 --> Z["✅ Recovery"]
    D4 --> Z
    E4 --> Z
    F2 --> Z
    
    Z --> AA["Resume User Flow"]
    
    style A fill:#ffcdd2
    style C fill:#ffcdd2
    style D fill:#ffe0b2
    style E fill:#ffb74d
    style F fill:#ef9a9a
    style Z fill:#c8e6c9
    style AA fill:#a5d6a7
```

---

## 9. 성능 최적화 전략

```mermaid
graph LR
    A["사용자 요청"] --> B["🌐 CDN<br/>정적 자산"]
    
    B --> C["🖼️ 이미지"]
    B --> D["📄 CSS/JS<br/>번들"]
    
    C --> C1["WebP 변환"]
    C1 --> C2["Responsive<br/>Images"]
    C2 --> C3["Lazy Load"]
    
    D --> D1["Code Split<br/>Route-based"]
    D1 --> D2["Compression<br/>gzip/brotli"]
    D2 --> D3["Caching<br/>Service Worker"]
    
    C3 --> E["⚡ Fast LCP"]
    D3 --> E
    
    E --> F["🎨 Render"]
    F --> G["Paint"]
    G --> H["Composite"]
    
    H --> I["💨 Fast INP"]
    
    I --> J["🎯 Core Web Vitals"]
    J --> K["LCP: < 2.5s"]
    J --> L["FID: < 100ms"]
    J --> M["CLS: < 0.1"]
    
    K --> N["✅ Performance Score 90+"]
    L --> N
    M --> N
    
    style A fill:#b3e5fc
    style B fill:#90caf9
    style C fill:#fff9c4
    style D fill:#c8e6c9
    style E fill:#81c784
    style J fill:#4caf50
    style N fill:#2e7d32
```

---

## 10. 모니터링 및 알림

```mermaid
graph TB
    subgraph "Data Collection"
        direction TB
        Sentry["🔴 Sentry<br/>Errors & Exceptions"]
        GA4["📊 GA4<br/>User Behavior"]
        Metrics["📈 Core Web Vitals<br/>Performance"]
    end
    
    subgraph "Processing"
        direction TB
        Process["Aggregate &<br/>Analyze"]
    end
    
    subgraph "Alerting"
        direction TB
        Alert1["Error Rate > 5%<br/>🔴 CRITICAL"]
        Alert2["Conversion ↓ 30%<br/>🟡 HIGH"]
        Alert3["LCP > 4s<br/>🟡 MEDIUM"]
    end
    
    subgraph "Response"
        direction TB
        Resp1["15분 내 조사"]
        Resp2["1시간 내 분석"]
        Resp3["업무 시간 내"]
    end
    
    subgraph "Channels"
        direction TB
        Slack["💬 Slack"]
        Email["📧 Email"]
        Dashboard["📱 Dashboard"]
    end
    
    Sentry --> Process
    GA4 --> Process
    Metrics --> Process
    
    Process --> Alert1
    Process --> Alert2
    Process --> Alert3
    
    Alert1 --> Resp1
    Alert2 --> Resp2
    Alert3 --> Resp3
    
    Resp1 --> Slack
    Resp1 --> Dashboard
    
    Resp2 --> Slack
    Resp2 --> Email
    
    Resp3 --> Email
    
    style Sentry fill:#ffcdd2
    style GA4 fill:#c8e6c9
    style Metrics fill:#fff9c4
    style Alert1 fill:#ef5350
    style Alert2 fill:#ff9800
    style Alert3 fill:#fbc02d
    style Slack fill:#6c63ff
    style Email fill:#00bcd4
```

---

## 11. A/B 테스트 프로세스

```mermaid
graph LR
    A["💡 Idea<br/>Hero Headline"] --> B["📐 Design<br/>3 Variants"]
    
    B --> C["👥 Allocate<br/>Users"]
    C --> C1["Variant A: 33%"]
    C --> C2["Variant B: 33%"]
    C --> C3["Variant C: 34%"]
    
    C1 --> D["🔄 Test Period<br/>2 weeks"]
    C2 --> D
    C3 --> D
    
    D --> E["📊 Collect Data"]
    E --> F["Click Rate"]
    E --> G["Conversion Rate"]
    E --> H["Scroll Depth"]
    
    F --> I["📈 Analysis"]
    G --> I
    H --> I
    
    I --> J{"Statistical<br/>Significance"}
    
    J -->|p < 0.05| K["✅ Winner Found"]
    J -->|p > 0.05| L["❌ No Winner<br/>Extend or<br/>Redesign"]
    
    K --> M["🚀 Deploy<br/>Winner 100%"]
    L --> N["🔄 Try New<br/>Variations"]
    
    N --> B
    M --> O["📉 Monitor<br/>Holdout Check"]
    
    style A fill:#c8e6c9
    style B fill:#a5d6a7
    style D fill:#fff9c4
    style E fill:#ffe0b2
    style I fill:#b2dfdb
    style K fill:#81c784
    style M fill:#4caf50
    style O fill:#2e7d32
```

---

## 12. 마이크로 인터랙션 타이밍

```mermaid
timeline
    title 사용자 인터랙션 타이밍 (ms)

    section 페이지 로드
    0: 페이지 로드 시작
    200: 백그라운드 fade-in
    400: 헤드라인 slide-up
    500: 서브카피 fade-in
    650: CTA 버튼 scale-up
    800: 신뢰 배지 slide-in

    section 버튼 클릭
    0: 호버 진입
    150: 배경색 변화 (200ms)
    50: active 상태 (scale 0.98)
    150: 클릭 해제 (100ms 복구)

    section 폼 입력
    0: 포커스 진입
    100: 배경색 변화
    200: 테두리 색상 변화
    150: 그림자 추가

    section 로딩 (AI 매칭)
    0: 스피너 시작
    1500-2000: API 응답 대기
    200: 결과 카드 slide-in (각 100ms 지연)
```

---

**다이어그램 사용 팁:**
- GitHub에서 렌더링됨 (.md 파일에서)
- Mermaid Live Editor: https://mermaid.live
- VSCode Mermaid 확장 설치 시 미리보기 가능
- 각 다이어그램 우측 상단의 ⋯ 메뉴에서 PNG/SVG 다운로드 가능

