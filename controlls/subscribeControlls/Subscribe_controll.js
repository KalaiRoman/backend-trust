// create

import Contact_shema from "../../models/Contact_shema.js"
import subscribe_shema from "../../models/subscribe_shema.js";

export const create_subscribe_mail = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await subscribe_shema.findOne({email:email });


        if (existingUser) {
            return res.status(400).json({ message: "Email Already Exists", status: false });
        } 
      
        else {
            const newContact = await new subscribe_shema({
              
                Email:email
            });

            await newContact.save();
            return res.status(201).json({ message: "Thank You For Subscriber", status: true });
        }
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

// get all messages


export const get_all_mail=async(req,res)=>{
   
    try {
        const response=await Contact_shema.find({});
        return res.status(200).json({message:"All Contact Details",status:true,data:response});
    } catch (error) {
        return res.status(404).json({message:error,status:false});
    }
}