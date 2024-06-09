import mongoose from "mongoose";


const subscribe_sheema=new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true
    }
},
{
    timestamps:true
})

mongoose.models={};

export default mongoose.model("subscribe",subscribe_sheema);