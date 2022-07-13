import Contact from '../models/contactModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({})
    res.json(contacts)
})

const getContactById = asyncHandler(async(req, res) => {
    const idObj = new mongoose.Types.ObjectId(req.params.id)
    //console.log(idObj)
    const contact = await Contact.findById(idObj)
    if(contact){
        //console.log('im am from get product by id product contrlloer')
        //console.log(product)
        res.json(contact)
    }else{
        res.status(404).json({message: 'Product Not Found.'})
    }
    
})

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params['id'])
    if(contact){
        await contact.remove()
        res.json({message:'contact Removed'})
    }else{
        res.status(404)
        throw new Error({message: 'Contact Not Found.'})
    }
    
})

const createContact = asyncHandler(async(req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        message: req.body.message,
    })
    const createdContact = await contact.save()
    if(createdContact){
        res.status(201).json({message: 'Messge sent successfully. Thank for writing to us. We will get back to you soon.'})
    }else{
        res.json({message: 'Unable to send the message.'})
    }
    
})


export {getContacts, getContactById, deleteContact, createContact}