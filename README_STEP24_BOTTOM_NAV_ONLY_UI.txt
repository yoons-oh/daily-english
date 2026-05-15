STEP24 하단 메뉴 전용 UI 리뉴얼

요청 반영:
- 상단 메뉴 완전 삭제
- 메뉴는 하단에만 표시
- 첨부 이미지 스타일의 홈 화면 유지
- 제목/이메일/로그아웃은 상단 헤더에만 표시
- 하단 고정 네비게이션 6개 메뉴
- 모바일/데스크톱 모두 하단 메뉴 사용

적용 위치:
C:\AI kg\daily-english

ZIP 구조:
src/layouts/AppLayout.tsx
src/pages/HomePage.tsx
src/styles/global.css

적용 후 확인:
git status

정상:
modified: src/layouts/AppLayout.tsx
modified: src/pages/HomePage.tsx
modified: src/styles/global.css

반영:
git add src/layouts/AppLayout.tsx src/pages/HomePage.tsx src/styles/global.css
git commit -m "Apply bottom nav only mobile UI"
git pull origin main --rebase
git push origin main
