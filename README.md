실제 시간에 기반하여 가상의 식물을 키울 수 있는 식물 키우기 시뮬레이션 게임, Growing Green입니다.

# MOTIVATION

### why plant?

예전부터 식물과 꽃을 좋아해 여러 번 직접 키우기를 시도했습니다. 하지만 꾸준히 식물의 상태를 확인하고, 물을 주고, 햇볕을 쬐어주기란 쉽지 않았습니다.

그래서 이를 미리 연습해볼 수 있는 사이트를 구상하게 되었습니다.

최대한 현재 환경과 비슷한 환경과 식물의 모습을 제공해 실제로 식물을 키우는듯한 느낌을 주는 사이트를 만들고자 하였습니다.

### 기술적 동기

저는 제가 작성한 코드를 통해 시각적으로 재미를 주는 효과를 구현하거나 태그들을 배치해 화면을 보기좋게 구성하는 작업에 큰 흥미를 느낍니다.

이번 프로젝트에서는 제가 그동안 해보고싶던 시각적인 효과들을 최대한 많이 구현해보고싶었고 css만으로는 부족할 것 같아 캔버스를 사용해 더욱 자유롭고 다양한 효과들을 구현해보았습니다.

# 관전 POINT

제가 프로젝트를 진행하면서 가장 중점적으로 고려했던 점은 **'어떻게 하면 사용자가 더 오래 머무르고싶은 사이트를 만들 수 있을까'** 였습니다.

그 방법이 시각적인 효과든, 기술적인 매력이든 사용자가 이 사이트에 최대한 오래 머무르게 하고싶었고 또 다시 찾아오게 만들고싶었습니다. 사이트를 구경하시면서 사용자들을 이 사이트에 최대한 오래 머무르게 하기 위한 제 노력을 찾아보시면 더욱 재미있으실 거라 생각합니다.

# Deploy

**frontend는 Netlify를 이용해 배포하였고 backend는 AWS ElastickBeanstock을 이용하였습니다.**

[Growing Green 배포 링크](http://growing-green.online)

# 프로젝트 일정

**프로젝트는 2021년 9월 27일부터 2021년 10월 15일까지 총 3주간 진행되었습니다.**

- 1주차 : 아이디어 구상 및 기획 단계
  프로젝트 일정 칸반 작성
  대략적인 사이트 디자인 구상
  데이터베이스 스키마 작성
- 2주차 ~ 3주차: 개발 단계
- 구체적인 개발 과정이 궁금하시다면 클릭해주세요:)
  **<FRONTEND>**
  이미지 편집
  공통 컴포넌트(Button, Loading, Error)
  styled-conponent theme provider를 이용한 css 스타일링
  firebase google auth를 이용한 로그인
  PIXI를 활용한 식물 페이지 UI
  - 식물 움직이는 효과
  - 식물 자라나는 효과
  - 블라인드 열고 닫는 효과
  - 물조리개를 이용해 물 주는 효과
  - 게이지 차오르는 효과
  - 식물 죽는 효과
    날씨 Api를 이용해 현재 날씨, 온도 화면에서 보여주기
    Puppeteer를 활용한 식물 검색 페이지 UI
  **<BACKEND>**
  User, Plants 모델 스키마 작성
  Error 클래스 상속을 통한 에러핸들링
  **\***- api 목록\*
  POST users/login : 새로운 유저 db에 저장, 토큰 생성
  GET plants : 해당 유저의 모든 식물 정보 가져오기
  POST plants/new : 새로운 식물 추가
  PUT plants/:plantId : 특정 식물 정보 업데이트  
   PUT plants/ : 해당 유저의 전체 식물 정보 업데이트
  DELETE plants/:plantId : 특정 식물 삭제
  GET search/ : 크롤링을 통해 검색어에 따른 식물 이름 리스트 가져오기
  GET search/:number : 식물 번호에 따라 특정 식물 정보 가져오기

# 기술 스택

(MERN stack)

- **Frontend**

  - firebase auth
  - React
  - Redux
  - PIXI
  - date-fns
  - puppeteer
  - styled-component
  - Jest, React Testing library, cypress

- **Backend**
  - Express
  - MongoDB, Mongoose
  - mocha, chai, supertest

# ISSUE

**개발 과정중에 직면했던 문제들과 해결방안, 그리고 그 과정에서 배운점들입니다.**

- PIXI 관련
  - state를 이용해 상태를 변화시키지 못함
  - 가독성과 관심사의 분리를 위한 로직 분리
  - 0으로 시작하면 게이지가 차오르지 않음, 블라인드가 내려와있는걸로 시작하면 첫 클릭시 제대로 동작하지 않음
- react 에러 핸들링
- express 에러 핸들링
- 이미지 로딩 최적화
  - 캔버스에 쓰이는 이미지
  - CRA에 쓰이는 이미지
- Button 컴포넌트 재사용 부트스트랩에서처럼 버튼의 테마와 색상을 지정해 재사용성 높은 컴포넌트를 작성하고자 하였습니다.
- redux thunk vs. redux saga
- 배포 이후 puppeteer를 사용한 요청이 제대로 수행되지 않음

# After Deploy
