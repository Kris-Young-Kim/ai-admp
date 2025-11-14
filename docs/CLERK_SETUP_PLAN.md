# Clerk 애플리케이션 설정 계획서

> Clerk 인증 시스템 설정 및 OAuth 제공자 연결 가이드
> 작성일: 2025년 1월

---

## 📋 개요

이 문서는 Clerk 애플리케이션의 전체 설정 과정을 단계별로 안내합니다. 개발 환경과 프로덕션 환경을 분리하여 설정하는 방법을 포함합니다.

**설정 항목:**
- ✅ 개발용 Clerk 프로젝트 생성
- ✅ 프로덕션용 Clerk 프로젝트 생성
- ✅ OAuth 제공자 연결 (Google, Kakao, Apple)
- ✅ Webhook 구성 (user.created, user.updated)
- ✅ 환경 변수 설정

---

## 🎯 Phase 1: 개발용 Clerk 프로젝트 생성

### 목표
로컬 개발 환경에서 사용할 Clerk 프로젝트를 생성합니다.

### 작업 내용

#### 1-1. Clerk 대시보드 접속 및 프로젝트 생성

1. **Clerk 대시보드 접속**
   - https://dashboard.clerk.com 접속
   - 로그인 (계정이 없으면 회원가입)

2. **새 애플리케이션 생성**
   - **"Create application"** 또는 **"New Application"** 클릭
   - 애플리케이션 정보 입력:
     - **Application name**: `AI-ADMP (Development)` 또는 `AI-ADMP Dev`
     - **Sign-in options**: 
       - ✅ Email (필수)
       - ✅ Google (선택, Phase 3에서 설정)
       - ✅ Kakao (선택, Phase 3에서 설정)
       - ✅ Apple (선택, Phase 3에서 설정)
   - **"Create application"** 클릭

3. **Quick Start 화면**
   - **"Continue in Dashboard"** 클릭하여 대시보드로 이동

#### 1-2. API 키 확인 및 복사

1. **API Keys 메뉴로 이동**
   - 좌측 메뉴에서 **"API Keys"** 또는 **"Developers"** → **"API Keys"** 클릭

2. **필요한 키 복사**
   - **Publishable Key** (Frontend용)
     - `pk_test_...` 형식
     - `.env.local`의 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`에 사용
   
   - **Secret Key** (Backend용)
     - `sk_test_...` 형식
     - `.env.local`의 `CLERK_SECRET_KEY`에 사용
   
   - **Frontend API URL**
     - 예: `https://enough-airedale-80.clerk.accounts.dev`
     - Supabase 통합 시 사용 (Phase 2)

3. **키 저장**
   - 안전한 곳에 메모 (다음 단계에서 `.env.local`에 추가)

#### 1-3. 환경 변수 설정

`.env.local` 파일에 다음 변수 추가:

```env
# Clerk Authentication (Development)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

**주의사항:**
- `.env.local`은 Git에 커밋하지 마세요 (`.gitignore`에 포함되어 있음)
- 테스트 키(`pk_test_`, `sk_test_`)는 개발용입니다

#### 1-4. 기본 설정 확인

1. **User & Authentication 설정**
   - 좌측 메뉴 → **"User & Authentication"** → **"Email, Phone, Username"**
   - Email 인증 방식 확인:
     - ✅ Email code (이메일 인증 코드)
     - ✅ Magic link (매직 링크)
   
2. **Appearance 설정 (선택)**
   - 좌측 메뉴 → **"Appearance"**
   - 한국어 로컬라이제이션 확인
   - 브랜딩 설정 (로고, 색상 등)

**예상 소요 시간**: 15-20분

**우선순위**: 🔴 최우선

---

## 🎯 Phase 2: Webhook 구성

### 목표
Clerk 사용자 이벤트를 Supabase에 자동으로 동기화하기 위한 Webhook 설정

### 작업 내용

#### 2-1. 로컬 개발 환경 설정 (ngrok)

1. **ngrok 설치** (아직 설치하지 않은 경우)
   ```bash
   # Windows (Scoop)
   scoop install ngrok
   
   # 또는 공식 사이트에서 다운로드
   # https://ngrok.com/download
   ```

2. **Next.js 개발 서버 실행**
   ```bash
   pnpm dev
   ```
   - 서버가 `http://localhost:3000`에서 실행되는지 확인

