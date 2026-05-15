STEP28 하단 메뉴 2단 분리 수정

문제:
- 메인 하단 메뉴와 학습 액션 메뉴가 둘 다 bottom:0을 사용해서 겹침
- 그래서 하나가 보이면 하나가 사라지는 것처럼 보임

수정:
- 메인 메뉴는 항상 맨 아래 유지
- 오늘학습/대화학습 액션 메뉴는 메인 메뉴 위로 이동
- TodayPage / ConversationPage 전체 파일을 갈아엎지 않고 CSS로 기존 action bar 위치를 보정
- AppLayout은 메인 하단 메뉴를 항상 표시

적용 위치:
C:\AI kg\daily-english

포함 파일:
src/layouts/AppLayout.tsx
src/styles/global.css

반영:
git add src/layouts/AppLayout.tsx src/styles/global.css
git commit -m "Separate main nav and study action bar"
git pull origin main --rebase
git push

확인:
- 홈/대화목록/복습/기록: 메인 하단 메뉴만 보임
- 오늘학습/대화상세: 위에는 완료/복습/듣기/녹음/쉐도잉, 맨 아래는 홈/오늘/대화목록/대화추가/복습/기록 둘 다 보임
