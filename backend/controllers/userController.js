import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async(req, res) => {
    const users = await User.find({})
    const {email, password} = req.body;

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error('Invalid User or Password');
    }
})

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, mobile, password} = req.body;

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }
    const user = await User.create({
        name, email, mobile, password
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getUserProfile = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})

const updateUserProfile = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user._id)
    if(req.body.password){
        user.password = req.body.password || user.password

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email:updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: updatedUser.isSeller,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})

const getUsers = asyncHandler(async(req, res) => {
    
    const users = await User.find({})
    res.json(users)
})

const deleteUser = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.params['id'])
    if(user){
        await user.remove()
        res.json({message: 'User Removed'})
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})

const changeUserSellerStatus = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
    if(user.isSeller === false){
        user.isSeller = true
        const updatedStatus = await user.save()
        console.log('User status is changed')
        res.json(updatedStatus)
    }else if(user.isSeller === true ){
         user.isSeller = false
        const updatedStatus = await user.save()
        console.log('User status is changed')
        res.json(updatedStatus)
    }
    }else{
        res.status(404)
        throw new Error('Store Not Found')
    }
    
})


export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, changeUserSellerStatus}
