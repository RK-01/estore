import express from 'express'
const router = express.Router()
import {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, changeUserSellerStatus} from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/:id').delete(protect, admin, deleteUser)
router.route('/:id/status').put(protect, admin, changeUserSellerStatus)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
export default router