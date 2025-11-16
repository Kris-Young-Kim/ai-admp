# 접근성 가이드

이 문서는 프로젝트의 웹 접근성 구현 가이드입니다.

## WCAG 2.1 AA 준수

이 프로젝트는 WCAG 2.1 AA 레벨을 준수합니다.

### 접근성 검증 도구 사용

브라우저 콘솔에서 다음 명령어로 접근성을 검증할 수 있습니다:

```typescript
import { logAccessibilityReport } from "@/lib/accessibility/wcag-checker";

// 접근성 리포트 출력
logAccessibilityReport();
```

또는 개발자 도구에서:

```javascript
// 개발 환경에서만 사용 가능
if (typeof window !== "undefined" && window.logAccessibilityReport) {
  window.logAccessibilityReport();
}
```

### 권장 검증 도구

1. **axe DevTools** (브라우저 확장 프로그램)
   - Chrome/Edge: [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-scanner/lhdoppojpmngadmnindnejefpokejbdd)
   - Firefox: [axe DevTools](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)

2. **WAVE** (웹 접근성 평가 도구)
   - [WAVE Extension](https://wave.webaim.org/extension/)

3. **Lighthouse** (Chrome DevTools)
   - Chrome DevTools → Lighthouse → Accessibility

## 구현된 접근성 기능

### 1. 접근성 도구 모음 (Accessibility Toolbar)

- 화면 확대/축소 (50% ~ 200%)
- 고대비 모드
- 폰트 크기 조절
- 줄 간격 조절
- 애니메이션 비활성화
- 설정 저장 (localStorage)
- 키보드 단축키 (Alt + A)

### 2. TTS (Text-to-Speech)

- 페이지 전체 읽기
- 선택 텍스트 읽기
- 읽기 속도 조절
- 음성 선택 (한국어/영어)
- 재생/일시정지/중지 컨트롤

### 3. 키보드 스캔 모드

- 자동 스캔 (시간 간격 설정)
- 수동 스캔 (스페이스바/엔터)
- 스캔 순서 시각화
- 포커스 하이라이트 강화

### 4. Skip Link

- 주 콘텐츠로 건너뛰기 링크
- 키보드 포커스 시에만 표시

### 5. ARIA Live Region

- 동적 콘텐츠 업데이트 알림
- 에러 메시지 접근 가능하게 제공
- 로딩 상태 접근 가능하게 표시

## ARIA 속성 가이드

### 버튼

```tsx
// 텍스트가 있는 버튼 (aria-label 불필요)
<Button>제출하기</Button>

// 아이콘만 있는 버튼 (aria-label 필수)
<Button variant="icon" aria-label="메뉴 열기">
  <MenuIcon />
</Button>
```

### 이미지

```tsx
// 의미 있는 이미지
<img src="..." alt="제품 설명 이미지" />

// 장식용 이미지
<img src="..." alt="" role="presentation" />
```

### 폼

```tsx
<FormItem>
  <FormLabel htmlFor="email">이메일</FormLabel>
  <FormControl>
    <Input id="email" type="email" />
  </FormControl>
  <FormDescription>이메일 주소를 입력하세요</FormDescription>
  <FormMessage />
</FormItem>
```

### 랜드마크

```tsx
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>
```

## 키보드 네비게이션

### 기본 키보드 단축키

- **Tab**: 다음 포커스 가능한 요소로 이동
- **Shift + Tab**: 이전 포커스 가능한 요소로 이동
- **Enter/Space**: 버튼 활성화
- **Esc**: 모달/다이얼로그 닫기
- **Alt + A**: 접근성 도구 모음 열기/닫기

### 포커스 관리

- 모든 인터랙티브 요소는 키보드로 접근 가능
- 포커스 인디케이터는 최소 2px 이상
- 포커스 트랩은 모달/다이얼로그에 적용

## 색상 대비

### WCAG 2.1 AA 기준

- 일반 텍스트: 4.5:1 이상
- 큰 텍스트 (18pt 이상): 3:1 이상

### 검증 방법

1. **axe DevTools** 사용
2. **WAVE** 확장 프로그램 사용
3. **Lighthouse** Accessibility 검사

## 스크린 리더 테스트

### 권장 스크린 리더

1. **NVDA** (Windows, 무료)
   - [NVDA 다운로드](https://www.nvaccess.org/)

2. **JAWS** (Windows, 유료)
   - [JAWS 다운로드](https://www.freedomscientific.com/products/software/jaws/)

3. **VoiceOver** (macOS/iOS, 내장)
   - macOS: Cmd + F5
   - iOS: 설정 → 접근성 → VoiceOver

4. **TalkBack** (Android, 내장)
   - 설정 → 접근성 → TalkBack

### 테스트 체크리스트

- [ ] 모든 버튼에 적절한 라벨
- [ ] 모든 링크에 명확한 목적 설명
- [ ] 폼 필드에 라벨 연결
- [ ] 이미지에 alt 텍스트
- [ ] 랜드마크 역할 명확히 지정
- [ ] 동적 콘텐츠 업데이트 알림
- [ ] 에러 메시지 접근 가능하게 제공

## 접근성 검증 체크리스트

### 개발 단계

- [ ] 모든 인터랙티브 요소에 키보드 접근 가능
- [ ] 포커스 인디케이터 명확히 표시
- [ ] ARIA 속성 적절히 사용
- [ ] 색상 대비 4.5:1 이상 확보
- [ ] 이미지에 alt 속성 제공
- [ ] 폼 필드에 라벨 연결
- [ ] 시맨틱 HTML 사용

### 배포 전

- [ ] axe DevTools로 검증
- [ ] WAVE로 검증
- [ ] Lighthouse Accessibility 점수 90+ 달성
- [ ] 스크린 리더로 실제 사용 테스트
- [ ] 키보드만으로 모든 기능 사용 가능 확인

## 참고 자료

- [WCAG 2.1 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA 사양](https://www.w3.org/TR/wai-aria-1.2/)
- [WebAIM 접근성 가이드](https://webaim.org/)
- [MDN 접근성 가이드](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

