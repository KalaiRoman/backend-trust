// create

import Contact_shema from "../../models/Contact_shema.js"
import Auth_schema from '../../models/Auh_shema.js';

export const create_mail = async (req, res) => {
    const { firstName, lastName, contactNo, message, email } = req.body;

    try {
        const existingUser = await Auth_schema.findOne({email:email });
        const existingUser1 = await Contact_shema.findOne({email:email });

        console.log(existingUser1,'existingUser1')

        if (existingUser) {
            return res.status(400).json({ message: "Email Already Exists", status: false });
        } 
        else if (existingUser1)
            {
                return res.status(400).json({ message: "Email Already Exists", status: false });
            }
        else {
            const newContact = await new Contact_shema({
                firstName,
                lastName,
                contactNo,
                message,
                email
            });

            await newContact.save();
            return res.status(201).json({ message: "Contact Soon", status: true });
        }
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

// get all messages


export const get_all_mail=async(req,res)=>{
   
    try {
        const response=await Contact_shema.find({}).lean();
        return res.status(200).json({message:"All Contact Details",status:true,data:response});
    } catch (error) {
        return res.status(404).json({message:error,status:false});
    }
}