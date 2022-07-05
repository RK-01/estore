import mongoose from 'mongoose';

const storeSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    name: {
        type: String, 
        required: true
    },
    gstn: {
        type: String, 
        required: true
    },
    pan: {
        type: String, 
        required: true
    },
    dl: {
        type: String, 
        required: false
    },
    description: {
        type: String, 
        required: false
    },
    address: {
        type: String, 
        required: true
    },
    city: {
        type: String, 
        required: true
    },
    state: {
        type: String, 
        required: true
    },
    country: {
        type: String, 
        required: true
    },
    pincode: {
        type: String, 
        required: true
    },
    status: {
        type: Boolean, 
        required: true,
        default: false
    }
}, {
    timestamps: true
});

const Store = mongoose.model('Store', storeSchema);
export default Store;