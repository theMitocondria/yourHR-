import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./Routes/UserRoutes.js";
import connectDatabase from "./Database/connectDatabase.js";

const app=express();
dotenv.config();
connectDatabase();

app.use(express.json());
app.use(cors("*"));
app.use("/user",userRouter);
app.listen(process.env.PORT,()=>{
    console.log(`APP IS LISTENING ON ${process.env.PORT}`);
})