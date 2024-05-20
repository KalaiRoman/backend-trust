import mongoose from 'mongoose';


const Otp_shema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        uninque: true
    },
    otp: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    roleId: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true
    }
)

mongoose.models = {};

export default mongoose.model("otp", Otp_shema);