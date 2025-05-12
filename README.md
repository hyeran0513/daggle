## [한다글다글] FE 과제전형

### **📍 프로젝트 설명**

한다글다글에서 제공한 Swagger UI를 참고하여<br />
게시글 및 댓글 생성/수정/삭제 기능을 **React**를 활용하여 구현한 프로젝트입니다.

##### **📆 기간: 25-04-23 (수) ~ 25-04-28 (월)**

---

### **📍 면접 피드백 및 코드 확인**

https://blush-acoustic-105.notion.site/1f09af6ec6bf8069bcbad6dac819283f

---

### **📍 사용 기술**

| 분류          | 기술 스택         |
| ------------- | ----------------- |
| 상태 관리     | Zustand           |
| 스타일링 도구 | styled-components |
| 배포 방식     | Vercel            |

---

### **📍 설치 패키지**

| 패키지명                    | 설치 명령어                               |
| --------------------------- | ----------------------------------------- |
| react-router-dom            | `npm install react-router-dom`            |
| Zustand                     | `npm install zustand`                     |
| axios                       | `npm install axios`                       |
| styled-components           | `npm install styled-components`           |
| date-fns                    | `npm install date-fns`                    |
| react-icons                 | `npm install react-icons`                 |
| react-outside-click-handler | `npm install react-outside-click-handler` |
| react-spinners              | `npm install react-spinners`              |
| react-helmet-async          | `npm install react-helmet-async`          |
| framer-motion               | `npm install framer-motion`               |
| lodash                      | `npm install lodash`                      |
| react-responsive            | `npm install react-responsive`            |

---

### **📍 폴더 구조**

