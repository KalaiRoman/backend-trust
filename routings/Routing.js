import express from "express";
import authrouter from "../controlls/authControlls/index.js";
import addressrouter from "../controlls/Addresscontrolls/index.js";
import paymentrouter from "../controlls/paymentcontroll/index.js";
import contactrouter from "../controlls/contactcontrolls/index.js";
const routing=express.Router();
routing.use("/auth",authrouter);
routing.use("/address", addressrouter);
routing.use("/payment",paymentrouter );
routing.use("/contact",contactrouter );

export default routing;