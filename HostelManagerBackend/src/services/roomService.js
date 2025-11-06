import Room from '../Models/Room.js';
import Hostel from '../Models/Hostel.js';
import { AppError } from '../utils/errorHandler.js';
import { buildRoomFilter, filterRoomsByLocation } from '../utils/validationHelper.js';

export class RoomService {
  static async getRoomsByHostelId(hostelId) {
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) throw new AppError('Hostel not found', 404);

    const rooms = await Room.find({ hostelId, isAvailable: true })
      .populate('hostelId', 'name location rating')
      .sort({ roomPrice: 1 });

    return {
      hostel: { id: hostel._id, name: hostel.name, location: hostel.location, rating: hostel.rating },
      rooms,
      count: rooms.length
    };
  }

  static async getRoomById(roomId) {
    const room = await Room.findById(roomId)
      .populate('hostelId', 'name location rating amenities description image');
    
    if (!room) throw new AppError('Room not found', 404);
    return room;
  }

  static async getAllAvailableRooms(filters) {
    const filter = buildRoomFilter(filters);
    const rooms = await Room.find(filter)
      .populate('hostelId', 'name location rating image')
      .sort({ roomPrice: 1 })
      .lean();

    const filteredRooms = filterRoomsByLocation(rooms, filters.location);

    return {
      rooms: filteredRooms,
      count: filteredRooms.length,
      filters
    };
  }
}