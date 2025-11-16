# 배포 준비 체크리스트

> 프로덕션 배포 전 필수 확인 사항

---

## 📋 배포 전 체크리스트

### 1. 환경 변수 설정

- [ ] `.env.example` 파일 확인 (프로젝트 루트에 존재)
- [ ] Vercel 환경 변수 설정 완료:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (프로덕션 키: `pk_live_...`)
  - [ ] `CLERK_SECRET_KEY` (프로덕션 키: `sk_live_...`)
  - [ ] `CLERK_WEBHOOK_SECRET` (프로덕션: `whsec_...`)
  - [ ] `NEXT_PUBLIC_SENTRY_DSN` (선택사항)
  - [ ] `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (선택사항)

### 2. 보안 검사

#### 2-1. 의존성 취약점 검사

```bash
# 보안 감사 실행
pnpm run security:audit

# 높은 수준의 취약점만 확인
pnpm run security:check

# 자동 수정 가능한 취약점 수정
pnpm run security:fix
```

- [ ] `pnpm run security:check` 실행 결과 확인
- [ ] 높은 수준의 취약점 없음 확인
- [ ] 수정 가능한 취약점 수정 완료

#### 2-2. 입력 검증 확인

- [x] API 라우트에 Zod 스키마 검증 적용됨
  - [x] `/api/matching/recommend` - `MatchingRequestSchema`
  - [x] `/api/feedback/submit` - `FeedbackRequestSchema`
  - [x] `/api/analytics/event` - 입력 검증 적용
- [x] XSS 방지: `dangerouslySetInnerHTML` 사용 없음
- [x] SQL Injection 방지: Supabase 클라이언트 사용 (파라미터화된 쿼리)
- [x] CSRF 보호: Next.js 기본 CSRF 보호 + Clerk 인증

#### 2-3. 보안 헤더 확인

- [x] `next.config.ts`에 보안 헤더 설정 완료:
  - [x] `X-Frame-Options: DENY`
  - [x] `X-Content-Type-Options: nosniff`
  - [x] `Referrer-Policy: strict-origin-when-cross-origin`
  - [x] `Permissions-Policy` 설정

### 3. 성능 최적화

#### 3-1. Next.js 최적화 설정

- [x] 이미지 최적화 설정 완료:
  - [x] WebP/AVIF 포맷 지원
  - [x] Responsive images (deviceSizes, imageSizes)
  - [x] 캐싱 설정 (minimumCacheTTL: 60)
- [x] 코드 분할 최적화:
  - [x] `optimizePackageImports` 설정 완료
  - [x] Route-based 코드 분할 (Next.js 기본)
- [x] 압축 활성화 (`compress: true`)
- [x] `poweredByHeader: false` (보안)

#### 3-2. 빌드 테스트

```bash
# 프로덕션 빌드 실행
pnpm run build

# 빌드 성공 확인
# 번들 크기 확인 (150KB 이하 목표)
```

- [ ] `pnpm run build` 성공 확인
- [ ] 번들 크기 확인 (`.next/` 디렉토리)
- [ ] 빌드 경고/에러 없음 확인

### 4. Lighthouse 점수 확인

- [ ] 성능: 90+ 달성
- [ ] 접근성: 95+ 달성
- [ ] SEO: 90+ 달성
- [ ] 모범 사례: 90+ 달성

**측정 방법:**
1. 프로덕션 빌드 실행: `pnpm run build && pnpm run start`
2. Chrome DevTools → Lighthouse 실행
3. 각 항목 점수 확인 및 개선

### 5. 데이터베이스 준비

- [ ] Supabase 프로덕션 프로젝트 생성
- [ ] 마이그레이션 파일 적용 완료
- [ ] RLS 정책 검토 (프로덕션에서는 활성화 필요)
- [ ] Storage 버킷 생성 및 권한 설정
- [ ] 백업 설정 확인

### 6. Clerk 프로덕션 설정

- [ ] 프로덕션 Clerk 프로젝트 생성
- [ ] 프로덕션 API 키 복사 (`pk_live_...`, `sk_live_...`)
- [ ] 프로덕션 Webhook 엔드포인트 등록
- [ ] OAuth 제공자 프로덕션 Redirect URI 설정

### 7. 모니터링 설정

- [ ] Sentry 프로젝트 생성 및 DSN 설정
- [ ] Google Analytics 4 속성 생성 및 Measurement ID 설정
- [ ] 에러 알림 설정 (Sentry)
- [ ] 성능 모니터링 활성화

### 8. 문서화

- [ ] README.md 배포 가이드 업데이트
- [ ] 환경 변수 문서화 (`.env.example`)
- [ ] API 문서 작성 (선택사항)

---

## 🚀 배포 단계

### 1단계: Vercel 배포

1. GitHub 리포지토리 연결 확인
2. Vercel 프로젝트 설정 확인
3. 환경 변수 설정 완료 확인
4. 배포 실행

### 2단계: 배포 후 확인

- [ ] 홈페이지 로드 확인
- [ ] 인증 플로우 테스트 (로그인/회원가입)
- [ ] API 엔드포인트 테스트
- [ ] 이미지 로드 확인
- [ ] 모바일 반응형 확인

### 3단계: 모니터링 설정

- [ ] Sentry 에러 추적 확인
- [ ] Google Analytics 데이터 수집 확인
- [ ] 성능 메트릭 확인

---

## 📝 참고 사항

### 보안 모범 사례

1. **환경 변수 관리**
   - 절대 `.env.local` 파일을 Git에 커밋하지 마세요
   - 프로덕션 키는 Vercel 환경 변수에만 저장
   - 정기적으로 키 로테이션

2. **의존성 관리**
   - 정기적으로 `pnpm audit` 실행
   - 취약점 발견 시 즉시 업데이트
   - `package-lock.json` 또는 `pnpm-lock.yaml` 커밋

3. **데이터베이스 보안**
   - 프로덕션에서는 반드시 RLS 활성화
   - Service Role Key는 서버 사이드에서만 사용
   - 정기적인 백업 확인

### 성능 최적화 팁

1. **이미지 최적화**
   - WebP/AVIF 포맷 사용
   - 적절한 이미지 크기 설정
   - Lazy loading 활용

2. **코드 분할**
   - 큰 라이브러리는 동적 import 사용
   - Route-based 코드 분할 활용
   - 번들 크기 모니터링

3. **캐싱 전략**
   - 정적 자산 캐싱
   - API 응답 캐싱 (적절한 경우)
   - CDN 활용

---

**마지막 업데이트**: 2025년 1월

