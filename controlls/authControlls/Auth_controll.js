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
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your login with OTP</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td>
                  <div style="padding: 20px; background-color: rgb(255, 255, 255); width: 350px;">
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                      <h1 style="margin: 1rem 0">Verification code</h1>
                      <p style="padding-bottom: 16px">Please use the verification code below to sign in.</p>
                      <p style="padding-bottom: 16px"><strong style="font-size: 130%">${response}</strong></p>
                      <p style="padding-bottom: 16px">If you didn't request this, you can ignore this email.</p>
                      <p style="padding-bottom: 8px">Regards,<br/><b>Pure Heart Trust</b></p>
                    </div>
                    <div style="text-align: center;">
                      <img width="200" src="https://womeyn-prod-statics.s3.ap-southeast-2.amazonaws.com/img/womeyn_logo.png"
              alt="Womeyn Logo"/>
                    </div>
                    <div style="text-align: center;">
                      <p><b>"I have Risen From The Ashes Of My Past To Create a Future For Myself"</b></p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>`
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

// sub Admin User

export const SubUserAdmin = async (req, res) => {
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
            userType: "subadmin" 
        });
        var mailOptions = {
            from: "suportpureheart@gmail.com",
            bcc: email,
            subject: 'Sub Admin User',
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PureHeartTrust Sub Admin</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td>
                  <div style="padding: 20px; background-color: rgb(255, 255, 255); width: 470px;">
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                      <p style="padding-bottom: 16px">Dear ${userName},</p>
                      <p style="padding-bottom: 16px">password: ${password}</p>
                      <p style="padding-bottom: 16px">If this email is not relevant to you, please ignore this email.</p>
                      <p style="padding-bottom: 8px">Regards,<br/><b>Anu Kulkarni - Founder and Director</b></p>
                      <p><b>"I have Risen From The Ashes Of My Past To Create a Future For Myself"</b></p>
                    </div>
                    <div style="text-align: center;">
                      <img width="200" src="https://womeyn-prod-statics.s3.ap-southeast-2.amazonaws.com/img/womeyn_logo.png"
              alt="Womeyn Logo"/>
                    </div>
                    <div style="text-align: center;">
                      <p><b>"I have Risen From The Ashes Of My Past To Create a Future For Myself"</b></p>
                    </div>
                  </div>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>    
            `
        };
        
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error, "error");
            } else {
                console.log('Email sent Successfully');
            }
        });
        await newUser.save();
        return res.status(201).json({ status: true, data: newUser });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ status: false, message: "Server error" });
    }
}