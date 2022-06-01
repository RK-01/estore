import express from 'express'
const router = express.Router()
import {discardOrder, getMyOrders, getOrders, addOrderItems, getOrderById, updateOrderToDeliverd, updateOrderToPaid, getMyUnpaidOrders} from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/myunpaidorders').get(protect, getMyUnpaidOrders)
router.route('/:id').get(protect, getOrderById).delete(protect, discardOrder)
router.route('/:id/deliver').put(protect, admin, updateOrderToDeliverd)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router