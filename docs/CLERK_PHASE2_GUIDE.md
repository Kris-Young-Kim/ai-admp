# Phase 2: Webhook 구성 가이드

> Clerk Webhook을 설정하여 사용자 이벤트를 Supabase에 자동 동기화

---

## 📋 현재 상태

- ✅ Webhook 엔드포인트 코드 완료: `/api/webhooks/clerk`
- ✅ 이벤트 처리 로직 구현 완료
- ⏳ ngrok 설치 필요
- ⏳ Clerk 대시보드에서 Webhook 등록 필요

---

## 단계별 작업

### 1단계: ngrok 설치

#### Windows에서 ngrok 설치

**방법 1: Scoop 사용 (권장)**
```bash
# Scoop이 설치되어 있다면
scoop install ngrok
```

**방법 2: 공식 사이트에서 다운로드**
1. https://ngrok.com/download 접속
2. Windows용 다운로드
3. 압축 해제 후 `ngrok.exe`를 PATH에 추가하거나 프로젝트 폴더에 복사

**방법 3: Chocolatey 사용**
```bash
choco install ngrok
```

#### ngrok 설치 확인
```bash
ngrok version
```

---

### 2단계: Next.js 개발 서버 실행

1. **터미널에서 개발 서버 실행**
   ```bash
   pnpm dev
   ```
   - 서버가 `http://localhost:3000`에서 실행되는지 확인
   - 에러가 없다면 정상적으로 실행 중

2. **브라우저에서 확인**
   - `http://localhost:3000` 접속하여 정상 작동 확인

---

### 3단계: ngrok 터널 시작

1. **새 터미널 창 열기** (개발 서버는 계속 실행 중)

2. **ngrok 실행**
   ```bash
   ngrok http 3000
   ```

3. **ngrok URL 복사**
   - 터미널에 다음과 같은 정보가 표시됩니다:
     ```
     Forwarding  https://abc123-def456.ngrok-free.app -> http://localhost:3000
     ```
   - **HTTPS URL**을 복사하세요 (예: `https://abc123-def456.ngrok-free.app`)
   - 이 URL은 ngrok을 종료하면 변경되므로, Webhook 설정이 완료될 때까지 ngrok을 실행 상태로 유지하세요

---

### 4단계: Clerk 대시보드에서 Webhook 등록

1. **Clerk 대시보드 접속**
   - https://dashboard.clerk.com 접속
   - 프로젝트 선택 (Frontend API: `enough-airedale-80`)

2. **Webhooks 메뉴로 이동**
   - 좌측 메뉴에서 **"Webhooks"** 클릭
   - 또는 **"Developers"** → **"Webhooks"**

3. **새 Webhook 엔드포인트 추가**
   - **"Add Endpoint"** 또는 **"Create Webhook"** 버튼 클릭

4. **엔드포인트 정보 입력**
   - **Endpoint URL**: 
     ```
     https://your-ngrok-url.ngrok-free.app/api/webhooks/clerk
     ```
     - `your-ngrok-url` 부분을 3단계에서 복사한 실제 ngrok URL로 교체
     - 예: `https://abc123-def456.ngrok-free.app/api/webhooks/clerk`
   
   - **Events to listen to**: 다음 이벤트 선택
     - ✅ `user.created` (사용자 생성 시)
     - ✅ `user.updated` (사용자 정보 업데이트 시)
     - ✅ `user.deleted` (사용자 삭제 시, 선택사항)

5. **Webhook 생성**
   - **"Create"** 또는 **"Add Endpoint"** 버튼 클릭

6. **Signing Secret 복사** ⚠️ 중요
   - Webhook 생성 후 **"Signing Secret"**이 표시됩니다
   - `whsec_...` 형식의 전체 문자열을 복사하세요
   - 이 값은 다음 단계에서 `.env.local`에 추가합니다
   - **주의**: 이 Secret은 한 번만 표시되므로 안전한 곳에 저장하세요

---

### 5단계: 환경 변수 설정

1. **`.env.local` 파일 열기**
   - 프로젝트 루트 디렉토리의 `.env.local` 파일을 엽니다

