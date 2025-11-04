// src/components/dashboard/MyRoomsPage.jsx
import React, { useState, useEffect } from 'react';
import { hostelManagerStore } from '../../data/store/HostelManagerStore';

const MyRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingRoom, setEditingRoom] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = () => {
    const allRooms = hostelManagerStore.rooms || [];
    setRooms(allRooms);
  };

  const filteredRooms = rooms.filter(room => {
    if (filter === 'all') return true;
    return room.status === filter;
  });

  const getStatusColor = (status) => {
    const colors = {
      occupied: '#ef4444',
      available: '#10b981', 
      'partially-occupied': '#f59e0b',
      maintenance: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowEditModal(true);
  };

  const handleUpdateRoom = (updatedData) => {
    // Update room in store
    const roomIndex = rooms.findIndex(r => r.id === editingRoom.id);
    if (roomIndex !== -1) {
      const updatedRoom = { ...rooms[roomIndex], ...updatedData };
      rooms[roomIndex] = updatedRoom;
      setRooms([...rooms]);
      setShowEditModal(false);
      setEditingRoom(null);
      alert('Room updated successfully!');
    }
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
      const updatedRooms = rooms.filter(room => room.id !== roomId);
      setRooms(updatedRooms);
      // In a real app, you would call hostelManagerStore.deleteRoom(roomId)
      alert('Room deleted successfully!');
    }
  };

  const handleToggleStatus = (roomId, currentStatus) => {
    let newStatus;
    switch (currentStatus) {
      case 'available':
        newStatus = 'maintenance';
        break;
      case 'maintenance':
        newStatus = 'available';
        break;
      default:
        return; // Don't change occupied/partially-occupied rooms
    }

    const roomIndex = rooms.findIndex(r => r.id === roomId);
    if (roomIndex !== -1) {
      rooms[roomIndex].status = newStatus;
      setRooms([...rooms]);
      alert(`Room status changed to ${newStatus}`);
    }
  };

  return (
    <div className="page-container">
      <div className="content-header">
        <div className="header-left">
          <h2>My Rooms</h2>
          <p>Manage all your rooms, view status, and make changes</p>
        </div>
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Rooms</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="partially-occupied">Partially Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div className="rooms-management-grid">
        {filteredRooms.map(room => (
          <div key={room.id} className="room-management-card">
            <div className="room-management-header">
              <div className="room-management-number">{room.roomNumber}</div>
              <div 
                className="room-management-status"
                style={{ backgroundColor: getStatusColor(room.status) }}
              >
                {room.status.replace('-', ' ').toUpperCase()}
              </div>
            </div>

            <div className="room-management-info">
              <div className="room-management-details">
                <div className="room-management-type">
                  <strong>{room.roomType.toUpperCase()} ROOM</strong>
                </div>
                <div className="room-management-price">
                  UGX {room.price.toLocaleString()}/month
                </div>
                <div className="room-management-features">
                  <span>Floor {room.floorNumber}</span>
                  <span>•</span>
                  <span>{room.capacity} {room.roomType === 'single' ? 'person' : 'people'}</span>
                  <span>•</span>
                  <span>{room.isSelfContained ? 'Self Contained' : 'Shared Facilities'}</span>
                </div>
                <div className="room-management-hostel">
                  {room.hostelName}
                </div>
              </div>

              {room.tenant && (
                <div className="room-management-tenant">
                  <div className="tenant-name">
                    <i className="fas fa-user"></i>
                    {room.tenant.name}
                  </div>
                  <div className="tenant-dates">
                    Until: {new Date(room.tenant.checkOutDate).toLocaleDateString()}
                  </div>
                  <div className={`tenant-balance ${room.tenant.balance > 0 ? 'pending' : 'paid'}`}>
                    {room.tenant.balance > 0 ? `Balance: UGX ${room.tenant.balance.toLocaleString()}` : 'Paid'}
                  </div>
                </div>
              )}
            </div>

            <div className="room-management-actions">
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => handleEditRoom(room)}
              >
                <i className="fas fa-edit"></i> Edit
              </button>
              
              {(room.status === 'available' || room.status === 'maintenance') && (
                <button 
                  className={`btn ${room.status === 'maintenance' ? 'btn-success' : 'btn-warning'} btn-sm`}
                  onClick={() => handleToggleStatus(room.id, room.status)}
                >
                  <i className="fas fa-tools"></i>
                  {room.status === 'maintenance' ? 'Mark Available' : 'Maintenance'}
                </button>
              )}
              
              {!room.tenant && (
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              )}
              
              {room.tenant && (
                <button 
                  className="btn btn-info btn-sm"
                  onClick={() => alert(`Contact: ${room.tenant.phone}\nEmail: ${room.tenant.email}`)}
                >
                  <i className="fas fa-phone"></i> Contact
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredRooms.length === 0 && (
          <div className="no-rooms-management">
            <i className="fas fa-door-open"></i>
            <h3>No rooms found</h3>
            <p>{filter === 'all' ? 'You haven\'t added any rooms yet.' : `No ${filter} rooms found.`}</p>
          </div>
        )}
      </div>

      {/* Edit Room Modal */}
      {showEditModal && editingRoom && (
        <EditRoomModal
          room={editingRoom}
          onClose={() => {
            setShowEditModal(false);
            setEditingRoom(null);
          }}
          onSave={handleUpdateRoom}
        />
      )}
    </div>
  );
};

// Edit Room Modal Component
const EditRoomModal = ({ room, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    roomNumber: room.roomNumber,
    roomType: room.roomType,
    floorNumber: room.floorNumber,
    price: room.price,
    isSelfContained: room.isSelfContained
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Room {room.roomNumber}</h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Room Number *</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Room Type *</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                required
              >
                <option value="single">Single Room</option>
                <option value="double">Double Room</option>
                <option value="triple">Triple Room</option>
              </select>
            </div>

            <div className="form-group">
              <label>Floor Number *</label>
              <select
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleChange}
                required
              >
                <option value="1">Floor 1</option>
                <option value="2">Floor 2</option>
                <option value="3">Floor 3</option>
              </select>
            </div>

            <div className="form-group">
              <label>Monthly Rent (UGX) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isSelfContained"
                  checked={formData.isSelfContained}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Self Contained Room
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyRoomsPage;