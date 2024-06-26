import jwt from 'jsonwebtoken';
import Auth_schema from '../../models/Auh_shema.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import otp_shema from '../../models/otp_shema.js';
import otpGenerator from 'otp-generator';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: "kalairoman70@gmail.com",
        // pass: "rkaasoiricuaignl",
        // tkyj eycn yzec wjqo

        user:"suportpureheart@gmail.com",
        pass:"akumdcdszrtlqcnl"
    }
});

// opt call Back
const CallBackOtp = async (_id, email) => {
    try {
        const response = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const saltcreate = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hashSync(response, saltcreate);
        await otp_shema.findOneAndUpdate({
            email: email
        }, { otp: hashedOtp, userId: _id, userStatus: 2 }, { new: true, upsert: true, setDefaultsOnInsert: true });

        var mailOptions = {
            from: "suportpureheart@gmail.com",
            bcc: email,
            subject: 'Your Otp Here!',
            html: `<div style="text-align:center,background-color:"red"><h1>Your Otp : ${response} </h1></div>`
        };
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error, "error");
            } else {
                console.log('Email sent Successfully');
            }
        });
    } catch (error) {

    }
}

// otp check

export const OtpConfirm = async (req, res) => {
    const { otp, userid } = req.body;
    try {
        const response = await otp_shema.findOne({ userId: userid });
        const compareOtp = await bcrypt.compare(otp, response?.otp);
        if (compareOtp) {
            const token=await jwt.sign({_id:userid},process.env.TOKEN,{expiresIn:"5d"})
            return res.status(200).json({ message: "Otp Correct",status:true,token:token })
        }
        else {
            return res.status(500).json({ message: "Wrong Otp!" })
        }
    } catch (error) {
        return res.status(500).json({ message: error })

    }
}
// Register User
export const RegisterUser = async (req, res) => {
    const {
        userName,
        email,
        password,
        mobileNo,
    } = req.body;

    try {
        const existUser = await Auth_schema.findOne({ $or: [{ email }, { mobileNo }] });
        const emailUserName=existUser?.email===email;
        if (existUser) return res.status(400).json({ status: false, message: `${emailUserName?"Email is already exists!":"Mobile No is already exists!"}` });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new Auth_schema({
            userName,
            email,
            password: hashedPassword,
            mobileNo,
            avatar:"https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg", 
            userStatus: 1, 
            description:  "",
            socialFacebook: "",
            socialYoutube: "",
            socialInstagram:"",
            chatMessage: [],
            approvalStatus:true,
            userType: "enduser" 
        });
        await newUser.save();
        await CallBackOtp(newUser?._id, newUser?.email)                        
        return res.status(201).json({ status: true, data: newUser });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ status: false, message: "Server error" });
    }
}


// Login user

export const LoginUser = async (req, res) => {
    const {
        password,
        UserCommanName
    } = req.body;

    try {
        const existUser = await Auth_schema.findOne({ $or: [{ "email":UserCommanName }, { "mobileNo":UserCommanName },{"userName":UserCommanName}] });
        if(existUser)
            {
                const hashedPassword = await bcrypt.compare(password,existUser?.password);
                const token=await jwt.sign({_id:existUser?._id},process.env.TOKEN,{expiresIn:"5d"})
                if(hashedPassword)
                    {
                        // await CallBackOtp(existUser?._id, existUser?.email)                        
                        return res.status(200).json({ status: true, data: existUser,token:token,message:"user Login Successfully" });
                    }
                    else
                    {
        res.status(500).json({ status: false, message: "Wrong Password!" });
                    }
            }
            else{
        res.status(500).json({ status: false, message: "User not Found!" });  
            }
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error" });
    }
}

// forget password send mail

export const ForgetPasswordMailsend = async (req, res) => {
    const {email} = req.body;
    try {
        const existUser = await Auth_schema.findOne({ "email":email});
        if(existUser)
            {
                const token=await jwt.sign({_id:existUser?._id},process.env.TOKEN,{expiresIn:"10ms"});
                var mailOptions = {
                    from: "suportpureheart@gmail.com",
                    bcc: email,
                    subject: 'Forget Password',
                    html: `
                        <div style="width: 100%; height: 100%; overflow-x: hidden; padding: 30px;">
                            <div></div>
                            <div>
                                <img src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg" alt="no image"
                                    style="width: 100%; height: 300px; object-fit: contain;" />
                            </div>
                            <div style="padding-top: 40px;">
                                <a href="http://localhost:3000/change-password?token=${token}" 
                                    style="background-color: #08cc7f; padding: 10px; color: white; text-decoration: none; border-radius: 10px; cursor: pointer; margin-top: 20px;">
                                    Change password
                                </a>
                            </div>
                        </div>`
                };
                
                await transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error, "error");
                    } else {
                        console.log('Email sent Successfully');
                    }
                });
                               
                        return res.status(200).json({ status: true, data: existUser,token:token,message:"Email send Successfully" });
                   
            }
            else{
        return res.status(404).json({ status: false, message: "User not Found" });  
            }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server error" });
    }
}

// change password

export const changepassworduser=async(req,res)=>{

    const {password,userId}=req.body;
    try {
        const gensalt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hashSync(password,gensalt);
        const response=await Auth_schema.findByIdAndUpdate({_id:userId},{password:hashedPassword},{new:true});
        return res.status(201).json({message:"updated Password",status:true});
    } catch (error) {
        return res.status(404).json({message:error,status:false});
    }
}

// get profile

// change password

export const getProfileData=async(req,res)=>{

    try {
        const response = await Auth_schema.findById({ "_id":req.userid});
        return res.status(200).json({message:"get User Data",data:response,status:true});
    } catch (error) {
        return res.status(404).json({message:error,status:false});
    }
}


// update profile

// change password

export const profileUpdateUser=async(req,res)=>{

    try {
        const response = await Auth_schema.findByIdAndUpdate({ "_id":req.userid},req.body,{new:true});
        return res.status(200).json({message:"User Profile Updated",data:response,status:true});
    } catch (error) {
        return res.status(404).json({message:error,status:false});
    }
}


// all users

export const Allusers=async(req,res)=>{

    try {
        const response = await Auth_schema.find({}).lean();
        return res.status(200).json({message:"User Profile Updated",data:response,status:true});
    } catch (error) {
        return res.status(404).json({message:error,status:false});
    }
}