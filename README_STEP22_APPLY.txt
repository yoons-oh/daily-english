STEP22 모바일 UI 리뉴얼 적용 파일

이번 ZIP은 압축 내부 최상위에 바로 src 폴더가 있습니다.
따라서 아래 경로에 압축을 풀고 덮어쓰기 하면 됩니다.

적용 위치:
C:\AI kg\daily-english

압축 해제 후 아래 파일들이 실제로 바뀌어야 합니다.

C:\AI kg\daily-english\src\layouts\AppLayout.tsx
C:\AI kg\daily-english\src\pages\HomePage.tsx
C:\AI kg\daily-english\src\styles\global.css

확인 명령:
git status

정상이라면 아래처럼 나와야 합니다.

modified: src/layouts/AppLayout.tsx
modified: src/pages/HomePage.tsx
modified: src/styles/global.css

반영 명령:
git add src/layouts/AppLayout.tsx src/pages/HomePage.tsx src/styles/global.css
git commit -m "Improve mobile navigation and home UI"
git pull origin main --rebase
git push origin main

로컬 확인:
npm run dev
브라우저 Ctrl + F5
