
import express from "express";
import { CreateOrderPayment } from "./Paymentcontroll.js";
import { verifyToken } from './../../middleware/Tokenverification.js';
const paymentrouter=express.Router();
paymentrouter.post("/create",verifyToken,CreateOrderPayment);
export default paymentrouter;