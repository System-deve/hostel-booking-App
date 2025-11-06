import Hostel from '../Models/Hostel.js';
import { AppError } from '../utils/errorHandler.js';

export class HostelService {
  static async getTopRatedHostels() {
    const hostels = await Hostel.aggregate([
      {
        $addFields: {
          amenitiesCount: { $size: "$amenities" }
        }
      },
      {
        $sort: { amenitiesCount: -1 }
      },
      {
        $limit: 10
      }
    ]);

    return {
      hostels,
      count: hostels.length
    };
  }

  static async getHostelsByLocation() {
    const hostels = await Hostel.aggregate([
      {
        $addFields: {
          locationLower: { $toLower: "$location" }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $group: {
          _id: "$locationLower",
          hostel: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$hostel" }
      }
    ]);

    return {
      hostels,
      count: hostels.length
    };
  }

  static async getAllHostels() {
    const hostels = await Hostel.find();
    
    if (hostels.length === 0) {
      throw new AppError('No hostels found', 404);
    }

    return {
      hostels,
      count: hostels.length,
      message: "Hostel(s) found!"
    };
  }
}