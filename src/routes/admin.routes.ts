import express from 'express';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';
import { getAnalytics } from '../controllers/admin.controller';

const router = express.Router();

router.get('/dashboard', authenticate, isAdmin, getAnalytics);

export default router;