```
📦daggle
┣ 📂src
┃ ┣ 📂api # api 폴더
┃ ┃ ┗ 📜axiosInstance.js  # axios 인스턴스 설정 파일
┃ ┣ 📂assets  # 정적 자원 폴더
┃ ┃ ┗ 📂images  # 이미지 폴더
┃ ┃ ┃ ┣ 📂portfolio  # 포트폴리오 이미지 폴더
┃ ┃ ┃ ┃ ┣ 📜kosta.png
┃ ┃ ┃ ┃ ┣ 📜printy.png
┃ ┃ ┃ ┃ ┣ 📜sparta.png
┃ ┃ ┃ ┃ ┗ 📜sweet.png
┃ ┃ ┃ ┗ 📜logo.png  # 로고 이미지
┃ ┣ 📂components # 컴포넌트
┃ ┃ ┣ 📂comments # 댓글 관련 컴포넌트
┃ ┃ ┃ ┣ 📜Comment.jsx
┃ ┃ ┃ ┗ 📜CommentForm.jsx
┃ ┃ ┣ 📂layout # 레이아웃 관련 컴포넌트
┃ ┃ ┃ ┣ 📜Header.jsx
┃ ┃ ┃ ┣ 📜MobileHeader.jsx
┃ ┃ ┃ ┗ 📜SideBar.jsx
┃ ┃ ┣ 📂pagination # 페이징 관련 컴포넌트
┃ ┃ ┃ ┣ 📜PostWithInfiniteScroll.jsx
┃ ┃ ┃ ┗ 📜PostWithPagination.jsx
┃ ┃ ┣ 📂portfolio # 포트폴리오 관련 컴포넌트
┃ ┃ ┃ ┗ 📜PortfolioCarousel.jsx
┃ ┃ ┣ 📂posts # 게시글 관련 컴포넌트
┃ ┃ ┃ ┣ 📜PostCard.jsx
┃ ┃ ┃ ┣ 📜PostCardList.jsx
┃ ┃ ┃ ┗ 📜PostTitle.jsx
┃ ┃ ┣ 📂SEO # SEO 관련 컴포넌트
┃ ┃ ┃ ┗ 📜SEO.jsx
┃ ┃ ┗ 📂ui # UI 관련 컴포넌트
┃ ┃ ┃ ┣ 📜Button.jsx
┃ ┃ ┃ ┣ 📜FloatingButton.jsx
┃ ┃ ┃ ┣ 📜Loading.jsx
┃ ┃ ┃ ┣ 📜NoData.jsx
┃ ┃ ┃ ┣ 📜Pagination.jsx
┃ ┃ ┃ ┣ 📜PopOver.jsx
┃ ┃ ┃ ┣ 📜TextareaField.jsx
┃ ┃ ┃ ┗ 📜TextField.jsx
┃ ┣ 📂hooks  # 커스텀 훅 폴더
┃ ┃ ┣ 📜useAuthData.jsx  # 인증 관련 데이터를 처리하는 훅
┃ ┃ ┣ 📜useAuthForm.jsx  # 인증 폼을 처리하는 훅
┃ ┃ ┣ 📜useCommentData.jsx  # 댓글 데이터를 처리하는 훅
┃ ┃ ┣ 📜useCommentForm.jsx  # 댓글 작성 폼을 처리하는 훅
┃ ┃ ┣ 📜useInputChange.jsx  # 입력값 변경을 처리하는 훅
┃ ┃ ┣ 📜useIntersectionObserver.jsx  # Intersection Observer를 활용한 훅
┃ ┃ ┣ 📜usePostData.jsx  # 게시글 데이터를 처리하는 훅
┃ ┃ ┣ 📜usePostForm.jsx  # 게시글 폼을 처리하는 훅
┃ ┃ ┗ 📜useWindowWidth.jsx  # 창 크기를 처리하는 훅
┃ ┣ 📂layouts  # 레이아웃 폴더
┃ ┃ ┗ 📜MainLayout.jsx  # 메인 레이아웃 컴포넌트
┃ ┣ 📂pages  # 페이지 폴더
┃ ┃ ┣ 📜Home.jsx  # 홈 페이지
┃ ┃ ┣ 📜Login.jsx  # 로그인 페이지
┃ ┃ ┣ 📜NotFound.jsx  # 404 페이지
┃ ┃ ┣ 📜PostDetail.jsx  # 게시글 상세 페이지
┃ ┃ ┣ 📜PostEdit.jsx  # 게시글 수정 페이지
┃ ┃ ┗ 📜PostWrite.jsx  # 게시글 작성 페이지
┃ ┣ 📂routes  # 라우팅 폴더
┃ ┃ ┗ 📜router.jsx  # 라우터 설정 파일
┃ ┣ 📂services  # API 호출 및 서비스 로직 폴더
┃ ┃ ┣ 📜authService.jsx  # 인증 관련 서비스 파일
┃ ┃ ┣ 📜commentService.jsx  # 댓글 관련 서비스 파일
┃ ┃ ┗ 📜postService.jsx  # 게시글 관련 서비스 파일
┃ ┣ 📂stores  # 상태 관리 폴더 (Zustand)
┃ ┃ ┗ 📜authStore.js  # 인증 상태를 관리하는 파일
┃ ┣ 📂styles  # 스타일 폴더
┃ ┃ ┣ 📜globalStyles.js  # 글로벌 스타일 파일
┃ ┃ ┣ 📜mixins.js  # 믹스인 파일
┃ ┃ ┗ 📜theme.js  # 테마 스타일 파일
┃ ┣ 📂utils  # 유틸리티 폴더
┃ ┃ ┣ 📜format.js  # 포맷팅 유틸리티 파일
┃ ┃ ┗ 📜validation.js  # 검증 유틸리티 파일
┃ ┣ 📜App.jsx
┃ ┗ 📜main.jsx
┣ 📜.gitignore  # Git에서 무시할 파일 목록
┣ 📜favicon.ico  # 파비콘 파일
┣ 📜index.html
┣ 📜README.md
┗ 📜vite.config.js  # Vite 설정 파일
```

---

### **📍 전달 사항**

**[CORS 관련 이슈]** <br />

2025-04-24 (목) 08:47:53 <br />
localhost에서 CORS 이슈 발생하여 메일로 수정 요청

→

2025-04-25 (금) 15:57:07 <br />
한다글다글 담당자님께서 문제 해결 후 회신

<br />

**[토큰 갱신 500 에러 이슈 및 게시판 리스트 API에서 author 정보 누락]** <br />

2025-04-27 (일) 08:00:00 <br />
refreshToken 오류 및 게시판 리스트 조회 API에서 author 정보 누락 문제로 개선 요청

→

2025-04-28 (월) 09:09:31 <br />
한다글다글 담당자님께서 refreshToken 오류 수정 후, 게시판 리스트 조회 API 개선 사항에 대해 회신  
author 정보는 사용하지 말고 '익명의유저' 문구로 출력하도록 요청

