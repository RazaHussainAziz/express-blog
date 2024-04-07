process.loadEnvFile()
import express from "express";
import path from "path";
// import { config } from "dotenv";
// config();
import { dbConnection } from "./database/db.js";
import router from "./router/router.js";
import cookieParser from "cookie-parser";



const server = express();

dbConnection(process.env.MONGODB_URI);

server.set("view engine","ejs");
server.set("views",path.resolve("./views"))

server.use(express.json())
server.use(express.urlencoded({extended:false}))
server.use(cookieParser())
server.use(express.static('public'))
server.use('/user',router);


const port = process.env.PORT || 3000



server.get("/",(req,res)=>{
    res.render("home");
})







server.listen(port,()=>{console.log(`⚙ Server Started at port ${port}`)});


