import express from "express";
import { isLoggedIn, loginUser, registerUser } from "../Controller/User.js";
import upload from "../config/fileupload.js";
const userRouter=express.Router();


userRouter.post("/register",upload.single('file'),registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/loggedIn",isLoggedIn);
export default userRouter;