3. **ngrok 터널 시작**
   ```bash
   ngrok http 3000
   ```
   - 터미널에 표시되는 HTTPS URL 복사
   - 예: `https://abc123-def456.ngrok-free.app`

#### 2-2. Clerk 대시보드에서 Webhook 설정

1. **Webhooks 메뉴로 이동**
   - Clerk Dashboard → 좌측 메뉴 **"Webhooks"** 클릭
   - 또는 **"Developers"** → **"Webhooks"**

2. **새 Webhook 엔드포인트 추가**
   - **"Add Endpoint"** 또는 **"Create Webhook"** 클릭

3. **엔드포인트 정보 입력**
   - **Endpoint URL**: 
     ```
     https://your-ngrok-url.ngrok-free.app/api/webhooks/clerk
     ```
     - `your-ngrok-url` 부분을 실제 ngrok URL로 교체
     - 예: `https://abc123-def456.ngrok-free.app/api/webhooks/clerk`
   
   - **Events to listen to**: 다음 이벤트 선택
     - ✅ `user.created` (사용자 생성 시)
     - ✅ `user.updated` (사용자 정보 업데이트 시)
     - ✅ `user.deleted` (사용자 삭제 시, 선택사항)

4. **Webhook 생성**
   - **"Create"** 또는 **"Add Endpoint"** 클릭

5. **Signing Secret 복사**
   - Webhook 생성 후 **"Signing Secret"** 표시됨
   - `whsec_...` 형식의 전체 문자열 복사
   - `.env.local`에 추가:
     ```env
     # Clerk Webhook
     # 실제 키 값으로 교체하세요 (예시: whsec_... 형식)
     CLERK_WEBHOOK_SECRET=whsec_example_key_replace_with_real
     ```

#### 2-3. Webhook 테스트

1. **개발 서버 재시작**
   ```bash
   # .env.local에 CLERK_WEBHOOK_SECRET 추가 후
   pnpm dev
   ```

2. **Clerk 대시보드에서 테스트**
   - Clerk Dashboard → Webhooks
   - 생성한 Webhook 엔드포인트 선택
   - **"Send test webhook"** 클릭
   - **"Recent deliveries"** 탭에서 결과 확인
   - 성공 시 `200 OK` 상태 코드 확인

3. **Supabase에서 확인**
   - Supabase Dashboard → Table Editor
   - `sessions` 테이블 확인
   - Webhook으로 생성된 레코드 확인

**예상 소요 시간**: 20-30분

**우선순위**: 🔴 높음

**참고**: 상세한 Webhook 설정 가이드는 `docs/WEBHOOK_SETUP.md` 참고

---

## 🎯 Phase 3: OAuth 제공자 연결

### 목표
Google, Kakao, Apple 소셜 로그인 기능 추가

### 작업 내용

#### 3-1. Google OAuth 설정

1. **Google Cloud Console 설정**
   - https://console.cloud.google.com 접속
   - 새 프로젝트 생성 또는 기존 프로젝트 선택
   - **"APIs & Services"** → **"Credentials"** 이동
   - **"Create Credentials"** → **"OAuth client ID"** 선택
   - **Application type**: `Web application` 선택
   - **Authorized redirect URIs** 추가:
     ```
     https://enough-airedale-80.clerk.accounts.dev/v1/oauth_callback
     ```
     - `enough-airedale-80` 부분을 실제 Clerk Frontend API URL의 도메인으로 교체
   - **Client ID**와 **Client Secret** 복사

2. **Clerk 대시보드에서 Google 연결**
   - Clerk Dashboard → **"User & Authentication"** → **"Social Connections"**
   - **"Google"** 클릭
   - **"Enable"** 토글 활성화
   - **Client ID**와 **Client Secret** 입력
   - **"Save"** 클릭

#### 3-2. Kakao OAuth 설정

