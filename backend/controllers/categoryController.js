import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref: 'Category'
    }
}, {timestamps: true});

const getCategories = asyncHandler(async(req, res) => {
    const categories = await Category.find({})
    res.json(categories)
})


const getCategoryById = asyncHandler(async(req, res) => {
    console.log(req.params.id)
    const category = await Category.findById(req.params.id)
    if(category){
        //console.log(category) 
        res.json(category)
    }else{
        res.status(404).json({message: 'Product Not Found.'})
    }
    
})

const deleteCategory = asyncHandler(async(req, res) => {
    const category = await Category.findById(req.params['id'])
    if(category){
        await category.remove()
        res.json({message:'Category Removed'})
    }else{
        res.status(404)
        throw new Error({message: 'Category Not Found.'})
    }
    
})

const createCategory = asyncHandler(async(req, res) => {
    const category = new Category({
        name: 'New name',
        image: '/images/sample.jpg',
    })
    const createdCategory = await category.save()
    res.status(201).json(createdCategory)
})

const updateCategory = asyncHandler(async(req, res) => {
    const { name, image } = req.body 

    const category = await Category.findById(req.params.id)

    if(category){
        category.name = name
        category.image = image

        const updatedCategory = await category.save()
        res.json(updatedCategory)
    }else{
        res.status(404)
        throw new Error('Category Not Found')
    }
    
})

const addProductToCategory = asyncHandler(async(req, res) => {
    //console.log(req.params.categoryId)
    const category = await Category.findById(req.params.categoryId)
    const idObj = new mongoose.Types.ObjectId(req.body.product)
    console.log(idObj)
    const data = {
            product: idObj,
    }
    if(category){
        if( mongoose.Types.ObjectId.isValid(idObj) ){
            console.log(data.name)
            console.log("I am inside the product controller and the product is found")
        category.products.push(data)
        await category.save()
        res.status(201).json({message: 'Product added successfully.'})
        }else{
            console.log('id is not valid')
        }

        
    }else{
        res.status(404)
        throw new Error('Category Not Found')
    }
    
})


export {addProductToCategory, getCategories, getCategoryById, deleteCategory, createCategory, updateCategory}