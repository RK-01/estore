import express from 'express'
const router = express.Router()
import {getAllSettlements, getSettlementById, createSettlement} from '../controllers/settlementController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getAllSettlements).post(protect, createSettlement)
// router.route('/myorders').get(protect, getMyOrders)
// router.route('/myunpaidorders').get(protect, getMyUnpaidOrders)
    router.route('/:id').get(protect, getSettlementById)
// router.route('/:id/deliver').put(protect, admin, updateOrderToDeliverd)
// router.route('/:id/pay').put(protect, updateOrderToPaid)
// 
export default router