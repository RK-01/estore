import express from 'express'
const router = express.Router()
import {getStores, getStoreById, deleteStore, createStore, updateStore, getStoreByUser, changeStoreStatus} from '../controllers/storeController.js'
import {protect, admin, seller} from '../middleware/authMiddleware.js'

router.route('/').get(getStores).post(protect, createStore)
router.route('/:id').get(getStoreById).delete(protect, admin, deleteStore).put(protect, updateStore)
router.route('/:id/stores').get(getStoreByUser)
router.route('/:id/status').put(protect, admin, changeStoreStatus)

export default router