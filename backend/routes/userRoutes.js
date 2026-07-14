import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);

export default router;
