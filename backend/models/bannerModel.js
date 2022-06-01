import mongoose from "mongoose";

const bannerSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    }  
}, {timestamps: true})

const Banner = mongoose.model('Banner', bannerSchema)
export default Banner