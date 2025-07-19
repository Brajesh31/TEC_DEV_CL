import express from 'express';
import {
  getCommunityLinks,
  updateCommunityLinks
} from '../controllers/communityController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/links', getCommunityLinks);

// Admin routes
router.put('/links', authenticateToken, requireAdmin, updateCommunityLinks);

export default router;