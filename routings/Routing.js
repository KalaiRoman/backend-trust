import express from "express";
import authrouter from "../controlls/authControlls/index.js";
import addressrouter from "../controlls/Addresscontrolls/index.js";
import paymentrouter from "../controlls/paymentcontroll/index.js";
import contactrouter from "../controlls/contactcontrolls/index.js";
import subscriberouter from "../controlls/subscribeControlls/index.js";
import adminRouterover from "../controlls/adminalldatas/index.js";
const routing=express.Router();
routing.use("/auth",authrouter);
routing.use("/address", addressrouter);
routing.use("/payment",paymentrouter );
routing.use("/contact",contactrouter );
routing.use("/subscribe",subscriberouter );
routing.use("/admin",adminRouterover);



export default routing;