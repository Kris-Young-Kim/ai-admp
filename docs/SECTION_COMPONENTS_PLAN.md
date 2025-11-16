# 섹션 컴포넌트 개발 계획

> 작성일: 2025년 1월
> 목표: 7개 섹션 컴포넌트 완전 구현

---

## 📋 개발 순서 및 우선순위

### 1. Hero 섹션 (최우선) 🔴
**파일**: `components/sections/hero-section.tsx`

**요구사항**:
- 헤드라인 + 서브카피
- CTA 버튼 그룹 (2개)
- 신뢰 배지 (선택사항)
- 반응형 레이아웃
- 애니메이션 (fade-in, slide-up)
- A/B 테스트 변수 관리 (3개 헤드라인 변형)

**구현 내용**:
- `useState`로 A/B 테스트 변형 관리
- `aria-label` 속성 추가
- 그라데이션 배경
- 반응형 텍스트 크기

---

### 2. PainPoints 섹션 🔴
**파일**: `components/sections/pain-points-section.tsx`

**요구사항**:
- 3개 문제 카드
- 각 카드: 아이콘 + 제목 + 설명
- 호버 애니메이션
- Bento Grid 레이아웃
- 스크롤 트리거 애니메이션

**구현 내용**:
- `lucide-react` 아이콘 사용
- `Card` 컴포넌트 활용
- Intersection Observer로 스크롤 애니메이션

---

### 3. Demo 섹션 🔴 (가장 복잡)
**파일**: `components/sections/demo-section.tsx`

**요구사항**:
- 3개 질문 폼 (라디오, 체크박스, 슬라이더)
- 폼 검증 로직
- 로딩 상태 (스피너)
- 실시간 추천 결과 표시
- 결과 카드 (상품 3개)
- 에러 처리

**구현 내용**:
- `use-matching` 훅 활용
- `formStore` 연동
- `FormGroup`, `Slider` 컴포넌트 사용
- `RecommendationCard` 컴포넌트 생성 필요

---

### 4. Trust 섹션 🟡
**파일**: `components/sections/trust-section.tsx`

**요구사항**:
- 수치 카드 (Counter 애니메이션)
- 전문가 프로필 카드
- 보안 배지 (SSL, GDPR)
- 파트너 로고 월 (선택사항)

**구현 내용**:
- Counter 애니메이션 (숫자 카운트업)
- `ExpertCard` 컴포넌트 생성
- 배지 컴포넌트

---

### 5. HowItWorks 섹션 🟡
**파일**: `components/sections/how-it-works-section.tsx`

**요구사항**:
- 4단계 프로세스 다이어그램
- 각 단계 설명 텍스트
- 애니메이션 (스테거드 진입)

**구현 내용**:
- 단계별 아이콘 및 번호
- 스테거드 애니메이션 (순차적 등장)

---

### 6. Testimonial 섹션 🟡
**파일**: `components/sections/testimonial-section.tsx`

**요구사항**:
- 후기 카드 컴포넌트
- 모바일 캐러셀
- 페이징 인디케이터
- 사용자 프로필 사진

**구현 내용**:
- `TestimonialCarousel` 컴포넌트 생성
- Swiper 또는 자체 구현
- 반응형 캐러셀

---

### 7. Pricing 섹션 🟡
**파일**: `components/sections/pricing-section.tsx`

**요구사항**:
- 3개 요금제 카드
- 기능 체크리스트
- 권장 배지 (카드 2)
- 가격 표시

**구현 내용**:
- `PricingCard` 컴포넌트 생성
- 체크리스트 아이콘
- CTA 버튼

---

## 🎨 공통 디자인 원칙

### 접근성
- 모든 버튼에 `aria-label`
- 키보드 네비게이션 지원
- 시맨틱 HTML 사용
- 포커스 인디케이터 명확히

### 반응형
- 모바일: 1열
- 태블릿: 2열
- 데스크톱: 3-4열

### 다크 모드
- Tailwind `dark:` 클래스 사용
- 색상 대비 WCAG AA 준수

### 애니메이션
- `fade-in`, `slide-up` 효과
- Intersection Observer 활용
- `prefers-reduced-motion` 고려

---

## 📁 파일 구조

```
components/
├── sections/
│   ├── hero-section.tsx
│   ├── pain-points-section.tsx
│   ├── demo-section.tsx
│   ├── trust-section.tsx
│   ├── how-it-works-section.tsx
│   ├── testimonial-section.tsx
│   └── pricing-section.tsx
└── features/
    ├── recommendation-card.tsx
    ├── expert-card.tsx
    ├── testimonial-carousel.tsx
    └── pricing-card.tsx
```

---

## 🔄 통합 순서

1. Hero 섹션 → `app/page.tsx`에 통합
2. PainPoints 섹션 → 통합
3. Demo 섹션 → 통합 (가장 복잡)
4. Trust 섹션 → 통합
5. HowItWorks 섹션 → 통합
6. Testimonial 섹션 → 통합
7. Pricing 섹션 → 통합

---

## ✅ 완료 체크리스트

- [ ] Hero 섹션 컴포넌트
- [ ] PainPoints 섹션 컴포넌트
- [ ] Demo 섹션 컴포넌트
- [ ] Trust 섹션 컴포넌트
- [ ] HowItWorks 섹션 컴포넌트
- [ ] Testimonial 섹션 컴포넌트
- [ ] Pricing 섹션 컴포넌트
- [ ] `app/page.tsx` 통합
- [ ] 접근성 검증
- [ ] 반응형 테스트

