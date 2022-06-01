import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

const searchProducts = asyncHandler(async(req, res) => {
    //console.log(req.params.keyword)
    const pageSize = 2
    const page = Number(req.query.pageNumber) || 1
    const keywords = req.params.keyword.split(" ")
    //console.log(keywords)
    //const products = [];
    const data = []
    for(let i=0; keywords.length > i; i++){
        const o = {
           name: {
            $regex : keywords[i],
           $options: 'i'        }
            }
        data.push(o)
    }
    console.log(data)
    const count = await Product.find({
                        "$and": data
    })
const products = await Product.find({
                    "$and": data
            })
            console.log(products)
    // for(let i=0; keywords.length > i; i++){
    //     console.log(keywords[i])
    //     const query = keywords.length > 0 ? {
    //     name: {
    //         $regex : keywords[i],
    //         $options: 'i'        }
    // } : {}
    
    //     const product = await Product.find({...query})
    //     console.log(product)
    //     if(product.length > 0){
    //         const data = {
    //         _id: product[0]._id,    
    //         name : product[0].name,
    //         image: product[0].image,
    //         mrp: product[0].mrp,
    //         discount: product[0].discount,
    //         price: product[0].price,
    //     }
    //         products.push(data)
    //     }
        
    // }
    // if(products.length > 0){
    //         res.json(products)
    // }else{
    //     res.json({message: 'Sorry! No Products Found.'})
    // }
    //const keywords = req.params.keyword
    // const query = req.params.keyword ? {
    //       name: {
    //         $regex : req.params.keyword,
    //         $options: 'i'        }
    //         } : {}
    
            //const products = await Product.find({...query})
            
           res.json(products)

})

const getProductById = asyncHandler(async(req, res) => {
    const idObj = new mongoose.Types.ObjectId(req.params.id)
    //console.log(idObj)
    const product = await Product.findById(idObj)
    if(product){
        //console.log('im am from get product by id product contrlloer')
        //console.log(product)
        res.json(product)
    }else{
        res.status(404).json({message: 'Product Not Found.'})
    }
    
})

const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params['id'])
    if(product){
        await product.remove()
        res.json({message:'Product Removed'})
    }else{
        res.status(404)
        throw new Error({message: 'Product Not Found.'})
    }
    
})

const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'New name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Brand Name',
        countInStock: 8,
        numReviews: 0,
        description: 'Product Description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async(req, res) => {
    const {name, mrp, discount, description, image, brand, countInStock } = req.body 

    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.price = mrp-discount
        product.mrp = mrp
        product.discount = discount
        product.description = description
        product.image = image
        product.brand = brand
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
    
})

// Review Product 
const createProductReview = asyncHandler(async(req, res) => {
    const {
        rating, comment
     } = req.body 

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product Already Reviewed')
        } 
        console.log(req.user._id)
        const review ={
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) =>item.rating + acc, 0 )/product.reviews.length
    
        await product.save()
        res.status(201).json({message: 'Review updated successfully.'})

    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
    
})

const addCategoryToProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    const idObj = new mongoose.Types.ObjectId(req.body.category)
    console.log(idObj)
    const data = {
            category: idObj,
    }
    if(product){
        if( mongoose.Types.ObjectId.isValid(idObj) ){
            console.log("I am inside the product controller and the product is found")
        product.categories.push(data)
        await product.save()
        res.status(201).json({message: 'Category added successfully.'})
        }else{
            console.log('id is not valid')
        }

        
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
    
})

const getProductsByCategory = asyncHandler(async(req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1
    console.log(req.params.categoryId)
     //const category = await Category.findById(req.params.categoryId)
     const idObj = new mongoose.Types.ObjectId(req.params.categoryId)
    const count = await Product.count({categories:  {$elemMatch : {category: idObj}}})
     const products = await Product.find({categories:  {$elemMatch : {category: idObj}}}).limit(pageSize).skip(pageSize * (page - 1) )
    console.log('products by category')
    console.log(products)
     res.json({products, page, pages: Math.ceil(count / pageSize)})
})

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct, 
    createProductReview, addCategoryToProduct, getProductsByCategory, searchProducts}