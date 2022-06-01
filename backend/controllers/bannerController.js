import Banner from '../models/bannerModel.js'
import asyncHandler from 'express-async-handler'

const getBanners = asyncHandler(async(req, res) => {
    const banners = await Banner.find({})
    res.json(banners)
})

const createBanner = asyncHandler(async(req, res) => {
    const banner = new Banner({
        image: '/banners/default.jpg'
    })
    const createdBanner = await banner.save()
    res.status(201).json(createdBanner)
})

const updateBanner = asyncHandler(async(req, res) => {
    const {image, status } = req.body 

    const banner = await Banner.findById(req.params.id)
    if(banner){
        banner.image = image
        banner.status = status
        
        const updatedBanner = await banner.save()
        res.json(updatedBanner)
    }else{
        res.status(404)
        throw new Error('Banner Not Found')
    }
    
})
const getBannerById = asyncHandler(async(req, res) => {
    const banner = await Banner.findById(req.params['id'])
    if(banner){
        res.json(banner)
    }else{
        res.status(404).json({message: 'Banner Not Found.'})
    }
    
})

const deleteBanner = asyncHandler(async(req, res) => {
    const banner = await Banner.findById(req.params['id'])
    if(banner){
        await banner.remove()
        res.json({message:'Banner Removed'})
    }else{
        res.status(404)
        throw new Error({message: 'Banner Not Found.'})
    }
    
})


export {getBanners, createBanner, updateBanner, getBannerById, deleteBanner}

