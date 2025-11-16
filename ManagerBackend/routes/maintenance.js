import express from 'express';
import { maintenanceController } from '../controllers/maintenanceController.js';
import { protect, checkOwnership } from '../middleware/auth.js';
import Maintenance from '../models/Maintenance.js';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// GET /api/maintenance - Get all maintenance requests
router.get('/', maintenanceController.getMaintenanceRequests);

// GET /api/maintenance/stats - Get maintenance statistics
router.get('/stats', maintenanceController.getMaintenanceStats);

// GET /api/maintenance/:id - Get single maintenance request
router.get('/:id', checkOwnership(Maintenance), maintenanceController.getMaintenanceRequest);

// POST /api/maintenance - Create new maintenance request
router.post('/', maintenanceController.createMaintenanceRequest);

// PUT /api/maintenance/:id - Update maintenance request
router.put('/:id', checkOwnership(Maintenance), maintenanceController.updateMaintenanceRequest);

// PATCH /api/maintenance/:id/status - Update maintenance status
router.patch('/:id/status', checkOwnership(Maintenance), maintenanceController.updateMaintenanceStatus);

// PATCH /api/maintenance/:id/images - Add images to maintenance request
router.patch('/:id/images', checkOwnership(Maintenance), maintenanceController.addMaintenanceImages);

// DELETE /api/maintenance/:id - Delete maintenance request
router.delete('/:id', checkOwnership(Maintenance), maintenanceController.deleteMaintenanceRequest);

export default router;