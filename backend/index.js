import express from "express";
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js";
dotenv.config();
import cors from "cors"

const app=express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
const port=3000;
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

app.listen(port,()=>{
    console.log(`server is running on the port ${port}`)
    connectDB();
})