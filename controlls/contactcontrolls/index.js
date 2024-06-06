
import express from "express";
import { create_mail, get_all_mail } from "./Contact_controll.js";

const contactrouter=express.Router();
contactrouter.post("/create",create_mail);
contactrouter.get("/get",get_all_mail);
export default contactrouter;