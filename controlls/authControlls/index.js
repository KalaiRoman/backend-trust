
import express from "express";
import { ForgetPasswordMailsend, LoginUser, OtpConfirm, RegisterUser,changepassworduser } from "./Auth_controll.js";
import { verifyToken } from './../../middleware/Tokenverification.js';
const authrouter=express.Router();
authrouter.post("/register",RegisterUser);
authrouter.post("/login",LoginUser);
authrouter.post("/otp",OtpConfirm);
authrouter.post("/email-send/forget-password",ForgetPasswordMailsend);
authrouter.post("/change-password",changepassworduser);

export default authrouter;