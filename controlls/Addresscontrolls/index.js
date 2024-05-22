import expres from 'express';
import { allAddress, createAddress, deleteAddress, editAddress, singleAddress } from './Addresscontrolls.js';
import { verifyToken } from '../../middleware/Tokenverification.js';
const addressrouter = expres.Router();

addressrouter.post("/create", verifyToken, createAddress)
addressrouter.put("/update/:id", verifyToken, editAddress)
addressrouter.delete("/delete/:id", verifyToken, deleteAddress)
addressrouter.get("/getall", verifyToken, allAddress);
addressrouter.get("/single/:id", verifyToken, singleAddress);

export default addressrouter;