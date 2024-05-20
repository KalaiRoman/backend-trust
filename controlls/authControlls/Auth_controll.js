import jwt from 'jsonwebtoken';
import Auth_schema from '../../models/Auh_shema.js'; // Corrected the typo
import bcrypt from 'bcrypt';

// Register User
export const RegisterUser = async (req, res) => {
    const {
        userName,
        email,
        password,
        mobileNo,
        avatar
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
            avatar: avatar || "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg", 
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
        res.status(201).json({ status: true, data: newUser });
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
                        res.status(200).json({ status: true, data: existUser,token:token });
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