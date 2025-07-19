import express from 'express';
import { 
  signup, 
  login, 
  getProfile, 
  updateProfile 
} from '../controllers/authController.js';
import { 
  validateSignup, 
  validateLogin, 
  handleValidationErrors 
} from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', validateSignup, handleValidationErrors, signup);
router.post('/login', validateLogin, handleValidationErrors, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

export default router;