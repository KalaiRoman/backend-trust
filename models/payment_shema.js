import mongoose from "mongoose";


const Payment_shema=new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    amount:{type:String,required:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    OrderDeliveryStatus:{
        type:Boolean,
        required:true,
        default:false
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address' 
    }
},
{
    timestamps:true
})

mongoose.models = {};

export default mongoose.model("payment",Payment_shema);