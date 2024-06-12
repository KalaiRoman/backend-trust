import Razorpay from 'razorpay';
import payment_shema from '../../models/payment_shema.js';

export const CreateOrderPayment = async (req, res) => {
    const { paymentMethod, amount, user, OrderDeliveryStatus, address, currency } = req.body;


    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_EM3reg1Z7aUAw6",
            key_secret: "CY7By2M7qxBVMuqGPqZzRGe9",
        });

        const options = {
            amount: amount * 100, 
            currency: currency || 'INR', 
        };

        const response = await razorpay.orders.create(options);

        if (response) {
            const paymentData = {
                orderId: response.id,
                paymentMethod,
                amount,
                user: req.userid, 
                OrderDeliveryStatus: paymentMethod === "onlypayment" ? true : false,
                address
            };

            const newPayment = new payment_shema(paymentData);
            await newPayment.save();

            res.status(201).json({
                order_id: response.id,
                currency: response.currency,
                amount: response.amount
            });
        } else {
            throw new Error('Razorpay order creation failed');
        }
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};



// get find user payment


export const FindUserPayment=async(req,res)=>{
    try {

        const response=await payment_shema.find({user:req.userid});

        if(response)
            {
return res.status(200).json({message:"success",status:true,data:response});
            }
        
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" });
        
    }
}