STEP27 하단 메뉴 복구

문제:
- /conversation/* 화면에서도 하단 메뉴가 숨겨짐

수정:
- /today 에서만 하단 메뉴 숨김
- 대화 상세 화면에서는 하단 메뉴 다시 표시

적용:
C:\AI kg\daily-english 에 덮어쓰기

반영:
git add src/layouts/AppLayout.tsx
git commit -m "Fix bottom navigation visibility"
git pull origin main --rebase
git push