1. **Kakao Developers 설정**
   - https://developers.kakao.com 접속
   - 내 애플리케이션 선택 또는 새로 생성
   - **"앱 설정"** → **"플랫폼"** → **"Web 플랫폼 등록"**
   - 사이트 도메인 등록:
     ```
     https://enough-airedale-80.clerk.accounts.dev
     ```
   - **"제품 설정"** → **"카카오 로그인"** 활성화
   - **"Redirect URI"** 등록:
     ```
     https://enough-airedale-80.clerk.accounts.dev/v1/oauth_callback
     ```
   - **REST API 키**와 **Client Secret** 복사

2. **Clerk 대시보드에서 Kakao 연결**
   - Clerk Dashboard → **"User & Authentication"** → **"Social Connections"**
   - **"Kakao"** 클릭 (없으면 커스텀 제공자로 추가)
   - **"Enable"** 토글 활성화
   - **Client ID** (REST API 키)와 **Client Secret** 입력
   - **"Save"** 클릭

**참고**: Kakao가 Clerk의 기본 제공자가 아닐 수 있습니다. 이 경우 **"Custom OAuth"** 또는 **"Add connection"**을 사용하여 추가해야 합니다.

#### 3-3. Apple OAuth 설정

1. **Apple Developer 설정**
   - https://developer.apple.com 접속
   - **"Certificates, Identifiers & Profiles"** 이동
   - **"Identifiers"** → **"Services IDs"** 생성
   - **"Sign in with Apple"** 활성화
   - **Return URLs** 등록:
     ```
     https://enough-airedale-80.clerk.accounts.dev/v1/oauth_callback
     ```
   - **Services ID**와 **Team ID** 복사

2. **Apple Key 생성**
   - **"Keys"** 섹션에서 새 키 생성
   - **"Sign in with Apple"** 활성화
   - 키 파일(.p8) 다운로드 및 **Key ID** 복사

3. **Clerk 대시보드에서 Apple 연결**
   - Clerk Dashboard → **"User & Authentication"** → **"Social Connections"**
   - **"Apple"** 클릭
   - **"Enable"** 토글 활성화
   - 다음 정보 입력:
     - **Services ID**
     - **Team ID**
     - **Key ID**
     - **Private Key** (다운로드한 .p8 파일 내용)
   - **"Save"** 클릭

#### 3-4. OAuth 제공자 테스트

1. **로컬 개발 서버 실행**
   ```bash
   pnpm dev
   ```

2. **로그인 페이지 접속**
   - `http://localhost:3000/sign-in` 접속
   - 각 OAuth 제공자 버튼이 표시되는지 확인

3. **각 제공자로 로그인 테스트**
   - Google 로그인 테스트
   - Kakao 로그인 테스트
   - Apple 로그인 테스트 (Apple ID 필요)

**예상 소요 시간**: 
- Google: 15-20분
- Kakao: 20-30분
- Apple: 30-40분 (Apple Developer 계정 필요)

**우선순위**: 🟡 중간 (필요에 따라 선택)

---

## 🎯 Phase 4: 프로덕션용 Clerk 프로젝트 생성

### 목표
프로덕션 환경에서 사용할 별도의 Clerk 프로젝트 생성

### 작업 내용

#### 4-1. 프로덕션 Clerk 프로젝트 생성

1. **새 애플리케이션 생성**
   - Clerk Dashboard에서 **"Create application"** 클릭
   - 애플리케이션 정보 입력:
     - **Application name**: `AI-ADMP (Production)` 또는 `AI-ADMP Prod`
     - **Sign-in options**: 개발용과 동일하게 설정

2. **API 키 확인 및 복사**
   - 개발용과 동일한 방식으로 키 복사
   - 프로덕션 키는 `pk_live_...`, `sk_live_...` 형식

#### 4-2. 프로덕션 Webhook 설정

1. **Vercel 배포 후 URL 확인**
   - 프로덕션 URL 예: `https://your-app.vercel.app`

