# 2단계 적용 방법

## 1. 파일 덮어쓰기

이 ZIP 안의 파일들을 기존 프로젝트에 덮어쓰기 하세요.

대상 폴더:

```text
C:\AI kg\daily-english
```

## 2. Supabase SQL 실행

Supabase Dashboard → SQL Editor → New query

`supabase/schema.sql` 내용을 전체 복사해서 실행하세요.

## 3. 개발 서버 재실행

```bash
Ctrl + C
npm run dev
```

## 4. 확인할 것

- `/login`에서 회원가입 가능
- 로그인 후 홈 이동
- 오늘의 대화가 Supabase DB에서 표시
- 학습 완료 버튼 클릭 시 기록 저장
- 복습에 추가 버튼 클릭 시 복습 목록 저장
- 복습 페이지에서 목록 확인
- 기록 페이지에서 학습 기록 확인

## 참고

Supabase 이메일 인증이 켜져 있으면 회원가입 후 이메일 인증을 해야 로그인됩니다.
테스트 단계에서는 Supabase Auth Settings에서 이메일 인증을 끌 수 있습니다.
