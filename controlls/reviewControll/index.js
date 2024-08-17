import { Router } from "express";
import { create_Rating, get_Rating } from "./ReviewControll.js";
import { verifyToken } from './../../middleware/Tokenverification.js';
const review_router=Router();
review_router.post("/create",verifyToken,create_Rating)
review_router.get("/get",verifyToken,get_Rating)

export default review_router;