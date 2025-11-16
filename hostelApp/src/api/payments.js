import api from './api.js';

export const paymentsAPI = {
  // Add payment for tenant
  addPayment: async (roomId, tenantId, paymentData) => {
    const response = await api.post(`/rooms/${roomId}/tenants/${tenantId}/payments`, paymentData);
    return response.data;
  },

  // Get payment history for tenant
  getPaymentHistory: async (roomId, tenantId) => {
    const response = await api.get(`/rooms/${roomId}/tenants/${tenantId}/payments`);
    return response.data;
  },

  // Update payment
  updatePayment: async (roomId, tenantId, paymentId, paymentData) => {
    const response = await api.put(`/rooms/${roomId}/tenants/${tenantId}/payments/${paymentId}`, paymentData);
    return response.data;
  },

  // Delete payment
  deletePayment: async (roomId, tenantId, paymentId) => {
    const response = await api.delete(`/rooms/${roomId}/tenants/${tenantId}/payments/${paymentId}`);
    return response.data;
  }
};

export default paymentsAPI;