2. **CLERK_WEBHOOK_SECRET 추가**
   - 다음 줄을 추가하거나 기존 항목을 업데이트합니다:
     ```env
     # Clerk Webhook
     CLERK_WEBHOOK_SECRET=whsec_여기에_복사한_전체_문자열_붙여넣기
     ```
   - `whsec_...`로 시작하는 전체 문자열을 붙여넣으세요

3. **파일 저장**

---

### 6단계: 개발 서버 재시작

1. **개발 서버 종료**
   - 실행 중인 `pnpm dev` 프로세스를 `Ctrl+C`로 종료

2. **개발 서버 재시작**
   ```bash
   pnpm dev
   ```
   - 환경 변수가 로드되었는지 확인

---

### 7단계: Webhook 테스트

1. **Clerk 대시보드에서 테스트**
   - Clerk Dashboard → **Webhooks**
   - 생성한 Webhook 엔드포인트 선택
   - **"Send test webhook"** 버튼 클릭
   - **"Recent deliveries"** 탭에서 결과 확인
   - 성공 시 `200 OK` 상태 코드 확인

2. **개발 서버 콘솔 확인**
   - 개발 서버 터미널에서 다음 로그 확인:
     ```
     🔔 Clerk Webhook Received
     ✅ Webhook verified: user.created
     👤 User created: user_xxx
     ✅ Session created: [UUID]
     ```

3. **Supabase에서 확인**
   - Supabase Dashboard → **Table Editor**
   - `sessions` 테이블 선택
   - Webhook으로 생성된 레코드 확인
   - `clerk_user_id`, `email` 등이 올바르게 저장되었는지 확인

---

## ✅ 완료 체크리스트

- [ ] ngrok 설치 완료
- [ ] 개발 서버 실행 중 (`pnpm dev`)
- [ ] ngrok 터널 실행 중 (`ngrok http 3000`)
- [ ] ngrok HTTPS URL 복사 완료
- [ ] Clerk 대시보드에서 Webhook 엔드포인트 등록 완료
- [ ] Signing Secret 복사 완료
- [ ] `.env.local`에 `CLERK_WEBHOOK_SECRET` 설정 완료
- [ ] 개발 서버 재시작 완료
- [ ] Webhook 테스트 성공 확인
- [ ] Supabase `sessions` 테이블에서 동기화 확인

---

## 🔍 문제 해결

### ngrok이 작동하지 않는 경우

1. **포트 확인**
   - 개발 서버가 `localhost:3000`에서 실행 중인지 확인
   - 다른 포트를 사용한다면 `ngrok http [포트번호]`로 변경

2. **방화벽 확인**
   - Windows 방화벽이 ngrok을 차단하지 않는지 확인

### Webhook이 작동하지 않는 경우

1. **환경 변수 확인**
   ```bash
   # .env.local 파일에 CLERK_WEBHOOK_SECRET이 설정되어 있는지 확인
   ```

2. **ngrok URL 확인**
   - ngrok이 계속 실행 중인지 확인
   - ngrok URL이 변경되지 않았는지 확인 (ngrok을 재시작하면 URL이 변경됨)

3. **Clerk 대시보드 확인**
   - Webhooks → Recent deliveries에서 실패한 요청 확인
   - 에러 메시지 확인

4. **개발 서버 로그 확인**
   - 콘솔에 에러 메시지가 있는지 확인
   - `CLERK_WEBHOOK_SECRET is not set` 에러가 있다면 환경 변수 확인

### 일반적인 오류

**"Webhook secret not configured"**
- `.env.local`에 `CLERK_WEBHOOK_SECRET` 추가 필요
- 개발 서버 재시작 필요

**"Webhook verification failed"**
- Clerk 대시보드의 Signing Secret과 `.env.local`의 값이 일치하는지 확인
- Secret에 공백이나 줄바꿈이 없는지 확인

**"Missing svix headers"**
- Clerk에서 보낸 요청이 올바른 형식인지 확인
- ngrok이 헤더를 수정하지 않는지 확인

---

## 📚 참고 자료

- [Clerk Webhooks 공식 문서](https://clerk.com/docs/integrations/webhooks/overview)
- [Webhook 설정 가이드](./WEBHOOK_SETUP.md)
- [Clerk 설정 계획서](./CLERK_SETUP_PLAN.md)

---

**마지막 업데이트**: 2025년 1월

