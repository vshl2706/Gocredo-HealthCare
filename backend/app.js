import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express();

app.use(cors({
    origin:process.env.CORS_URL,
    credentials:true
}))
app.use(cookieParser());

// to handle data format recieved from the website front=end ,using middleware
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("Public"))