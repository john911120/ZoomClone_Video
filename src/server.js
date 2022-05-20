import express from 'express';

// pug페이지들을 렌더링하기 위해 pug 설정한다.
const app = express()

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"))

//catch all url을 생성하려면 이렇게 하면 된다.
app.get("/*", (req, res) => res.redirect("/"))

const handleListen = () => console.log(`listening on http://localhost:3000`)
app.listen(3000, handleListen)