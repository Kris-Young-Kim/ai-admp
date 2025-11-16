# React Aria 컴포넌트 통합 계획

> 작성일: 2025년 1월
> 목표: React Aria를 통한 접근성 향상 및 키보드 네비게이션 자동화

---

## 📋 개요

React Aria는 Adobe에서 개발한 접근성 최적화 라이브러리입니다. 기존 Radix UI 기반 컴포넌트에 React Aria를 통합하여 접근성을 더욱 향상시키고, 키보드 네비게이션과 포커스 관리를 자동화합니다.

### 현재 상태

- ✅ Radix UI 기반 컴포넌트 (Button, Input, Dialog 등)
- ✅ 기본적인 접근성 구현 완료 (ARIA 속성, 키보드 네비게이션)
- ✅ 접근성 도구 모음 구현 완료

### 통합 목표

- 🔄 기존 컴포넌트를 React Aria로 점진적 마이그레이션
- 키보드 네비게이션 자동 지원 강화
- 포커스 관리 자동화
- 스크린 리더 최적화

---

## 🎯 통합 전략

### 접근 방식: 점진적 마이그레이션

기존 Radix UI 컴포넌트를 완전히 교체하는 대신, React Aria의 훅과 유틸리티를 활용하여 접근성을 향상시키는 방식으로 진행합니다.

**이유**:
- Radix UI는 이미 접근성이 잘 구현되어 있음
- 완전 교체는 리스크가 큼
- 점진적 개선이 더 안전하고 효율적

### 통합 범위

1. **우선순위 높음** (필수)
   - Button 컴포넌트: `useButton` 훅 통합
   - Input 컴포넌트: `useTextField` 훅 통합
   - FormGroup 컴포넌트: `useRadioGroup`, `useCheckboxGroup` 훅 통합

2. **우선순위 중간** (권장)
   - Dialog 컴포넌트: `useDialog` 훅 통합
   - Slider 컴포넌트: `useSlider` 훅 통합

3. **우선순위 낮음** (선택사항)
   - 기타 컴포넌트들

---

## 📦 패키지 설치

### 필요한 패키지

```bash
pnpm add @react-aria/interactions @react-aria/focus @react-aria/utils
```

**참고**: `@react-aria/components`는 고수준 컴포넌트를 제공하지만, 현재 프로젝트는 Radix UI를 사용 중이므로 저수준 훅(`@react-aria/interactions`)을 사용합니다.

---

## 🔧 구현 계획

### Phase 1: 패키지 설치 및 기본 설정

1. **패키지 설치**
   ```bash
   pnpm add @react-aria/interactions @react-aria/focus @react-aria/utils
   ```

2. **Provider 설정** (필요 시)
   - `I18nProvider` 설정 (다국어 지원)
   - `Provider` 설정 (테마 등)

### Phase 2: Button 컴포넌트 마이그레이션

**파일**: `components/ui/button.tsx`

**변경 사항**:
- `useButton` 훅 통합
- 키보드 이벤트 처리 자동화
- 포커스 관리 자동화
- 스크린 리더 최적화

**예상 효과**:
- 키보드 네비게이션 자동 지원
- 포커스 상태 자동 관리
- 스크린 리더 호환성 향상

### Phase 3: Input 컴포넌트 마이그레이션

**파일**: `components/ui/input.tsx`

**변경 사항**:
- `useTextField` 훅 통합
- 라벨 연결 자동화
- 에러 메시지 연결 자동화
- 키보드 이벤트 처리

**예상 효과**:
- 폼 접근성 향상
- 스크린 리더 최적화

### Phase 4: FormGroup 컴포넌트 마이그레이션

**파일**: `components/ui/form-group.tsx`

**변경 사항**:
- `useRadioGroup` 훅 통합 (Radio 그룹)
- `useCheckboxGroup` 훅 통합 (Checkbox 그룹)
- 키보드 네비게이션 자동화 (화살표 키)

**예상 효과**:
- 라디오/체크박스 그룹 내 키보드 네비게이션 향상
- 스크린 리더 최적화

### Phase 5: Dialog 컴포넌트 마이그레이션

**파일**: `components/ui/dialog.tsx`

**변경 사항**:
- `useDialog` 훅 통합
- 포커스 트랩 자동화
- ESC 키 처리 자동화

**예상 효과**:
- 모달 접근성 향상
- 포커스 관리 자동화

### Phase 6: Slider 컴포넌트 마이그레이션

**파일**: `components/ui/slider.tsx`

**변경 사항**:
- `useSlider` 훅 통합
- 키보드 네비게이션 자동화 (화살표 키, Home, End)

**예상 효과**:
- 슬라이더 키보드 접근성 향상

---

## ✅ 검증 방법

### 접근성 테스트

1. **키보드 네비게이션 테스트**
   - Tab 키로 모든 요소 접근 가능한지 확인
   - 화살표 키로 그룹 내 네비게이션 가능한지 확인
   - Enter/Space로 버튼 활성화 가능한지 확인

2. **스크린 리더 테스트**
   - NVDA (Windows) 또는 VoiceOver (macOS)로 테스트
   - 모든 요소에 적절한 라벨이 읽히는지 확인

3. **자동화 도구 테스트**
   - axe DevTools 실행
   - Lighthouse Accessibility 점수 확인

---

## 📝 주의사항

### 기존 기능 유지

- Radix UI의 기존 기능은 유지
- React Aria는 접근성 향상 목적으로만 사용
- 스타일링은 기존 Tailwind CSS 유지

### 호환성

- React 19와 호환 확인
- Next.js 15.5.6과 호환 확인
- 기존 컴포넌트 API 유지

---

## 🚀 예상 효과

### 접근성 향상

- ✅ 키보드 네비게이션 자동 지원
- ✅ 포커스 관리 자동화
- ✅ 스크린 리더 최적화
- ✅ WCAG 2.1 AA 준수 강화

### 개발자 경험

- ✅ 접근성 코드 작성 부담 감소
- ✅ 일관된 접근성 패턴
- ✅ 자동화된 키보드 이벤트 처리

---

## 📚 참고 자료

- [React Aria 공식 문서](https://react-spectrum.adobe.com/react-aria/)
- [React Aria GitHub](https://github.com/adobe/react-spectrum)
- [React Aria 가이드](https://react-spectrum.adobe.com/react-aria/getting-started.html)

