# 2022-1Software Capstonedesign

### prof. Lee 백준 프로그래밍 저지 문제 분류/추천 서비스

---

<details><summary>#1 Project Setting/Documentation</summary>
  
  #### Contributors
  |No.|Student_ID|Dev_ID|GitHub_ID|Name|
  |--|:--:|--:|--|--|
  |`1`|_201732009_|`N`|`N`n98|김윤서|
  |`2`|_201732024_|`S`|`S`tyx2021|이영수|
  |`3`|_201732028_|`L`|`L`EEHYUNBOK|이현복|
  |`4`|_201736023_|`A`|`A`hnseokbeom|안석범|
  #### 회의록  
  |No.|방식|주제|회의내용|날짜|
  |--|--|--|--|--|
  |`0.` |*Off*|Full|팀 결성 및 역할 배분|2022-03-08|
  |`1.` |*Off*|Full|프로젝트 기획 및 구상 + [부가 기능](#추가-구현-기능)|2022-03-09|
  |`2.` |*Off*|Full|각 파트별 예제 연습|2022-03-11|
  |`3.` |*Off*|Full|기획안 토대 컴포넌트 기획/진행상황 공유|2022-03-15|
  |`4.` |*Off*|Front|화면 구상 기획, 레이아웃 작성|2022-03-18|
  |`5.` |*Off*|Full|작업 내용 공유/단체 스터디, 의견 교환|2022-03-21|
  |`6.` |*On*|Full|_지도교수 피드백, 개발 방향성 수정_|2022-03-22|
  |`7.` |*Off*|Full|백-프론트 협업 회의|2022-03-23|
  |`8.` |*Off*|Front|_프론트엔드 user페이지 화면 개발 회의_|2022-03-27|
  |`9.` |*On*|Back|_크롤링 구상 및 테스트_|2022-03-29|
  |`10.` |*Off*|Full|정기 회의<br/>기획 보완/구현 계획 수립<br/>프레젠테이션 준비/계획서 작성|2022-03-30|
  |`11.` |*On*|Front|_기획안 PT/Other Team PT/Front-layout|2022-04-05|
  |`12.` |*Off*|Full|Front-User Page imp, QnA Page layout<br>Back-Crawling, MySql Peristalsis|2022-04-06|
  |`13.`|*On*|Full|_개발 진척 보고/개발 로드맵 보완|2022-04-12|
  |`14.`|*Off*|Full|풀타임 회의-브랜치/이슈 정리, 프론트-백 연동|2022-04-13|
  |`15.`|*Off*|Full|풀타임 회의-전체 페이지 구현, AWS 연동|2022-04-19|
  |`16.`|**|||2022-04-00|
  ##### TODO
  |No.|Dev|주제|목표|날짜|
  |--|--|--|--|--|
  |`1.`|`N`|D|Oracle Cloud|~2022-04-13|
  |`1.`|`S`|F|Ranking Page|~2022-04-13|
  |`1.`|`L`|F|QnA Page|~2022-04-13|
  |`1.`|`A`|B|Crawling/Server|~2022-04-13|
  ##### References
  - [JS 개발 환경 설정_기본](https://webnautes.tistory.com/1473)
  - [React 기본 세팅](https://blog.ull.im/engineering/2018/11/30/using-react-in-vs-code.html)
  - [React 기본 세팅시 오류](https://stackoverflow.com/questions/68857411/npm-warn-deprecated-tar2-2-2-this-version-of-tar-is-no-longer-supported-and-w)
  - [ ㄴ Solution 2](https://exerror.com/npm-warn-deprecated-tar2-2-2-this-version-of-tar-is-no-longer-supported-and-will-not-receive-security-updates-please-upgrade-asap/)
  - [React 터미널 권한 세팅](https://hellcoding.tistory.com/entry/VSCode-%EC%98%A4%EB%A5%98-%EC%9D%B4-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%97%90%EC%84%9C-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%8B%A4%ED%96%89%ED%95%A0-%EC%88%98-%EC%97%86%EC%9C%BC%EB%AF%80%EB%A1%9C)
  - [커밋 통합](https://korband.tistory.com/33)
  
  </details>

<details><summary>#2 Front-MainPage</summary><div markdown="1">
  
  ## Implements-#2
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |||||
  
  ## Errors-#2
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |react의 <br>페이지간 이동 기능을 <br>알지 못함|Route로 경로를 정하고 <br>Link로 경로로 이동시키면 된다는 것을 깨달음 |2022-03-21|`S`|
  |login, main, signup의 <br>css가 모든 컴포넌트에 <br>중첩 적용되어 문제|전역 css인 common2.css는 .scss로 변경 후 <br>app.js에 적용하고 각 컴포넌트에 적용할 각 css들은 <br>scss로 변경 후 최상위 태그에 적용|2022-03-21|`S`|
  |react에서 table 안에 바로<br>tr 태그 사용 시 오류| table 안에 thead 태그 or tbody 태그를 쓰고 tr 태그를 사용해야 함<br>(이유 = React가 rerender를 진행할 때,<br>DOM tree가 예상과는 달리 진행될 수 있으므로)|2022-03-22|`L`|
  
  </details>

<details><summary>#3 Front-User Profile</summary>
  
  ## Implements-#3
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |구현|그래프와 테이블을 세로가 아닌 가로로 변경|2022-04-06|`S`|
  |구현|난이도 분포 테이블 열고 접기 기능 구현|2022-04-10|`S`|
  
  ## Errors-#3
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |iframe solved 연결 문제|solved의 유저페이지를 직접 연결하면 404 에러가 발생<br>solved의 유저페이지/history로 우회하여 문제 해결|2022-03-25|`L`|
  |iframe안의 크기를 페이지간 이동할<br>경우 일정하게 표시해야함|inline style의 height를 100vh로 설정하여 해결<br>vh = viewport height <br>현재 실행중인 스크린 크기에 맞춰 상대적 크기를 반환|2022-03-25|`S`|
  |map 함수에서 key값 미사용 오류|react에서 map()메서드를 사용하기 위해서는 배열마다 독립적인 key값을 설정 해줘야 함<br>불필요한 리렌더링을 방지|2022-04-05|`L`|
  |table태그 안 2단 maping에 의한<br>리액트 구조 문제|이미지를 table태그 안에 넣을 경우 2단 maping과<br>thead와 tbody가 강제되는 리액트 특성이 존재해<br>그래프를 이미지로 테이블에 넣지않고 따로 분리|2022-04-06|`S`|
  |a태그에서 target 속성 _blank의 보안 문제|a태그에 target을 _blank로 할 경우 오류메시지 출력됨<br>구글링을 통해 알아본 결과 피싱사이트 방지를 위함임을 확인<br>rel='noopener noreferrer'속성을 추가함으로 피싱방지 오류 해결|2022-04-10|`S`|
  |난이도 분포와 태그 분포의 배경색을 위한 공간 나누기|기존 float방식으로 나누었을 때 아래의 태그 분포 div가 보이지 않게 난이도 분포까지 공간을 같이 사용함<br>배경색이 겹치는 문제 발생, 이를 해결하기 위해 'overflow=hidden'속성 사용, 겹치는 부분은 잘라버림|2022-04-10|`S`|
  |난이도 분포 테이블 열고 접기 기능구현을 위한<br>useState() 배열접근 공부|각 티어 이름을 클릭했을 경우 상세 정보 테이블이 열리도록 구현하고 싶음<br>티어 수 크기의 배열을 useState() false로 각 초기화하고 클릭할 때마다 !open 하도록 구현|2022-04-10|`S`|
  |내부 스크롤 기능 활성화 하되 스크롤바 제거|내부 스크롤 있는 태그에  -ms-overflow-style: none;  적용 <br>내부 스크롤 태그 아래에 ::-webkit-scrollbar { display: none; } 적용|2022-04-20|`L`|

  </details>

<details><summary>#4 Front-Algorithm/Problem Suggestion</summary>
  
  ## Implements-#4
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |||||
  
  ## Errors-#4
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |||||
  
  </details>

<details><summary>#6 Collaborations</summary>
  
  ## Implements-#6
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |||||
  
  ## Errors-#6
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |||||
  
  </details>
  
<details><summary>#7 Back-Node/MySql connection</summary><div markdown="1">
  
  ## Implements-#7
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |테스트|MySql DB와 Node.js Server 연동.<br>서버에서 실행한 쿼리 결과를 json으로 파싱|2020-03-24|`A`|
  
  ## Errors-#7
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |1번 문제 <br>mysql 연동 문제|검색을 해보니 connection.end()를 사용하면 안되었는데 <br>connection.end()를 사용하여서현재 json으로 <br>값이 도출이 되지 않았습니다 그래서 <br>.end()를 주석처리 하고 진행하였다.|2022-03-21|`A`|
  |2번 문제 <br>pullrequest|새로운 브랜치를 만든 후(github상에 있지 않는) github remote를 하고, <br>필요파일을 만든다 그 후에 git pull origin main을 한다 그 이후에 vscode를 이용해서<br>github pullrequest라는 플러그인을 이용하여 해결|2022-03-21|`A`|
  |3번 문제 <br>pullrequest|inflearn공부를 통하여 실습한 sql connect 풀 리퀘스트를 하려하였지만, <br>git pull에서부터 문제가 생겨서 <br>git pull origin main --allow-unrelated-histories로  연결하여서 해결하였다.|2022-03-22|`A`|
  |||2022-03-22|`A`|
  
  </details>
  
<details><summary>#16 Back/Crawling_Practice</summary><div markdown="1">
  
  ## Implements-#16
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |||||
  
  ## Errors-#16
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |1번 문제 크롤링 시<br>Jsoup 사용안될 때|https://mavenrepository.com<br>->org.jsoup 검색<br>->Jsoup Java HTML Parser<br>jsoup 최신버전 클릭<br>->pom.xml파일에br->dependencies에 추가하기|2022-03-25|`A`|
  |2번 문제 <br>백준 유저페이지<br>크롤링|맞은 문제, 시도했지만 맞추지 못한 문제,<br>번외 문제 등의 구분이<br>명확하지 않아서 헤매었지만,URL링크 자체를 변경하여 해결함|2022-03-27|`A`|
  |||||
  
  </details>  
  
<details><summary>#17 Front-QnA Board</summary><div markdown="1">
  
  ## Implements-#17
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |구현|익명이되 비밀번호 설정 후<br>수정/작성자 확인 가능|2022-03-25|`L`|
  |예정|QnA 작성자 및 QnA 내용을 DB에 넣고 수정 가능하게 구현|2022-04-20|`L`|
  
  ## Errors-#17
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |setState 데이터 추가 시 기존 데이터에 덧붙이기|setState사용시 const [test, setTest] = useState([]) 인 경우 <br> setTest([...test, 추가 내용])이렇게 해 주어야 기존에 있던 test에 추가 내용을 덧붙이기 가능|2022-04-06|`L`|
  |QnA의 답변 생성 시 생성 이후에 추가된 user는 QnA의 답변 작성 불가 오류|오류 원인 : QnA.js인 상위 컴포넌트에서 innerComment.js인 하위 컴포넌트로 user의 데이터를 생성시에만 전송하여 추가 불가<br>해결 방법 : QnA.js인 상위 컴포넌트에서 user의 존재 여부를 확인하는 compare 함수를 innerComment.js인 하위 컴포넌트로 전송하여 QnA의 답변 추가할때만 compare함수를 호출하여 작성 가능 여부 판별|2022-04-19|`L`|
  
  </details>  
  
<details><summary>#21 DB-Database Build/Implement</summary>
  
  ## Implements-#21
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |진행|설계대로 DB 구축/보완|2022-04-06|`N`|
  |실패|Oracle Cloud 사용 시도<br>payment 카드 등록 모두 오류.<br>다른카드, 상담사 연결 시도-실패|2022-04-15|`N`|
  |완료|AWS-서버 구축/Mysql DB 구축|2022-04-16|`N`|
  - [Forward Engineering](https://thisisprogrammingworld.tistory.com/124)
  - [LINUX 강의노트](https://o365skhu-my.sharepoint.com/personal/lsj_office_skhu_ac_kr/_layouts/15/onedrive.aspx?originalPath=aHR0cHM6Ly9vMzY1c2todS1teS5zaGFyZXBvaW50LmNvbS86ZjovZy9wZXJzb25hbC9sc2pfb2ZmaWNlX3NraHVfYWNfa3IvRWozazFqWE1jTnBPc1R5UWZ3VjllUVVCMG43NHZncmNjczhTQTdURlhyNG1JZz9ydGltZT1MclFHVTZqbzEwZw&id=%2Fpersonal%2Flsj%5Foffice%5Fskhu%5Fac%5Fkr%2FDocuments%2F%EC%88%98%EC%97%85%5F%EA%B3%B5%EC%9C%A0%2F%EC%A7%80%EB%82%9C%20%EA%B0%95%EC%9D%98%2Fserver%5F2021%5F2%ED%95%99%EA%B8%B0%2Flinux)
  
  ## Errors-#21
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |Oracle Cloud 계정 생성 실패|Payment 인증을 위한 카드 등록 실패<br>AWS에선 정상적으로 인증되는 카드도 실패<br>오라클 고객센터를 통한 상담 시도<br>정상적 소통 불가. 문제 해결 실패<br>AWS 서버 구축으로 우회|2022-04-15|`A`|
  
  </details>

<details><summary>#26 Back|DB-DB Connection</summary>
  
  ## Implements-#26
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |완료|Local Node.js-AWS Mysql 단순 연동(Get)|2022-04-16|`N`|
  
  ## Errors-#26
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |서버 외부<br>접속 불가|bind-adress 해제, User grant|2022-04-16|`N`|
  |||||
  
  </details>

  <details><summary>#27 Front-RankPage</summary>
  
  ## Implements-#27
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |구현|랭킹 페이지 UI 구현|2022-04-13|`S`|
  
  ## Errors-#27
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |||||
  
  </details>
 
<details><summary>#32 Front-AssignmentsPage</summary>
  
  ## Implements-#32
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |구현|채점 페이지 UI 구현|2022-04-19|`S`|
  
  ## Errors-#32
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |textarea태그의 placeholder에만 값 설정하기|사용자 입력 값과 다르게 힌트에만 css서식을 적용하고자 함<br>css시트에서 ::placeholder로 콜론(:)2개 선택자를 사용하면 됨|2022-04-19|`S`|
  
  </details>

<details><summary>#34 Back-React-Nodejs connection</summary>
  
  ## Implements-#34
  |구현|구현 중점|날짜|Dev|
  |--|--|--|--|
  |진행|DB데이터 React에서 사용|2022-04-21|A|
  |성공(진행 중)|DB데이터 React에서 사용|2022-04-25|`A`|
  
  
  ## Errors-#34
  |문제점|해결방식|날짜|Dev|
  |--|--|--|--|
  |Port연결 문제|nodejs와 mysql연동까지는 localhost로 연결이되지만,<br> React로 값을 보내줄 때 127.0.0.1로 해주어야 함|2022-04-21|`A`|
  
  
  </details>

<details><summary>#X Static contents</summary>
  
  ### 개발 방향성
  - **알고리즘 카테고리별 문제 정렬/제공**(first) >> 알고리즘 추천(second)
  
  </details>

## 추가 구현 기능

- 사용자간 의견 교류/질의응답용 게시판
- 게시판 기여 정도에 따른 리워드
- 코딩 테스트/과제 풀이
