import express from "express";
import authrouter from "../controlls/authControlls/index.js";
const routing=express.Router();
routing.use("/auth",authrouter)
export default routing;