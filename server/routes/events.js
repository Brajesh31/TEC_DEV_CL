import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventCategories
} from '../controllers/eventController.js';
import {
  validateEvent,
  handleValidationErrors
} from '../middleware/validation.js';
import { authenticateToken, requireAdmin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllEvents);
router.get('/categories', getEventCategories);
router.get('/:id', getEventById);

// Protected routes (Admin only)
router.post('/', authenticateToken, requireAdmin, validateEvent, handleValidationErrors, createEvent);
router.put('/:id', authenticateToken, requireAdmin, validateEvent, handleValidationErrors, updateEvent);
router.delete('/:id', authenticateToken, requireAdmin, deleteEvent);

export default router;