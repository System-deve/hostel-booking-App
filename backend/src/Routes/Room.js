import express from 'express';
import { getRoomsByHostelId, getRoomById, getAllAvailableRooms, } from '../Controller/Rooms.js';

const router = express.Router();

router.get('/available', getAllAvailableRooms);

router.get('/hostel/:hostelId', getRoomsByHostelId);

router.get('/:roomId', getRoomById);



export default router;