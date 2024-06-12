
import express from "express";
import { CreateOrderPayment, FindUserPayment } from "./Paymentcontroll.js";
import { verifyToken } from './../../middleware/Tokenverification.js';
const paymentrouter=express.Router();
paymentrouter.post("/create",verifyToken,CreateOrderPayment);
paymentrouter.get("/get",verifyToken,FindUserPayment);

export default paymentrouter;