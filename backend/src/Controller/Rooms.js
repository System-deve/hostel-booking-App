import { RoomService } from '../services/roomService.js';
import { sendSuccess } from '../utils/responseHelper.js';

export const getRoomsByHostelId = async (req, res, next) => {
  try {
    const { hostelId } = req.params;
    const result = await RoomService.getRoomsByHostelId(hostelId);
    
    sendSuccess(res, {
      hostel: result.hostel,
      data: result.rooms,
      count: result.count
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const room = await RoomService.getRoomById(roomId);
    
    sendSuccess(res, { data: room });
  } catch (error) {
    next(error);
  }
};

export const getAllAvailableRooms = async (req, res, next) => {
  try {
    const result = await RoomService.getAllAvailableRooms(req.query);
    
    sendSuccess(res, {
      data: result.rooms,
      count: result.count,
      filters: result.filters
    });
  } catch (error) {
    next(error);
  }
};