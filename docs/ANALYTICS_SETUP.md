# 분석 및 추적 설정 가이드

이 문서는 Google Analytics 4와 Sentry 설정 방법을 안내합니다.

## Google Analytics 4 설정

### 1. GA4 속성 생성

1. [Google Analytics](https://analytics.google.com/)에 접속
2. **관리** → **속성 만들기** 클릭
3. 속성 정보 입력:
   - 속성 이름: 원하는 이름 (예: "AI 보조기기 매칭")
   - 보고 시간대: 한국 (GMT+9)
   - 통화: 원화 (KRW)
4. **다음** 클릭하여 데이터 스트림 생성

### 2. 데이터 스트림 생성

1. **웹** 선택
2. 웹사이트 정보 입력:
   - 웹사이트 URL: `https://your-domain.com` (또는 개발용 `http://localhost:3000`)
   - 스트림 이름: 원하는 이름
3. **스트림 만들기** 클릭

### 3. Measurement ID 복사

1. 생성된 데이터 스트림 클릭
2. **Measurement ID** 복사 (형식: `G-XXXXXXXXXX`)
3. `.env.local` 파일에 추가:

```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 4. 추적 코드 확인

코드는 이미 설치되어 있습니다:
- `components/providers/analytics-provider.tsx`: GA4 초기화
- `lib/analytics/ga4.ts`: GA4 이벤트 전송 유틸리티
- `lib/api/analytics.ts`: Supabase + GA4 이중 추적

### 5. 이벤트 정의

다음 이벤트들이 자동으로 추적됩니다:

- **page_view**: 페이지 진입 (자동)
- **cta_click**: CTA 버튼 클릭
- **form_submit**: 폼 제출
- **section_scroll**: 섹션 스크롤
- **product_click**: 상품 클릭
- **matching_request**: 매칭 요청
- **matching_success**: 매칭 성공

## Sentry 설정

### 1. Sentry 프로젝트 생성

1. [Sentry](https://sentry.io/)에 접속하여 로그인
2. **Projects** → **Create Project** 클릭
3. 플랫폼 선택: **Next.js**
4. 프로젝트 이름 입력
5. **Create Project** 클릭

### 2. DSN 복사

1. 프로젝트 생성 후 **Client Keys (DSN)** 복사
2. `.env.local` 파일에 추가:

```env
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### 3. SDK 설치

```bash
pnpm add @sentry/nextjs
```

### 4. 설정 파일 활성화

설치 후 다음 파일들의 주석을 해제하세요:

1. `sentry.client.config.ts` - 클라이언트 사이드 설정
2. `sentry.server.config.ts` - 서버 사이드 설정
3. `sentry.edge.config.ts` - Edge Runtime 설정

### 5. 에러 트래킹 확인

에러가 발생하면 자동으로 Sentry에 보고됩니다:

```typescript
import { captureError } from "@/lib/analytics/sentry";

try {
  // 코드 실행
} catch (error) {
  captureError(error, { context: "additional info" });
}
```

### 6. 성능 모니터링

성능 트랜잭션을 추적할 수 있습니다:

```typescript
import { startTransaction } from "@/lib/analytics/sentry";

const transaction = startTransaction("api-call", "http");
// 작업 수행
transaction?.finish();
```

## 환경 변수 요약

`.env.local` 파일에 다음 변수를 추가하세요:

```env
# Google Analytics 4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
NEXT_PUBLIC_APP_VERSION=1.0.0  # 선택사항: 릴리스 버전
```

## 테스트

### GA4 테스트

1. 개발 서버 실행: `pnpm dev`
2. 브라우저에서 페이지 방문
3. [GA4 실시간 보고서](https://analytics.google.com/)에서 이벤트 확인

### Sentry 테스트

1. Sentry 설정 완료 후
2. 테스트 에러 발생:

```typescript
import { captureError } from "@/lib/analytics/sentry";

captureError(new Error("테스트 에러"), { test: true });
```

3. Sentry 대시보드에서 에러 확인

## 참고 자료

- [Google Analytics 4 문서](https://developers.google.com/analytics/devguides/collection/ga4)
- [Sentry Next.js 문서](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Next.js Third-Party Packages](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)

