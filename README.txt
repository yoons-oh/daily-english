Vercel vite Permission denied 오류 수정

오류:
sh: line 1: /vercel/path0/node_modules/.bin/vite: Permission denied

수정:
- .bin/vite 실행 대신 node로 vite.js 직접 실행
- package.json build 수정
- vercel.json buildCommand 수정

적용:
1. 압축 해제
2. package.json, vercel.json을 프로젝트 루트에 덮어쓰기
   C:\AI kg\daily-english

3. Git 반영:
git add package.json vercel.json
git commit -m "Fix Vercel vite permission issue"
git pull origin main --rebase
git push origin main

4. Vercel 자동 배포 확인
