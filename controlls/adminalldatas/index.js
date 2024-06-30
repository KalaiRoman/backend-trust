
import express from "express";
import { overAll_datas } from "./Admin_controll_all.js";
const adminRouterover=express.Router();

adminRouterover.get("/overall",overAll_datas)
export default adminRouterover;