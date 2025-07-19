import express from 'express';
import { body } from 'express-validator';
import {
  createRSVP,
  getUserRSVPs,
  updateRSVPStatus,
  getEventRSVPs
} from '../controllers/rsvpController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

const validateRSVP = [
  body('eventId').isMongoId().withMessage('Invalid event ID'),
  body('userEmail').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('userName').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('notes').optional().isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
];

// Public routes
router.post('/', validateRSVP, handleValidationErrors, createRSVP);

// Protected routes
router.get('/user/:userEmail', getUserRSVPs);
router.put('/:id/status', authenticateToken, updateRSVPStatus);

// Admin routes
router.get('/event/:eventId', authenticateToken, requireAdmin, getEventRSVPs);

export default router;