import Razorpay from 'razorpay';
import payment_shema from '../../models/payment_shema.js';

// create

export const CreateOrderPayment=async(req,res)=>{

    const {
        orderId,
        paymentMethod,
        amount,
        user,
        OrderDeliveryStatus,
        address
    }=req.body;

    try {

        const razorpay = new Razorpay({
            key_id: "rzp_test_EM3reg1Z7aUAw6",
            key_secret: "CY7By2M7qxBVMuqGPqZzRGe9",
        });
        const options = {
            amount: req.body.amount * 100,
            currency: req.body.currency,
        };
        const response = await razorpay.orders.create(options);

        if(response)
            {
                if(paymentMethod=="only payment")
                    {
                        const responses=await payment_shema({
                            orderId:response?.id,
                            paymentMethod,
                            amount:amount,
                            user: req.userid,
                            OrderDeliveryStatus:true,
                            address:address
                        })
                        await responses.save();
            res.status(201).json({order_id: response.id,
            currency: response.currency,
            amount: response.amount})

                    }
                    else
                    {
                        const responses=await payment_shema({
                            orderId:response?.id,
                            paymentMethod,
                            amount:amount,
                            user: req.userid,
                            OrderDeliveryStatus:false,
                            address:address
                        })
                        await responses.save();
                        res.status(201).json({status:true,message:"Success",data:responses})

                    }
            }

        
    } catch (error) {
        res.status(500).json({status:false,message:"Internel Server Error"})
    }
}