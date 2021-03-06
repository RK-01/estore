import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: {type: String,required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
}, {timestamps: true});

const categorySchema = mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref: 'Category'
    }
}, {timestamps: true});

const storeSchema = mongoose.Schema({
    store:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref: 'Store'
    }
}, {timestamps: true});

const productSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    name: {
        type: String, 
        required: true
    },
     image: {
        type: String, 
        required: true
    },
     brand: {
        type: String, 
        required: true
    },
    categories:[categorySchema],
    stores:[storeSchema],
    description: {
        type: String, 
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number, 
        required: true,
        default: 0
    },
    numReviews: {
        type: Number, 
        required: true,
        default: 0
    },
    price: {
        type: Number, 
        required: true,
        default: 0
    },
    mrp: {
        type: Number, 
        required: true,
        default: 0
    },
    discount: {
        type: Number, 
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: Number,
        required: false,
        default: false
    }
}, {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema);
export default Product;