# STEP22 모바일 메뉴/UI 리뉴얼

## 수정 이유

모바일에서 상단 메뉴가 길어져 2줄로 밀리는 문제가 있었습니다.

## 변경 내용

- 상단: 앱 제목 / 이메일 / 데스크톱 로그아웃만 표시
- 모바일 메뉴: 하단 고정 네비게이션으로 이동
- 메뉴 6개를 아이콘 + 라벨로 정리
- 홈 화면 카드형 모던 UI 적용
- 최근 학습 카드 디자인 개선
- 통계 카드 추가
- 모바일 safe-area 대응
- 전체 배경/폰트/버튼 스타일 개선

## 적용 방법

1. 압축 해제
2. 아래 폴더에 덮어쓰기

```text
C:\AI kg\daily-english
```

3. 실행 확인

```bash
npm run dev
```

4. Git 반영

```bash
git add src/layouts/AppLayout.tsx src/pages/HomePage.tsx src/styles/global.css
git commit -m "Improve mobile navigation and home UI"
git pull origin main --rebase
git push origin main
```
