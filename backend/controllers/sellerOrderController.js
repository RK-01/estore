import SellerOrder from '../models/sellerOrderModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

const createSellerOrder = asyncHandler(async (req, res) => {
    console.log(req.body)
    
    const {
        store,
        customerOrderId,
        orderItems, 
        itemsPrice,
        shippingCost,
        taxPrice,
        totalPrice
         } = req.body
    const idObj = new mongoose.Types.ObjectId(store)
    const customerOrderIdObj = mongoose.Types.ObjectId(customerOrderId)
    
if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No order items')
    return 
}else{
    console.log(store)
    const neworder = new SellerOrder({
        store: idObj,
        customerOrderId: customerOrderIdObj,
        orderItems,
        itemsPrice,
        shippingCost,
        taxPrice,
        totalPrice
    })
    
    const createdOrder = await neworder.save()
    console.log('seller order created successfully')
    res.status(201).json(createdOrder)
    
}
})

const getSellerOrders = asyncHandler(async(req, res) => {
    const sellerOrders = await SellerOrder.find({})
    res.json(sellerOrders)
})

const getSellerOrderById = asyncHandler(async(req, res) => {
    const idObj = new mongoose.Types.ObjectId(req.params.id)
    console.log("Iam in the seller orer by id"+idObj)
    const sellerOrder = await SellerOrder.findById(idObj)
    if(sellerOrder){
        res.json(sellerOrder)
        console.log(sellerOrder)
    }else{
        res.status(404).json({message: 'Seller Order Not Found.'})
    }
    
})


const getSellerOrdersByStore = asyncHandler(async(req, res) => {
    const idObj = new mongoose.Types.ObjectId(req.params.id)
    console.log(idObj)
    const sellerOrders = await SellerOrder.find({store: {$eq: idObj}})
    if(sellerOrders){
        console.log('im am from get seller orders by store contrlloer')
        console.log(sellerOrders)
        res.json(sellerOrders)
    }else{
        res.status(404).json({message: 'Seller Orders Not Found.'})
    }   
})

const discardSellerOrder = () => {
    //
}
export {createSellerOrder, getSellerOrders, getSellerOrdersByStore, getSellerOrderById, discardSellerOrder}