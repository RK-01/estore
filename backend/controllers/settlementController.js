import Settlement from '../models/settlementModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

const getAllSettlements = asyncHandler(async(req, res) => {
    const settlements = await Settlement.find()
    res.json(settlements)
    console.log(settlements)
})

const getSettlementById = asyncHandler(async(req, res) => {
    const idObj = new mongoose.Types.ObjectId(req.params.id)
    //console.log(idObj)
    const settlement = await Settlement.findById(idObj)
    if(settlement){
        //console.log('im am from get store by id store contrlloer')
        //console.log(product)
        res.json(settlement)
    }else{
        res.status(404).json({message: 'Settlement Not Found.'})
    }   
})

const createSettlement = asyncHandler(async(req, res) => {
    const settlement = new Settlement({
        sellerOrderId: req.body.userInfo._id,
        user: req.body.userInfo._id,
        sellerOrderAmount: 'Firm Name',
        bankAccountNumber: 'Firm GSTN',
        bankName: 'Firm PAN',
        bankIFSC: ''
    })
    const createdSettlement = await settlement.save()
    console.log(createdSettlement)
    res.status(201).json(createdSettlement)
})

// const updateStore = asyncHandler(async(req, res) => {
//     const {_id , name, description, gstn, pan, dl, address, city, state, pincode, country } = req.body 

//     const store = await Store.findById(req.params.id)
//     if(store){
//         store.name = name
//         store.description = description
//         store.gstn = gstn
//         store.pan = pan
//         store.dl = dl
//         store.address = address
//         store.city = city
//         store.state = state
//         store.pincode = pincode
//         store.country = country
        
//         const updatedStore = await store.save()
//         console.log('Store is updated')
//         res.json(updatedStore)
//     }else{
//         res.status(404)
//         throw new Error('Store Not Found')
//     }
    
// })


export {getAllSettlements, getSettlementById, createSettlement }