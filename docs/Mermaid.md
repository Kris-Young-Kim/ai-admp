# Mermaid.md - 아키텍처 및 플로우 다이어그램

> 일반적인 랜딩페이지 구조 아키텍처 다이어그램

---

## 1. 시스템 아키텍처

```mermaid
graph TB
    User["👤 사용자<br/>Browser"]
    
    Vercel["🌐 Vercel<br/>호스팅"]
    Next["⚡ Next.js<br/>App Router"]
    
    Clerk["🔐 Clerk<br/>인증"]
    Supabase["🗄️ Supabase<br/>PostgreSQL"]
    
    User -->|요청| Vercel
    Vercel -->|렌더링| Next
    Next -->|인증| Clerk
    Next -->|데이터 저장| Supabase
    Supabase -->|결과| Next
    Next -->|응답| User
    
    style User fill:#e1f5ff
    style Vercel fill:#fff3e0
    style Next fill:#c8e6c9
    style Clerk fill:#f3e5f5
    style Supabase fill:#ffe0b2
```

---

## 2. 사용자 여정 (일반적인 랜딩페이지)

```mermaid
graph TD
    A["👤 사용자 방문"] --> B["🎯 Hero 섹션<br/>헤드라인 확인"]
    B --> C["❓ 문제 공감 섹션<br/>문제 인식"]
    C --> D["💡 해결책 섹션<br/>서비스 이해"]
    D --> E["⭐ 기능/특징 섹션<br/>주요 기능 확인"]
    E --> F["🔄 작동 방식 섹션<br/>프로세스 이해"]
    F --> G["💬 사용자 후기 섹션<br/>신뢰도 확인"]
    G --> H["❓ FAQ 섹션<br/>궁금증 해결"]
    H --> I["📝 정보 입력<br/>이름, 이메일, 연락처"]
    I --> J["✅ 제출<br/>Server Action"]
    J --> K["💾 Supabase 저장<br/>leads 테이블"]
    K --> L["🎉 완료 메시지"]
    
    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#ffccbc
    style D fill:#c8e6c9
    style E fill:#fff9c4
    style F fill:#b2dfdb
    style G fill:#d1c4e9
    style H fill:#ffe0b2
    style I fill:#c8e6c9
    style J fill:#fff9c4
    style K fill:#ffe0b2
    style L fill:#a5d6a7
```

---

## 3. 데이터베이스 스키마

```mermaid
erDiagram
    LEADS {
        UUID id PK
        TEXT name
        TEXT email
        TEXT phone
        TIMESTAMP created_at
    }
    
    USERS {
        UUID id PK
        TEXT clerk_user_id UK
        TEXT name
        TEXT email
        TIMESTAMP created_at
    }
```

---

## 4. Server Action 흐름

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Form as Lead Form
    participant Action as Server Action
    participant Supabase as Supabase
    
    User->>Form: 정보 입력 (이름, 이메일, 연락처)
    Form->>Form: 유효성 검사 (Zod)
    Form->>Action: submitLead(data)
    Action->>Action: 입력 검증
    Action->>Supabase: INSERT INTO leads
    Supabase-->>Action: 저장 완료
    Action-->>Form: 성공 응답
    Form->>User: 완료 메시지 표시
```

---

## 5. 인증 플로우 (Clerk)

```mermaid
graph TD
    A["👤 사용자 방문"] --> B{"로그인<br/>상태"}
    
    B -->|미로그인| C["📝 Sign-in 페이지<br/>(Clerk 모달)"]
    B -->|로그인| D["✅ 인증됨"]
    
    C --> E["이메일 + 비밀번호<br/>또는 OAuth"]
    E --> F["Clerk 인증"]
    F --> G["Supabase 동기화<br/>(SyncUserProvider)"]
    G --> D
    
    D --> H["🔐 보호된 리소스<br/>접근 가능"]
    
    style C fill:#ffccbc
    style D fill:#c8e6c9
    style F fill:#b3e5fc
    style G fill:#c8e6c9
    style H fill:#fff9c4
```

---

## 6. 컴포넌트 구조

```mermaid
graph TB
    Page["app/page.tsx<br/>랜딩 페이지"]
    
    Hero["HeroSection<br/>헤드라인 + CTA"]
    Problem["ProblemSection<br/>문제 공감"]
    Solution["SolutionSection<br/>해결책"]
    Features["FeaturesSection<br/>기능/특징"]
    HowItWorks["HowItWorksSection<br/>작동 방식"]
    Testimonials["TestimonialsSection<br/>사용자 후기"]
    FAQ["FAQSection<br/>자주 묻는 질문"]
    Form["LeadForm<br/>정보 수집 폼"]
    
    UI["UI Components<br/>Button, Input, Card, Accordion"]
    Access["Accessibility<br/>Toolbar, TTS"]
    
    Page --> Hero
    Page --> Problem
    Page --> Solution
    Page --> Features
    Page --> HowItWorks
    Page --> Testimonials
    Page --> FAQ
    Page --> Form
    
    Hero --> UI
    Problem --> UI
    Solution --> UI
    Features --> UI
    HowItWorks --> UI
    Testimonials --> UI
    FAQ --> UI
    Form --> UI
    Page --> Access
    
    style Page fill:#c8e6c9
    style Hero fill:#bbdefb
    style Problem fill:#ffccbc
    style Solution fill:#c8e6c9
    style Features fill:#fff9c4
    style HowItWorks fill:#b2dfdb
    style Testimonials fill:#d1c4e9
    style FAQ fill:#ffe0b2
    style Form fill:#fff9c4
    style UI fill:#ffe0b2
    style Access fill:#b2dfdb
```

---

**다이어그램 사용 팁:**
- GitHub에서 렌더링됨 (.md 파일에서)
- Mermaid Live Editor: https://mermaid.live
- VSCode Mermaid 확장 설치 시 미리보기 가능
