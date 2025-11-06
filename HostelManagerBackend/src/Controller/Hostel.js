import { HostelService } from '../services/hostelService.js';
import { sendSuccess } from '../utils/responseHelper.js';

export const getTopRatedHostels = async (req, res, next) => {
  try {
    const result = await HostelService.getTopRatedHostels();
    sendSuccess(res, {
      data: result.hostels,
      count: result.count
    });
  } catch (error) {
    next(error);
  }
};

export const fetchDifferentLocation = async (req, res, next) => {
  try {
    const result = await HostelService.getHostelsByLocation();
    sendSuccess(res, {
      data: result.hostels,
      count: result.count
    });
  } catch (error) {
    next(error);
  }
};

export const getAllHostel = async (req, res, next) => {
  try {
    const result = await HostelService.getAllHostels();
    sendSuccess(res, {
      data: result.hostels,
      count: result.count,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};