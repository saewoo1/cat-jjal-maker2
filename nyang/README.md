### package.json

- 어떤 라이브러리들을 쓰고있는지, 어떤 명령어를 통해서 뭘 하는지 나와있음
- "scripts" : {} 명령어 저장해둘 수 있음

### github hompage에 어떻게 올려요?

- 그대로 갖다 박으면 안돼요. html은 브라우저에 띄우면 알아먹지만, 리액트껀 못알아들으니 잘 타일러줍시다.
- build 과정이 필요하다.
- CRA 내부에서 npm run build
- Browser에 JSX를 그대로 올리는게 아니라, build 폴더를 올리는거래
- npm install gh-pages
- script 내부에 "deploy": "gh-pages -d build" 추가 -> github pages를 통해서 build 폴더 올려라
- package.json 최상단에 "hompage": "https://saewoo1.github.io/cat-jjal-maker2" 추가. 슬래시 꼭 지워잉
- npm run build
- npm run deploy

### 어떤 기능을 넣고싶냐면요..

- 쓸데없이 화려하게
- 생성 버튼을 누를 때 고앵이 소리
- 실패 시 하악질 하는 소리
- 밑에 고양이가 걸어다니는 애니메이션
- 마우스 포인터 이미지

- 가능하면 분류도..?
