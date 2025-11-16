import api from './api.js';

export const tenantsAPI = {
  // Check-in tenant to room
  checkInTenant: async (roomId, tenantData) => {
    const response = await api.post(`/rooms/${roomId}/tenants`, tenantData);
    return response.data;
  },

  // Check-out tenant from room
  checkOutTenant: async (roomId, tenantId) => {
    const response = await api.delete(`/rooms/${roomId}/tenants/${tenantId}`);
    return response.data;
  },

  // Update tenant information
  updateTenant: async (roomId, tenantId, tenantData) => {
    const response = await api.put(`/rooms/${roomId}/tenants/${tenantId}`, tenantData);
    return response.data;
  },

  // Get tenant details
  getTenant: async (roomId, tenantId) => {
    const response = await api.get(`/rooms/${roomId}/tenants/${tenantId}`);
    return response.data;
  }
};

export default tenantsAPI;

