
import express from "express";
import { Allusers, ForgetPasswordMailsend, LoginUser, OtpConfirm, RegisterUser,changepassworduser, getProfileData, profileUpdateUser } from "./Auth_controll.js";
import { verifyToken } from './../../middleware/Tokenverification.js';
const authrouter=express.Router();
authrouter.post("/register",RegisterUser);
authrouter.post("/login",LoginUser);
authrouter.post("/otp",OtpConfirm);
authrouter.post("/email-send/forget-password",ForgetPasswordMailsend);
authrouter.post("/change-password",changepassworduser);
authrouter.get("/get",verifyToken,getProfileData);
authrouter.post("/update",verifyToken,profileUpdateUser);
authrouter.get("/admin/all",Allusers);

export default authrouter;