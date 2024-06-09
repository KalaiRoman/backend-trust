
import express from "express";
import { create_subscribe_mail } from "./Subscribe_controll.js";

const subscriberouter=express.Router();
subscriberouter.post("/create",create_subscribe_mail);
export default subscriberouter;