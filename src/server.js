import express from 'express';
import SocketIO from "socket.io";
import http from 'http';

const app = express()

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"))

//catch all url을 생성하려면 이렇게 하면 된다.
app.get("/*", (req, res) => res.redirect("/"))

const httpServer = http.createServer(app)
const wsServer = SocketIO(httpServer)

wsServer.on("connection", (socket) => {
    socket.on("join_room", (roomName, done) => {
        socket.join(roomName)
        done()
    })
})


const handleListen = () => console.log(`listening on http://localhost:3001`)
httpServer.listen(3001, handleListen)