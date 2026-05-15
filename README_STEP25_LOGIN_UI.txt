STEP25 로그인 화면 UI 리뉴얼

수정 내용:
- 기존 기본 로그인 UI 제거
- 모바일 앱 스타일 로그인/회원가입 화면 적용
- 로그인/회원가입 탭 전환
- 인디고/블루 그라데이션 디자인
- 입력창 포커스 스타일 개선
- 모바일 화면 기준 여백/카드/버튼 디자인 개선

적용 위치:
C:\AI kg\daily-english

ZIP 구조:
src/pages/LoginPage.tsx

적용 후 확인:
git status

정상:
modified: src/pages/LoginPage.tsx

반영:
git add src/pages/LoginPage.tsx
git commit -m "Improve login page UI"
git pull origin main --rebase
git push origin main
