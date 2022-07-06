import mongoose from 'mongoose';

const settlementSchema = mongoose.Schema({
    sellerOrderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Store'
    },
    customerOrderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Order'
    },
    sellerOrderAmount: {
        type: Number, 
        required: true,
        default: 0.0
    },
    commissionFee: {
        type: Number, 
        required: true,
        default: 0.0
    },
    collectionFee: {
        type: Number, 
        required: true,
        default: 0.0
    },
    fixedFee: {
        type: Number, 
        required: true,
        default: 0.0
    },
    shippingCost: {
        type: Number, 
        required: true,
        default: 19.0
    },
    gstAmount: {
        type: Number, 
        required: true,
        default: 19.0
    },
    settlementAmount: {
        type: Number, 
        required: true,
        default: 0.0
    },
    transactionId: {
        type: String, 
        required: true,
        default: ''
    },
    bankAccountNumber: {
        type: Number, 
        required: true,
        default: 0.0
    },
    bankName: {
        type: String, 
        required: true,
        default: ''
    },
    bankIFSC: {
        type: String, 
        required: true,
        default: ''
    },
    transferDate: {
        type: Date
    },
    isPaymentSetteled: {
        type: Boolean, 
        required: true,
        default: false
    },
    paymentSetteledAt: {
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
        default: "Your order settlement has been initiated."
    }
}, {
    timestamps: true
});
const Settlement = mongoose.model('Settlement', settlementSchema);
export default Settlement;