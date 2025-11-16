import express from 'express';
import { tenantController } from '../controllers/tenantController.js';
import { protect, checkOwnership } from '../middleware/auth.js';
import Tenant from '../models/Tenant.js';

const router = express.Router();

router.use(protect);

// POST /api/payments/tenant/:tenantId - Add payment
router.post('/tenant/:tenantId', checkOwnership(Tenant), tenantController.addPayment);

// GET /api/payments/tenant/:tenantId - Get payment history
router.get('/tenant/:tenantId', checkOwnership(Tenant), tenantController.getPaymentHistory);

export default router;