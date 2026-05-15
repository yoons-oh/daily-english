STEP29 학습 화면 sticky 카드 문제 수정

문제:
- 오늘학습/대화상세 화면에서 '선택한 대화 / 영어 / 한글' 카드가 sticky로 고정됨
- 스크롤할 때 대화 문장 위에 겹쳐 보임

수정:
- sticky 요소를 static 처리해서 스크롤과 함께 자연스럽게 올라가게 수정
- 메인 하단 메뉴와 학습 액션 메뉴 2단 구조 유지
- 마지막 문장이 하단 메뉴에 가려지지 않도록 main padding-bottom 보정

적용 위치:
C:\AI kg\daily-english

포함 파일:
src/styles/global.css

반영:
git add src/styles/global.css
git commit -m "Fix study header sticky overlap"
git pull origin main --rebase
git push
