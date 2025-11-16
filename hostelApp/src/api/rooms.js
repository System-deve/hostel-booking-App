import api from './api.js';

export const roomsAPI = {
  // Get all rooms for the current manager
  getRooms: async () => {
    const response = await api.get('/rooms');
    return response.data;
  },

  // Get single room by ID
  getRoom: async (roomId) => {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  },

  // Create new room
  createRoom: async (roomData) => {
    const response = await api.post('/rooms', roomData);
    return response.data;
  },

  // Update room
  updateRoom: async (roomId, roomData) => {
    const response = await api.put(`/rooms/${roomId}`, roomData);
    return response.data;
  },

  // Update room status
  updateRoomStatus: async (roomId, status, maintenanceReason = '') => {
    const response = await api.patch(`/rooms/${roomId}/status`, {
      status,
      maintenanceReason
    });
    return response.data;
  },

  // Delete room
  deleteRoom: async (roomId) => {
    const response = await api.delete(`/rooms/${roomId}`);
    return response.data;
  },

  // Upload room images
  uploadRoomImages: async (roomId, images) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append('images', image);
      } else if (typeof image === 'string') {
        // Convert base64 to blob if needed
        const blob = dataURLtoBlob(image);
        formData.append('images', blob, `image-${index}.jpg`);
      }
    });
    
    const response = await api.post(`/rooms/${roomId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete room image
  deleteRoomImage: async (roomId, imageIndex) => {
    const response = await api.delete(`/rooms/${roomId}/images/${imageIndex}`);
    return response.data;
  }
};

// Helper function to convert base64 to blob
function dataURLtoBlob(dataURL) {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export default roomsAPI;
