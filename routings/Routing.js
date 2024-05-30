import express from "express";
import authrouter from "../controlls/authControlls/index.js";
import addressrouter from "../controlls/Addresscontrolls/index.js";
import paymentrouter from "../controlls/paymentcontroll/index.js";
const routing=express.Router();
routing.use("/auth",authrouter);
routing.use("/address", addressrouter);
routing.use("/payment",paymentrouter );
export default routing;