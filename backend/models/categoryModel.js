import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Product'
    }
}, {timestamps: true});

const categorySchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
     image: {
        type: String, 
        required: true
    },
    products: [productSchema]
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
export default Category;