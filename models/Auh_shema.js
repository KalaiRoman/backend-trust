import mongoose from "mongoose";

const chat_shema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const auth_shema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg"
    },
    userStatus:{
        type:Number,
        default:1
    },
    description:{
        type:String  
    },
    socialFacebook:{
        type:String,   
    },
    socialYoutube:{
        type:String,  
    },
    socialInstagram:{
        type:String, 
    },
    chatMessage:[chat_shema],
    approvalStatus:{
        type:Boolean,
        default:true
    },
    userType:{
        type:String,
        default:"enduser"
    }
},
{
    timestamps:true
})
mongoose.models={};
export default mongoose.model("auth",auth_shema);