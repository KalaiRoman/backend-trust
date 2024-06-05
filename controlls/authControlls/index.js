
import express from "express";
import { ForgetPasswordMailsend, LoginUser, OtpConfirm, RegisterUser } from "./Auth_controll.js";
const authrouter=express.Router();
authrouter.post("/register",RegisterUser);
authrouter.post("/login",LoginUser);
authrouter.post("/otp",OtpConfirm);
authrouter.post("/email-send/forget-password",ForgetPasswordMailsend);

export default authrouter;