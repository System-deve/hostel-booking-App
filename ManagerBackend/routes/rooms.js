
import express from 'express';
import { roomController } from '../controllers/roomController.js';
import { paymentController } from '../controllers/paymentController.js';
import { protect, checkOwnership } from '../middleware/auth.js';
import Room from '../models/Room.js';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// GET /api/rooms - Get all rooms for manager
router.get('/', roomController.getRooms);

// GET /api/rooms/stats - Get room statistics
router.get('/stats', roomController.getRoomStats);

// GET /api/rooms/:id - Get single room
router.get('/:id', checkOwnership(Room), roomController.getRoom);

// POST /api/rooms - Create new room
router.post('/', roomController.createRoom);

// PUT /api/rooms/:id - Update room
router.put('/:id', checkOwnership(Room), roomController.updateRoom);

// PATCH /api/rooms/:id/occupancy - Update room occupancy
router.patch('/:id/occupancy', checkOwnership(Room), roomController.updateRoomOccupancy);

// PATCH /api/rooms/:id/maintenance - Set room to maintenance
router.patch('/:id/maintenance', checkOwnership(Room), roomController.setRoomMaintenance);

// PATCH /api/rooms/:id/clear-maintenance - Clear room maintenance
router.patch('/:id/clear-maintenance', checkOwnership(Room), roomController.clearRoomMaintenance);

// POST /api/rooms/:id/images - Upload room images
router.post('/:id/images', checkOwnership(Room), roomController.uploadImages);

// DELETE /api/rooms/:id - Delete room
router.delete('/:id', checkOwnership(Room), roomController.deleteRoom);

// POST /api/rooms/:id/tenants - Add tenant to room
router.post('/:id/tenants', checkOwnership(Room), roomController.addTenant);

// DELETE /api/rooms/:roomId/tenants/:tenantId - Remove tenant from room
router.delete('/:roomId/tenants/:tenantId', checkOwnership(Room), roomController.removeTenant);

// PAYMENT ROUTES
// POST /api/rooms/:roomId/tenants/:tenantId/payments - Add payment
router.post('/:roomId/tenants/:tenantId/payments', checkOwnership(Room), paymentController.addPayment);

// GET /api/rooms/:roomId/tenants/:tenantId/payments - Get payment history
router.get('/:roomId/tenants/:tenantId/payments', checkOwnership(Room), paymentController.getPaymentHistory);

// PUT /api/rooms/:roomId/tenants/:tenantId/payments/:paymentId - Update payment
router.put('/:roomId/tenants/:tenantId/payments/:paymentId', checkOwnership(Room), paymentController.updatePayment);

// DELETE /api/rooms/:roomId/tenants/:tenantId/payments/:paymentId - Delete payment
router.delete('/:roomId/tenants/:tenantId/payments/:paymentId', checkOwnership(Room), paymentController.deletePayment);

export default router;