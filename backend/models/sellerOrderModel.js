import mongoose from 'mongoose';

const sellerOrderSchema = mongoose.Schema({
    store:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Store'
    },
    customerOrderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Order'
    },
    orderItems: [{
        name: {type: String, required:true}, 
        qty: {type:Number, required:true},
        image: {type: String, required: true},
        price: {type: Number, required: true, default: 0.0},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }],
    itemsPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    shippingCost: {
        type: Number, 
        required: true,
        default: 19.0
    },
    isPaymentSetteled: {
        type: Boolean, 
        required: true,
        default: false
    },
    paymentSetteledAt: {
        type: Date
    }, 
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveryStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }, 
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    remarks: {
        type: String,
        required: true,
        default: "Thank you for your order. Your goods are getting ready for delivery."
    }
}, {
    timestamps: true
});
const SellerOrder = mongoose.model('SellerOrder', sellerOrderSchema);
export default SellerOrder;