import Auth_schema from '../../models/Auh_shema.js';
import Contact_shema from "../../models/Contact_shema.js"
import subscribe_shema from "../../models/subscribe_shema.js";
import payment_shema from '../../models/payment_shema.js';

export const overAll_datas=async(req,res)=>{
    try {
        const getUser=await Auth_schema.find({}).countDocuments();
        const getContact=await Contact_shema.find({}).countDocuments();
        const getSubscribers=await subscribe_shema.find({}).countDocuments();
        const getPayments=await payment_shema.find({}).countDocuments();
        const responseData={
            userCount:getUser,
            contactCount:getContact,
            subscriberCount:getSubscribers,
            paymentCounts:getPayments
        }
        return res.status(200).json({message:"success",status:true,data:responseData});
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });   
    }
}