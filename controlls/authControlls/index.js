
import express from "express";
import { LoginUser, OtpConfirm, RegisterUser } from "./Auth_controll.js";
const authrouter=express.Router();
authrouter.post("/register",RegisterUser);
authrouter.post("/login",LoginUser);
authrouter.post("/otp",OtpConfirm);


export default authrouter;