import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

const addOrderItems = asyncHandler(async (req, res) => {

    const {
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        paymentResult,
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        isPaid,
        paidAt } = req.body
if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No order items')
    return 
}else{
    const order = new Order({
        user: req.user._id,
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        paymentResult,
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        isPaid,
        paidAt
    })
    
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
    
}
})

const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email mobile')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order Not Found')
    }
})

const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true,
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order Not Found')
    }
})

const getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

const getMyUnpaidOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.user._id, isPaid:  false})
    res.json(orders)
})

const discardOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        await order.remove()
        res.json({message:'Order Discarded'})
    }else{
        res.status(404)
        throw new Error({message: 'Order Not Found.'})
    }
    
})

const updateOrderToDeliverd = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    console.log(req.params.id)
    console.log(order._id)
    if(order){
        order.isDelivered = true
        order.deliveryStatus = "Order confirmed as delivered"
        order.deliveredAt = Date.now()
        
    const updatedOrder = await order.save()
    res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
}

)
export {discardOrder, getMyUnpaidOrders, getOrderById, getOrders, addOrderItems, updateOrderToDeliverd, updateOrderToPaid, getMyOrders}