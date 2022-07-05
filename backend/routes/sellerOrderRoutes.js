import express from 'express'
const router = express.Router()
import {createSellerOrder, getSellerOrders, getSellerOrdersByStore, getSellerOrderById, discardSellerOrder} from '../controllers/sellerOrderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getSellerOrders).post(protect, createSellerOrder)
// router.route('/myorders').get(protect, getMyOrders)
// router.route('/myunpaidorders').get(protect, getMyUnpaidOrders)
    router.route('/:id').get(protect, getSellerOrderById).delete(protect, discardSellerOrder)
// router.route('/:id/deliver').put(protect, admin, updateOrderToDeliverd)
// router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/orders').get(protect, getSellerOrdersByStore)
// 
export default router