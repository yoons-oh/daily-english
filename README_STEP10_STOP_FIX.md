# STEP10 TTS 정지 버튼 수정

## 수정 내용

전체 듣기 중 정지 버튼을 눌러도 다음 문장이 계속 재생되는 문제를 수정했습니다.

## 원인

브라우저 TTS는 `speechSynthesis.cancel()`로 현재 음성은 멈추지만,
기존 코드에서는 전체 듣기 반복문이 다음 문장을 계속 실행했습니다.

## 해결

- stopRequestedRef 추가
- 정지 버튼 클릭 시 반복문 완전 중단
- 전체 듣기 재생 중 다음 문장으로 넘어가기 전 정지 여부 확인
- 컴포넌트 종료 시 TTS 자동 정지

## 적용 방법

1. ZIP 압축 해제
2. 아래 폴더에 덮어쓰기

```text
C:\AI kg\daily-english
```

3. 개발 서버 재실행

```bash
Ctrl + C
npm run dev
```
