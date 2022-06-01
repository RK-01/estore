import express from 'express'
const router = express.Router()
import Razorpay from 'razorpay'
import crypto, { createHmac } from 'crypto'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


//create order
router.post("/orders", asyncHandler(async (req, res) => {
       try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        console.log(process.env.RAZORPAY_KEY)

        const options = {
            amount: req.body.amount*100, // amount in smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString('hex'),
        };
    //    const order = await instance.orders.create(options);
    //    if (!order) return res.status(500).send("Some error occured");
    //    res.json(order);
    instance.orders.create(options, (error, order)=>{
        if(error){
            console.log(error);
            return res.status(500).json({message: 'Something went wrong.'})
        }
        res.status(200).json({data:order})
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
}));

router.post('/verify', asyncHandler(async(req, res)=>{
    try{
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
         } = req.body;
         const sign = razorpay_order_id + "|" + razorpay_payment_id;
         const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
         	.update(sign.toString())
            .digest("hex")

            if(razorpay_signature === expectedSign){
                return res.status(200).json({message: "Payment Success"})
            }else{
                return res.status(400).json({message: "Invalid Signature"})
            }
    }catch(error){
        console.log(error)
         res.status(500).json({message: 'Internal Server Error'})
    }
}))

router.put('/updateOrder/:id', asyncHandler(async(req, res)=>{
    try{
        const {
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature
         } = req.body;
         const order = await Order.findById(req.params.id)
        
         if(order){
             order.isPaid = true
             order.paidAt = Date.now()
             order.paymentResult.paymentOrderId = razorpayOrderId
             order.paymentResult.payment_id = razorpayPaymentId
             order.paymentResult.signature = razorpaySignature 
             order.paymentResult.update_time = Date.now()
            const updatedOrder = await order.save()
            res.json(updatedOrder)
            console.log(updatedOrder)
         }
    }catch(error){
        console.log(error)
         res.status(500).json({message: 'Internal Server Error'})
    }
}))


export default router