
import express from "express";
import { LoginUser, RegisterUser } from "./Auth_controll.js";

const authrouter=express.Router();

authrouter.post("/register",RegisterUser);
authrouter.post("/login",LoginUser);

export default authrouter;