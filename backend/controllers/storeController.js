import Store from '../models/storeModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

const getStores = asyncHandler(async(req, res) => {
    const stores = await Store.find()
    res.json(stores)
    console.log(stores)
})

const getStoreById = asyncHandler(async(req, res) => {
    const idObj = new mongoose.Types.ObjectId(req.params.id)
    //console.log(idObj)
    const store = await Store.findById(idObj)
    if(store){
        //console.log('im am from get store by id store contrlloer')
        //console.log(product)
        res.json(store)
    }else{
        res.status(404).json({message: 'Store Not Found.'})
    }   
})

const getStoreByUser = asyncHandler(async(req, res) => {
    console.log(req.params)
    const idObj = new mongoose.Types.ObjectId(req.params.id)
    console.log(idObj)
    const store = await Store.findOne({ user : { $eq : idObj}})
    if(store){
        console.log('im am from get store by user store contrlloer')
        console.log(store)
        res.json(store)
    }else{
        res.status(404).json({message: 'Store Not Found.'})
    }
    
})

const deleteStore = asyncHandler(async(req, res) => {
    const store = await Store.findById(req.params['id'])
    if(store){
        await store.remove()
        res.json({message:'Store Removed'})
    }else{
        res.status(404)
        throw new Error({message: 'Store Not Found.'})
    }
    
})
 
const createStore = asyncHandler(async(req, res) => {
    const store = new Store({
        user: req.body.userInfo._id,
        name: 'Firm Name',
        gstn: 'Firm GSTN',
        pan: 'Firm PAN',
        dl: 'Firm DL',
        description: 'Firm Address',
        address: 'Firm Address',
        city: 'Firm Address',
        state: 'Firm Address',
        country: 'Firm Address',
        pincode: 'Firm Address'
    })
    const createdStore = await store.save()
    console.log(createdStore)
    res.status(201).json(createdStore)
})

const updateStore = asyncHandler(async(req, res) => {
    const {_id , name, description, gstn, pan, dl, address, city, state, pincode, country } = req.body 

    const store = await Store.findById(req.params.id)
    if(store){
        store.name = name
        store.description = description
        store.gstn = gstn
        store.pan = pan
        store.dl = dl
        store.address = address
        store.city = city
        store.state = state
        store.pincode = pincode
        store.country = country
        
        const updatedStore = await store.save()
        console.log('Store is updated')
        res.json(updatedStore)
    }else{
        res.status(404)
        throw new Error('Store Not Found')
    }
    
})

const changeStoreStatus = asyncHandler(async (req, res) => {
    const store = await Store.findById(req.params.id)
    if(store){
    if(store.status === false){
        store.status = true
        const updatedStatus = await store.save()
        console.log('Store status is changed')
        res.json(updatedStatus)
    }else if(store.status === true ){
         store.status = false
        const updatedStatus = await store.save()
        console.log('Store status is changed')
        res.json(updatedStatus)
    }
    }else{
        res.status(404)
        throw new Error('Store Not Found')
    }
    
})

export {getStores, getStoreById, deleteStore, createStore, updateStore, getStoreByUser, changeStoreStatus}