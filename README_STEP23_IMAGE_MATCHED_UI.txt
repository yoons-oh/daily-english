STEP23 첨부 이미지 기준 UI 리뉴얼

이번 ZIP은 압축 해제 후 프로젝트 루트에 바로 덮어쓰기 가능한 구조입니다.

적용 위치:
C:\AI kg\daily-english

포함 파일:
src/layouts/AppLayout.tsx
src/pages/HomePage.tsx
src/styles/global.css

변경 내용:
- 첨부 이미지처럼 상단에 제목/이메일/로그아웃
- 그 아래 큰 카드형 메뉴 유지
- 홈 화면 큰 흰색 카드 + 보라/파랑 CTA 버튼
- 최근 학습 카드 디자인
- 하단 통계 카드
- 모바일에서도 메뉴가 2줄로 밀리지 않도록 메뉴 라벨 축약/정렬

적용 확인:
git status

정상:
modified: src/layouts/AppLayout.tsx
modified: src/pages/HomePage.tsx
modified: src/styles/global.css

반영:
git add src/layouts/AppLayout.tsx src/pages/HomePage.tsx src/styles/global.css
git commit -m "Apply image matched mobile UI"
git pull origin main --rebase
git push origin main
