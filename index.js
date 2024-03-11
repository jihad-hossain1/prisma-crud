const express = require('express');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const userRoute = require('./router/user.route')
const postRoute = require("./router/post.route");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: true}))
// app.use(cookieparser())

app.get("/", async (req, res) => {
  res.send({ message: "hello world" });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);


app.listen(8000,()=>{
    console.log("app is listen on port: 8000")
})