
import express from "express";
import { create_subscribe_mail, get_all_mail } from "./Subscribe_controll.js";

const subscriberouter=express.Router();
subscriberouter.post("/create",create_subscribe_mail);
subscriberouter.get("/get/all",get_all_mail);

export default subscriberouter;