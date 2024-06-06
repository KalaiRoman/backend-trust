import mongoose from "mongoose";


const contact_sheema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true
    },
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

export default mongoose.model("contact",contact_sheema);