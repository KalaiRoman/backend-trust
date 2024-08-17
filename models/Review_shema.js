import mongoose from "mongoose";
const Review_shema_model=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'auth'
    },
    rating:{
        type:String,
        require:true,
        default:0,
        min:1,
        max:5
    },
description:{
    type:String,
    required:true
},
adminStatus:{
    type:Boolean,
    default:false
}
},
{
    timestamps:true
})
mongoose.models={}
export default mongoose.model("review",Review_shema_model);