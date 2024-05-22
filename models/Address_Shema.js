


import mongoose from 'mongoose';
const Address_shema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    contactno: {
        type: String,
        required: true
    },
    alternateno: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    locationtype: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    userid: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

mongoose.models = {};

export default mongoose.model("address", Address_shema);