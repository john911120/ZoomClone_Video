import express from 'express';
import SocketIO from "socket.io";
import http from 'http';

// pug페이지들을 렌더링하기 위해 pug 설정한다.
const app = express()

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"))

//catch all url을 생성하려면 이렇게 하면 된다.
app.get("/*", (req, res) => res.redirect("/"))

function handleConnection(socket) {
    console.log(socket)
}

const server = http.createServer(app)
//IO서버를 생성
const wsServer = SocketIO(server)

wsServer.on("connection", socket => {
    socket.on("enter_room", (msg, done) => {
        console.log(msg)
        setTimeout(() => {
            done()
        }, 10000) 
    })
})


/* 웹 소켓을 사용한 코드
// import WebSocket from 'ws';

//const wss = new WebSocket.Server({server})

const sockets = []


wss.on("connection", (socket) => {
    sockets.push(socket)
    socket["nickname"] = "Anonymous"
    console.log("Connected to Browser ✅")
    socket.on("close", () => {
        console.log("Disconnected from the Client ❌")
    })
    socket.on("message", (msg) => {
        const message = JSON.parse(msg)
       // console.log(message.type, message.payload)
       // sockets.forEach(aSocket => aSocket.send(`${message}`))

       switch(message.type){
           case "new_message":
               sockets.forEach(aSocket => aSocket.send(`${socket.nickname}:${message.payload}`))
               break
           case "nickname":
               socket["nickname"] = message.payload
       }
      //  socket.send(message)
    })
})
*/

const handleListen = () => console.log(`listening on http://localhost:3001`)
server.listen(3001, handleListen)