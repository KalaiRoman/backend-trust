// create

import Review_shema from "../../models/Review_shema.js"
import Auth_schema from '../../models/Auh_shema.js';

export const create_Rating=async(req,res)=>{
    const {rating,description}=req.body;


    try {

    const alreadyExistCheck=await Review_shema.find({user:req.userid});

    if(alreadyExistCheck[0]?._id)
    {
        const response=await Review_shema.findByIdAndUpdate(alreadyExistCheck[0]?._id,{
            rating:rating,
            description:description,
            user:req.userid,
            adminStatus:false
        },{new:true})
        res.status(201).json({message:"Your Rating Updated Successfully",status:true,data:response});
    }
    else{
        const response=await Review_shema({
            rating:rating,
            description:description,
            user:req.userid,
            adminStatus:false
        })
await Auth_schema.findByIdAndUpdate(req.userid,{reviewStatus:true},{new:true})
        await response.save();
        res.status(201).json({message:"Your Rating Submitted Successfully Thank You!",status:true,data:response});
    }
        
    } catch (error) {
        res.status(404).json({message:"Server Error",status:false});
        
    }
}

// get review particular user

export const get_Rating=async(req,res)=>{
    try {
        const response=await Review_shema.find({user:req.userid})
        res.status(200).json({message:"Your Review Get Dat",status:true,data:response});
    } catch (error) {
        res.status(404).json({message:"Server Error",status:false});
        
    }
}

// approval admin rating
// filter rating