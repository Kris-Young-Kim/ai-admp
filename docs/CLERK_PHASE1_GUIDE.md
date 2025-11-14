# Phase 1: 개발용 Clerk 프로젝트 생성 가이드

> Clerk 대시보드에서 개발용 프로젝트 설정 완료 가이드

---

## ✅ 현재 상태

- **Clerk Frontend API URL 확인됨**: `https://enough-airedale-80.clerk.accounts.dev`
- **프로젝트 생성**: 이미 완료된 것으로 보임

---

## 📋 단계별 작업

### 1단계: Clerk 대시보드에서 API 키 확인 및 복사

1. **Clerk 대시보드 접속**
   - https://dashboard.clerk.com 접속
   - 프로젝트 선택 (Frontend API URL: `enough-airedale-80`)

2. **API Keys 메뉴로 이동**
   - 좌측 메뉴에서 **"API Keys"** 또는 **"Developers"** → **"API Keys"** 클릭

3. **필요한 키 복사**
   - **Publishable Key** (`pk_test_...` 형식)
     - 클립보드에 복사
     - `.env.local`의 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`에 사용
   
   - **Secret Key** (`sk_test_...` 형식)
     - 클립보드에 복사
     - `.env.local`의 `CLERK_SECRET_KEY`에 사용

4. **Frontend API URL 확인** ✅
   - 이미 확인됨: `https://enough-airedale-80.clerk.accounts.dev`
   - Supabase 통합 시 사용 (Phase 2)

---

### 2단계: .env.local 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase Configuration (이미 설정되어 있다면 유지)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_STORAGE_BUCKET=uploads

# Clerk Authentication (Development)
# 위에서 복사한 키를 여기에 붙여넣으세요
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_여기에_붙여넣기
CLERK_SECRET_KEY=sk_test_여기에_붙여넣기

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Clerk Webhook (Phase 2에서 설정할 예정)
# CLERK_WEBHOOK_SECRET=
```

**주의사항:**
- `.env.local` 파일은 Git에 커밋되지 않습니다 (`.gitignore`에 포함됨)
- 실제 키 값으로 교체하세요 (`pk_test_...`, `sk_test_...`)

---

### 3단계: 기본 인증 설정 확인

Clerk 대시보드에서 기본 설정을 확인하세요:

1. **User & Authentication 설정**
   - 좌측 메뉴 → **"User & Authentication"** → **"Email, Phone, Username"**
   - Email 인증 방식 확인:
     - ✅ Email code (이메일 인증 코드)
     - ✅ Magic link (매직 링크)

2. **Appearance 설정 (선택)**
   - 좌측 메뉴 → **"Appearance"**
   - 한국어 로컬라이제이션이 적용되어 있는지 확인
   - 브랜딩 설정 (로고, 색상 등) - 필요시 설정

---

### 4단계: 설정 확인

1. **개발 서버 실행**
   ```bash
   pnpm dev
   ```

2. **인증 테스트**
   - 브라우저에서 `http://localhost:3000/sign-in` 접속
   - 로그인 페이지가 정상적으로 표시되는지 확인
   - 이메일로 회원가입/로그인 테스트

3. **에러 확인**
   - 콘솔에 Clerk 관련 에러가 없는지 확인
   - 환경 변수가 제대로 로드되었는지 확인

---

## ✅ 완료 체크리스트

- [ ] Clerk 대시보드에서 API Keys 확인 완료
- [ ] Publishable Key 복사 완료
- [ ] Secret Key 복사 완료
- [ ] `.env.local` 파일 생성 완료
- [ ] `.env.local`에 Clerk 키 설정 완료
- [ ] 개발 서버 실행 및 인증 테스트 완료
- [ ] 기본 인증 설정 확인 완료

---

## 🔍 문제 해결

### 환경 변수가 로드되지 않는 경우

1. **파일 이름 확인**
   - 파일명이 정확히 `.env.local`인지 확인 (`.env.local.txt` 아님)

2. **서버 재시작**
   ```bash
   # 서버 종료 후 다시 시작
   pnpm dev
   ```

3. **변수 이름 확인**
   - `NEXT_PUBLIC_` 접두사가 있는 변수만 클라이언트에서 접근 가능
   - 서버 전용 변수는 `NEXT_PUBLIC_` 없이 사용

### Clerk 인증이 작동하지 않는 경우

1. **키 형식 확인**
   - Publishable Key: `pk_test_...` 형식
   - Secret Key: `sk_test_...` 형식

2. **Clerk 대시보드 확인**
   - 프로젝트가 활성화되어 있는지 확인
   - API Keys 페이지에서 키가 정상적으로 표시되는지 확인

---

## 📚 다음 단계

Phase 1 완료 후:
- **Phase 2: Webhook 구성** 진행
- `docs/CLERK_SETUP_PLAN.md` 참고

---

**마지막 업데이트**: 2025년 1월

