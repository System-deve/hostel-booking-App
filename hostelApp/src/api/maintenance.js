import api from './api.js';

export const maintenanceAPI = {
  // Get all maintenance requests
  getMaintenanceRequests: async (params = {}) => {
    const response = await api.get('/maintenance', { params });
    return response.data;
  },

  // Get maintenance statistics
  getMaintenanceStats: async () => {
    const response = await api.get('/maintenance/stats');
    return response.data;
  },

  // Get single maintenance request
  getMaintenanceRequest: async (maintenanceId) => {
    const response = await api.get(`/maintenance/${maintenanceId}`);
    return response.data;
  },

  // Create new maintenance request
  createMaintenanceRequest: async (maintenanceData) => {
    const response = await api.post('/maintenance', maintenanceData);
    return response.data;
  },

  // Update maintenance request
  updateMaintenanceRequest: async (maintenanceId, maintenanceData) => {
    const response = await api.put(`/maintenance/${maintenanceId}`, maintenanceData);
    return response.data;
  },

  // Update maintenance status
  updateMaintenanceStatus: async (maintenanceId, statusData) => {
    const response = await api.patch(`/maintenance/${maintenanceId}/status`, statusData);
    return response.data;
  },

  // Add images to maintenance request
  addMaintenanceImages: async (maintenanceId, images) => {
    const response = await api.patch(`/maintenance/${maintenanceId}/images`, { images });
    return response.data;
  },

  // Delete maintenance request
  deleteMaintenanceRequest: async (maintenanceId) => {
    const response = await api.delete(`/maintenance/${maintenanceId}`);
    return response.data;
  }
};

export default maintenanceAPI;