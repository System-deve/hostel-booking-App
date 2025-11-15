
import express from 'express';
import { tenantController } from '../controllers/tenantController.js';
import { protect, checkOwnership } from '../middleware/auth.js';
import Tenant from '../models/Tenant.js';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// GET /api/tenants - Get all tenants for manager
router.get('/', tenantController.getTenants);

// GET /api/tenants/overdue - Get overdue tenants
router.get('/overdue', tenantController.getOverdueTenants);

// GET /api/tenants/:id - Get single tenant
router.get('/:id', checkOwnership(Tenant), tenantController.getTenant);

// PUT /api/tenants/:id - Update tenant
router.put('/:id', checkOwnership(Tenant), tenantController.updateTenant);

// DELETE /api/tenants/:id - Delete tenant
router.delete('/:id', checkOwnership(Tenant), tenantController.deleteTenant);

// Payment routes (these will be handled in rooms routes for now, but you can add here too)
// POST /api/tenants/:tenantId/payments - Add payment
router.post('/:tenantId/payments', checkOwnership(Tenant), tenantController.addPayment);

// GET /api/tenants/:tenantId/payments - Get payment history
router.get('/:tenantId/payments', checkOwnership(Tenant), tenantController.getPaymentHistory);

export default router;