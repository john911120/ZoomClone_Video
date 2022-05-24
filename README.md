# Noom

Zoom Clone using NodeJS, WebRTC and Websockets.

환경 설정 방법
0. 프로젝트 생성
1. package.json에서 스크립트, 메인을 삭제
2. README.md파일 생성
3. npm install nodemon -D 터미널에서 설치
4. babel.config.json , nodemon.json src폴더 생성후 내부에 server.js파일을 생성
5. 터미널에서 git init .
6. 터미널에서 바벨을 설치한다.
(npm install babel/core @babel/cli @babel/node -D)
7. .gitignore을 만들어준다.(윈도)
    touch .gitignore(맥)
 다음 /node_modules를 추가해준다.
8. babel.config.json , nodemon.json 파일 내부 채우기
- nodemon.json
{
    "exec":"babel-node src/server.js"
}

- babel.config.json
{
    "presets":["@babel/preset-env"]
}
- @babel/preset-env 를 터미널에서 추가로 설치해준다.
9. package.json에 코드를 추가한다.
"scripts" : {
    "dev":"nodemon"
}

10. npm install express 터미널 설치
11. npm install pug 터미널 설치
12. npm run dev 으로 터미널에서 실행하면 동작한다.

-- git push -u origin main 명령어로 
작업이 완료되었다면 커밋을 실행시켜줘야한다.
그리고 동기화 까지 해주면 프로젝트 홈페이지에서 커밋된 내용을 확인 할 수 있다.

13. npm i socket.io 터미널 설치
14. socket.io 실습을 위해 app.js 기존 내용 삭제 / server.js 소스코드 일부 변경  /home.pug 기존 내용 삭제 다음과 같은 파일 삭제 변경 처리하였다.