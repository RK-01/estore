import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
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
     shippingAddress: {
        address: {type: String, required: true },
        city: {type: String, required: true },
        state: {type: String, required: true },
        postalCode: {type: String, required: true },
        country: {type: String, required: true }
    },
     paymentMethod: {
        type: String, 
        required: false
    },
    paymentResult: {
        paymentOrderId: {type: String},
        payment_id: {type: String},
        signature: {type: String},
        update_time: {type: String},
    },
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
    shippingPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean, 
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    }, 
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveryStatus: {
        type: String,
        required: true,
        default: "Thank you for your order. Your goods are getting ready for delivery."
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});
const Order = mongoose.model('Order', orderSchema);
export default Order;