2. **Clerk 대시보드에서 Webhook 추가**
   - 프로덕션 Clerk 프로젝트 → **"Webhooks"**
   - **"Add Endpoint"** 클릭
   - **Endpoint URL**: 
     ```
     https://your-app.vercel.app/api/webhooks/clerk
     ```
   - 이벤트 선택: `user.created`, `user.updated`, `user.deleted`
   - **Signing Secret** 복사

#### 4-3. Vercel 환경 변수 설정

1. **Vercel 대시보드 접속**
   - https://vercel.com 접속
   - 프로젝트 선택

2. **환경 변수 추가**
   - **Settings** → **Environment Variables**
   - 다음 변수 추가:
     ```env
     # Clerk (Production)
     # 실제 키 값으로 교체하세요 (예시: pk_live_... 형식)
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_example_key_replace_with_real
     # 실제 키 값으로 교체하세요 (예시: sk_live_... 형식)
     CLERK_SECRET_KEY=sk_live_example_key_replace_with_real
     # 실제 키 값으로 교체하세요 (예시: whsec_... 형식)
     CLERK_WEBHOOK_SECRET=whsec_example_key_replace_with_real
     
     # Clerk URLs
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
     NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
     ```

3. **환경별 설정**
   - **Production** 환경에만 프로덕션 키 설정
   - **Preview** 환경에는 개발용 키 사용 가능

#### 4-4. 프로덕션 OAuth 제공자 설정

- 개발용과 동일한 방식으로 OAuth 제공자 연결
- 단, **Redirect URI**는 프로덕션 URL로 설정:
  ```
  https://your-production-clerk-domain.clerk.accounts.dev/v1/oauth_callback
  ```

**예상 소요 시간**: 30-40분

**우선순위**: 🟢 낮음 (배포 직전)

---

## 📋 체크리스트

### 개발 환경

- [ ] 개발용 Clerk 프로젝트 생성
- [ ] 개발용 API 키 복사 및 `.env.local` 설정
- [ ] ngrok 설치 및 실행
- [ ] 개발용 Webhook 엔드포인트 등록
- [ ] `CLERK_WEBHOOK_SECRET` 환경 변수 설정
- [ ] Webhook 테스트 성공 확인
- [ ] Google OAuth 연결 (선택)
- [ ] Kakao OAuth 연결 (선택)
- [ ] Apple OAuth 연결 (선택)

### 프로덕션 환경

- [ ] 프로덕션용 Clerk 프로젝트 생성
- [ ] 프로덕션용 API 키 복사
- [ ] Vercel 환경 변수 설정
- [ ] 프로덕션 Webhook 엔드포인트 등록
- [ ] 프로덕션 OAuth 제공자 연결
- [ ] 프로덕션 환경 테스트

---

## 🔍 문제 해결

### Webhook이 작동하지 않는 경우

1. **환경 변수 확인**
   ```bash
   # .env.local 파일 확인
   cat .env.local | grep CLERK_WEBHOOK_SECRET
   ```

2. **ngrok URL 확인**
   - ngrok이 실행 중인지 확인
   - URL이 변경되지 않았는지 확인

3. **Clerk 대시보드 확인**
   - Webhooks → Recent deliveries에서 실패한 요청 확인
   - 에러 메시지 확인

### OAuth 로그인이 작동하지 않는 경우

1. **Redirect URI 확인**
   - Clerk 대시보드의 Redirect URI와 OAuth 제공자 설정이 일치하는지 확인

2. **클라이언트 키 확인**
   - Client ID와 Client Secret이 올바른지 확인

3. **도메인 확인**
   - OAuth 제공자에 등록된 도메인과 Clerk 도메인이 일치하는지 확인

---

## 📚 참고 자료

- [Clerk 공식 문서](https://clerk.com/docs)
- [Clerk Webhooks 가이드](https://clerk.com/docs/integrations/webhooks/overview)
- [Clerk OAuth 제공자 설정](https://clerk.com/docs/authentication/social-connections)
- [Webhook 설정 가이드](./WEBHOOK_SETUP.md)
- [README.md](../README.md)

---

**마지막 업데이트**: 2025년 1월  
**다음 리뷰**: 각 Phase 완료 시