<br />

**[배포 URL에서 PATCH CORS 이슈]**

2025-04-28 (월) 19:38:00 <br />
배포 URL에서 GET, POST, DELETE 요청은 정상 작동하지만, <br />
PATCH 요청에서 CORS 오류가 발생합니다. <br />
로컬 환경에서는 CORS 이슈 없이 정상 작동하여, <br />
로컬 환경에서 시연한 영상 링크를 첨부하였으니 확인 부탁드립니다.

---

### **📍배포 링크 및 시연 영상**

**⚠️주의**: 배포 URL에서 PATCH CORS 이슈로 인해, 게시판 및 댓글 수정이 정상적으로 작동하지 않습니다. <br />
로컬 환경에서 시연한 영상 링크를 첨부하였으니 확인 부탁드립니다. <br />

- **시연 영상**: [https://youtu.be/jY0Jdc1yty0](https://youtu.be/jY0Jdc1yty0)
- **배포 URL** : [daggle.vercel.app](https://daggle.vercel.app)

![image](https://github.com/user-attachments/assets/015e8965-bf8f-45b4-b6ed-ac70717700c3)

---

### **📍 구현 사항**

#### 📁 Banner

- [x] 4개 이미지로 배너 구성
- [x] 애니메이션 구현 (디자인 레퍼런스 참고)

#### 📁 GNB

##### 웹

- [x] 로그인 상태일 경우 유저 아이콘 노출
- [x] 비로그인 상태일 경우 ‘로그인’ 텍스트 노출
- [x] 유저 아이콘 클릭 시 닉네임 팝오버 노출

##### 모바일

- [x] 햄버거 아이콘 클릭 시 시트 노출
- [x] 로그인 상태일 경우 닉네임 노출
- [x] 비로그인 상태일 경우 ‘로그인’ 텍스트 노출

#### 공통

- [x] 로고 클릭 시 홈으로 이동
- [x] 홈에서 로고 클릭 시 동작 없음
- [x] 로그아웃 버튼 클릭 시 모달 노출
- [x] 로그아웃

#### 📁 로그인 페이지

- [x] 아이디 / 비밀번호 미 입력 제출 시 에러 메세지 노출
- [x] 로그인 성공 시 홈 또는 접근 시도한 페이지 이동
- [x] 로그인 실패 시 모달 노출
- [x] 로그인 상태일 경우 로그인 페이지 접근 불가능

#### 📁 홈페이지

##### 웹

- [x] 게시글 페이지 네이션
- [x] 페이지 당 10개 데이터 노출

##### 모바일

- [x] 게시글 무한 스크롤
- [x] 페이지 당 10개 데이터 노출
- [x] 게시글 클릭 시 상세 페이지로 이동
- [x] 로그인 여부에 따른 글 작성 버튼 클릭 핸들링

#### 📁 상세 페이지

- [x] 로그인 여부에 따른 댓글 작성하기 버튼 클릭 핸들링
- [x] 비로그인 상태일 경우 댓글 작성 버튼 비활성화
- [x] 로그인 상태일 경우 댓글 작성 버튼 활성화
- [x] 댓글 작성 버튼 클릭 시 댓글 작성
- [x] 본인 작성 게시글일 경우 수정 버튼 노출
- [x] 본인 작성 게시글일 경우 삭제 버튼 노출
- [x] 수정 버튼 클릭 시 게시글 작성 페이지로 이동
- [x] 삭제 버튼 클릭 시 삭제 모달 노출

#### 📁 글 작성 페이지

- [x] 폼 입력
- [x] 게시글 수정인 경우 변경 사항 없을 경우 저장 버튼 비활성화
- [x] 최소 작성 글자수 불만족 시 에러 메세지 노출
  - 제목은 1글자 이상
  - 내용은 10글자 이상 <br />
    (구현서에서는 5자 이상으로 되어 있으나, '주어진 디자인과 동일한 반응형 UI 제작 및 요구 사항 충족'이 구현 사항으로 명시되어 있어 디자인에서는 10자 이상으로 요구되었기에, 이를 기준으로 적용하였습니다.)
- [x] 저장 버튼 클릭 시 게시글 작성 / 수정
- [x] 비로그인 상태일 경우 글 작성 페이지 접근 불가
