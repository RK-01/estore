import express from 'express'
const router = express.Router()
import {addCategoryToProduct, getProductsByCategory, getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, searchProducts, addStoreToProduct, getProductsByStore} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id/addCategoryToProduct').post(protect, admin, addCategoryToProduct)
router.route('/:categoryId/category').get(getProductsByCategory)
router.route('/search/:keyword').get(searchProducts)
router.route('/:id/addStoreToProduct').post(protect, admin, addStoreToProduct)
router.route('/:storeId/store').get(getProductsByStore)

export default router