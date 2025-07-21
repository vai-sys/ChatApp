import express from "express";
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js";
dotenv.config();
const app=express();
app.use(cookieParser());
const port=3000;
app.use(express.json());

app.use("/api/auth",authRoutes);

app.listen(port,()=>{
    console.log(`server is running on the port ${port}`)
    connectDB();
})