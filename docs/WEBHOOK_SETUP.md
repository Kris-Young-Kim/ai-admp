# Clerk Webhook 설정 가이드

> Clerk Webhook을 구성하여 사용자 이벤트를 자동으로 Supabase에 동기화합니다.

---

## 개요

Clerk Webhook을 사용하면 사용자 생성, 업데이트, 삭제 이벤트를 자동으로 Supabase `sessions` 테이블에 동기화할 수 있습니다.

**현재 구현 상태:**
- ✅ Webhook 엔드포인트 생성 완료: `/api/webhooks/clerk`
- ✅ 이벤트 처리: `user.created`, `user.updated`, `user.deleted`
- ✅ Supabase sessions 테이블 자동 동기화

---

## 설정 단계

### 1단계: Webhook 시크릿 생성

1. **Clerk 대시보드 접속**
   - https://dashboard.clerk.com 접속
   - 프로젝트 선택

2. **Webhooks 메뉴로 이동**
   - 좌측 메뉴에서 **"Webhooks"** 클릭
   - 또는 **"Developers"** → **"Webhooks"**

3. **새 Webhook 엔드포인트 추가**
   - **"Add Endpoint"** 또는 **"Create Webhook"** 클릭

4. **엔드포인트 정보 입력**
   - **Endpoint URL**: 
     ```
     https://your-domain.com/api/webhooks/clerk
     ```
     - 로컬 개발: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk` (ngrok 사용)
     - 프로덕션: `https://your-app.vercel.app/api/webhooks/clerk`
   
   - **Events to listen to**: 다음 이벤트 선택
     - ✅ `user.created`
     - ✅ `user.updated`
     - ✅ `user.deleted` (선택사항)

5. **Webhook 생성**
   - **"Create"** 또는 **"Add Endpoint"** 클릭

6. **Signing Secret 복사**
   - Webhook 생성 후 **"Signing Secret"** 표시됨
   - **"Copy"** 버튼 클릭하여 복사
   - 이 값은 `CLERK_WEBHOOK_SECRET` 환경 변수에 사용됩니다

---

### 2단계: 환경 변수 설정

`.env.local` 파일에 다음 변수를 추가하세요:

```env
# Clerk Webhook
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**주의:**
- `whsec_`로 시작하는 전체 문자열을 복사하세요
- 이 값은 절대 공개하지 마세요
- `.env.local`은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다

---

### 3단계: 로컬 개발 환경 설정 (선택사항)

로컬에서 Webhook을 테스트하려면 ngrok을 사용하세요:

1. **ngrok 설치**
   ```bash
   # Windows (Scoop)
   scoop install ngrok
   
   # 또는 공식 사이트에서 다운로드
   # https://ngrok.com/download
   ```

2. **ngrok 터널 시작**
   ```bash
   # Next.js 개발 서버가 3000 포트에서 실행 중일 때
   ngrok http 3000
   ```

3. **ngrok URL 복사**
   - 터미널에 표시되는 URL 복사 (예: `https://abc123.ngrok.io`)
   - Clerk Webhook 엔드포인트에 설정:
     ```
     https://abc123.ngrok.io/api/webhooks/clerk
     ```

4. **Webhook 테스트**
   - Clerk 대시보드에서 **"Send test webhook"** 클릭
   - 또는 실제로 사용자를 생성/수정하여 테스트

---

### 4단계: 프로덕션 환경 설정

1. **Vercel에 환경 변수 추가**
   - Vercel 대시보드 → 프로젝트 선택
   - **Settings** → **Environment Variables**
   - 다음 변수 추가:
     ```
     CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     ```

2. **Clerk Webhook URL 업데이트**
   - Clerk 대시보드 → Webhooks
   - 엔드포인트 URL을 프로덕션 URL로 변경:
     ```
     https://your-app.vercel.app/api/webhooks/clerk
     ```

3. **배포 후 테스트**
   - Vercel에 배포 완료 후
   - Clerk 대시보드에서 **"Send test webhook"** 클릭
   - 또는 실제 사용자 생성/수정으로 테스트

---

## Webhook 이벤트 처리

### user.created

새 사용자가 생성될 때:
- Supabase `sessions` 테이블에 새 레코드 생성
- `clerk_user_id`, `email`, `metadata` 저장

### user.updated

사용자 정보가 업데이트될 때:
- Supabase `sessions` 테이블의 해당 레코드 업데이트
- `email`, `updated_at`, `metadata` 업데이트

### user.deleted

사용자가 삭제될 때:
- Supabase `sessions` 테이블에서 해당 레코드 삭제
- CASCADE로 인해 관련된 `matchings`, `events` 레코드도 함께 삭제됨

---

## 검증 및 테스트

### 1. Webhook 엔드포인트 확인

```bash
# 개발 서버 실행
pnpm dev

# 다른 터미널에서 테스트 (Webhook 시크릿이 설정되어 있어야 함)
curl -X POST http://localhost:3000/api/webhooks/clerk \
  -H "Content-Type: application/json" \
  -d '{"type":"user.created","data":{"id":"user_xxx"}}'
```

### 2. Clerk 대시보드에서 테스트

1. Clerk 대시보드 → Webhooks
2. 생성한 Webhook 엔드포인트 선택
3. **"Send test webhook"** 클릭
4. **"Recent deliveries"** 탭에서 결과 확인

### 3. Supabase에서 확인

1. Supabase 대시보드 → Table Editor
2. `sessions` 테이블 확인
3. Webhook으로 생성된 레코드 확인

---

## 문제 해결

### Webhook이 작동하지 않는 경우

1. **환경 변수 확인**
   ```bash
   # .env.local 파일에 CLERK_WEBHOOK_SECRET이 설정되어 있는지 확인
   ```

2. **미들웨어 확인**
   - `middleware.ts`에서 `/api/webhooks/clerk`가 `ignoredRoutes`에 포함되어 있는지 확인

3. **로그 확인**
   - 개발 서버 콘솔에서 Webhook 로그 확인
   - `console.group("🔔 Clerk Webhook Received")` 로그 확인

4. **Clerk 대시보드 확인**
   - Webhooks → Recent deliveries에서 실패한 요청 확인
   - 에러 메시지 확인

### 일반적인 오류

**"Webhook secret not configured"**
- `.env.local`에 `CLERK_WEBHOOK_SECRET` 추가 필요

**"Webhook verification failed"**
- Clerk 대시보드의 Signing Secret과 `.env.local`의 값이 일치하는지 확인

**"Missing svix headers"**
- Clerk에서 보낸 요청이 올바른 형식인지 확인
- ngrok이나 프록시가 헤더를 수정하지 않는지 확인

---

## 보안 고려사항

1. **Webhook 시크릿 보호**
   - `CLERK_WEBHOOK_SECRET`은 절대 공개하지 마세요
   - `.env.local`은 Git에 커밋하지 마세요
   - 프로덕션에서는 Vercel 환경 변수로 관리

2. **HTTPS 사용**
   - 프로덕션에서는 반드시 HTTPS 사용
   - 로컬 개발 시 ngrok 사용 (HTTPS 제공)

3. **Webhook 검증**
   - 모든 Webhook 요청은 svix를 통해 검증됨
   - 검증 실패 시 요청이 거부됨

---

## 참고 자료

- [Clerk Webhooks 공식 문서](https://clerk.com/docs/integrations/webhooks/overview)
- [Svix 라이브러리 문서](https://docs.svix.com/)
- [Webhook 엔드포인트 코드](../app/api/webhooks/clerk/route.ts)

---

**마지막 업데이트**: 2025년 1월

