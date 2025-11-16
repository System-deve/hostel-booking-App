import React, { useState, useEffect } from 'react';
import './RoomsPage.css';

const API_BASE = 'http://localhost:5000/api';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get auth token
  const getToken = () => localStorage.getItem('token');

  // API call function
  const apiCall = async (url, options = {}) => {
    const response = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      ...options
    });
    return await response.json();
  };

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    const filterRooms = () => {
      let filtered = rooms;

      if (statusFilter !== 'all') {
        filtered = filtered.filter(room => room.status === statusFilter);
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(room => 
          room.roomNumber.toLowerCase().includes(query) ||
          room.tenants?.some(tenant => tenant.name.toLowerCase().includes(query)) ||
          room.roomType.toLowerCase().includes(query)
        );
      }

      setFilteredRooms(filtered);
    };
    filterRooms();
  }, [rooms, searchQuery, statusFilter]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const result = await apiCall('/rooms');
      if (result.success) {
        setRooms(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error loading rooms:', error);
      alert('Error loading rooms: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (roomData) => {
    setLoading(true);
    try {
      const result = await apiCall('/rooms', {
        method: 'POST',
        body: JSON.stringify(roomData)
      });
      
      if (result.success) {
        await loadRooms();
        setShowAddRoomModal(false);
        alert('Room added successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Error adding room: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTenant = async (tenantData) => {
    setLoading(true);
    try {
      const result = await apiCall(`/rooms/${selectedRoom._id}/tenants`, {
        method: 'POST',
        body: JSON.stringify(tenantData)
      });
      
      if (result.success) {
        await loadRooms();
        setShowAddTenantModal(false);
        setSelectedRoom(null);
        alert('Tenant checked in successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Error checking in tenant: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = async (paymentData) => {
    setLoading(true);
    try {
      const result = await apiCall(`/rooms/${selectedRoom._id}/tenants/${selectedTenant._id}/payments`, {
        method: 'POST',
        body: JSON.stringify(paymentData)
      });
      
      if (result.success) {
        await loadRooms();
        setShowAddPaymentModal(false);
        setSelectedRoom(null);
        setSelectedTenant(null);
        alert('Payment added successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Error adding payment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImages = async (roomId, images) => {
    setLoading(true);
    try {
      const result = await apiCall(`/rooms/${roomId}/images`, {
        method: 'POST',
        body: JSON.stringify({ images })
      });
      
      if (result.success) {
        await loadRooms();
        setShowImageUploadModal(false);
        setSelectedRoom(null);
        alert('Images uploaded successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Error uploading images: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (roomId, imageIndex) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setLoading(true);
      try {
        // For simplicity, we'll re-upload images without the deleted one
        const room = rooms.find(r => r._id === roomId);
        const updatedImages = room.images.filter((_, index) => index !== imageIndex);
        
        const result = await apiCall(`/rooms/${roomId}/images`, {
          method: 'POST',
          body: JSON.stringify({ images: updatedImages })
        });
        
        if (result.success) {
          await loadRooms();
          alert('Image deleted successfully!');
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        alert('Error deleting image: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCheckOutTenant = async (roomId, tenantId) => {
    if (window.confirm('Are you sure you want to check out this tenant?')) {
      setLoading(true);
      try {
        const result = await apiCall(`/rooms/${roomId}/tenants/${tenantId}`, {
          method: 'DELETE'
        });
        
        if (result.success) {
          await loadRooms();
          alert('Tenant checked out successfully!');
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        alert('Error checking out tenant: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateRoomStatus = async (roomId, newStatus) => {
    setLoading(true);
    try {
      const result = await apiCall(`/rooms/${roomId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      
      if (result.success) {
        await loadRooms();
        alert('Room status updated successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Error updating room status: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
      setLoading(true);
      try {
        const result = await apiCall(`/rooms/${roomId}`, {
          method: 'DELETE'
        });
        
        if (result.success) {
          await loadRooms();
          alert('Room deleted successfully!');
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        alert('Error deleting room: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      occupied: '#ef4444',
      available: '#10b981',
      'partially-occupied': '#f59e0b',
      maintenance: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusText = (status) => {
    const statusMap = {
      'occupied': 'Occupied',
      'available': 'Available',
      'partially-occupied': 'Partially Occupied',
      'maintenance': 'Maintenance'
    };
    return statusMap[status] || status;
  };

  const getRoomTypeText = (roomType) => {
    const typeMap = {
      'single': 'Single',
      'double': 'Double',
      'triple': 'Triple'
    };
    return typeMap[roomType] || roomType;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading rooms...</p>
        </div>
      </div>
    );
  }








  // ... REST OF YOUR EXISTING JSX CODE REMAINS EXACTLY THE SAME ...
  // RoomCard, AddRoomModal, AddTenantModal, AddPaymentModal, ImageUploadModal, RoomDetailsModal
  // ALL THESE COMPONENTS STAY EXACTLY AS YOU HAD THEM

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Room Management</h1>
          <p className="page-subtitle">Manage all your rooms, tenants, and maintenance</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddRoomModal(true)}
            disabled={loading}
          >
            <i className="fas fa-plus"></i>
            Add New Room
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by room number, tenant name, or room type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
            disabled={loading}
          >
            All Rooms
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'available' ? 'active' : ''}`}
            onClick={() => setStatusFilter('available')}
            disabled={loading}
          >
            Available
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'occupied' ? 'active' : ''}`}
            onClick={() => setStatusFilter('occupied')}
            disabled={loading}
          >
            Occupied
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'partially-occupied' ? 'active' : ''}`}
            onClick={() => setStatusFilter('partially-occupied')}
            disabled={loading}
          >
            Partial
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'maintenance' ? 'active' : ''}`}
            onClick={() => setStatusFilter('maintenance')}
            disabled={loading}
          >
            Maintenance
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-value">{rooms.length}</div>
          <div className="stat-label">Total Rooms</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{rooms.filter(r => r.status === 'available').length}</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{rooms.filter(r => r.status === 'occupied').length}</div>
          <div className="stat-label">Occupied</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{rooms.reduce((sum, room) => sum + (room.tenants?.length || 0), 0)}</div>
          <div className="stat-label">Total Tenants</div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="rooms-grid">
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => (
            <RoomCard 
              key={room._id}
              room={room}
              onViewDetails={() => {
                setSelectedRoom(room);
                setShowRoomDetails(true);
              }}
              onAddTenant={(room) => {
                setSelectedRoom(room);
                setShowAddTenantModal(true);
              }}
              onAddPayment={(room, tenant) => {
                setSelectedRoom(room);
                setSelectedTenant(tenant);
                setShowAddPaymentModal(true);
              }}
              onUploadImages={(room) => {
                setSelectedRoom(room);
                setShowImageUploadModal(true);
              }}
              onDeleteImage={handleDeleteImage}
              onCheckOutTenant={handleCheckOutTenant}
              onUpdateStatus={handleUpdateRoomStatus}
              onDelete={handleDeleteRoom}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
              getRoomTypeText={getRoomTypeText}
              loading={loading}
            />
          ))
        ) : (
          <div className="no-rooms-found">
            <i className="fas fa-door-open"></i>
            <h3>No rooms found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddRoomModal(true)}
            >
              <i className="fas fa-plus"></i>
              Add Your First Room
            </button>
          </div>
        )}
      </div>

      {/* Modals - USE YOUR EXISTING MODAL COMPONENTS */}
      {showAddRoomModal && (
        <AddRoomModal
          onSave={handleAddRoom}
          onClose={() => setShowAddRoomModal(false)}
          loading={loading}
        />
      )}

      {showAddTenantModal && selectedRoom && (
        <AddTenantModal
          room={selectedRoom}
          onSave={handleAddTenant}
          onClose={() => {
            setShowAddTenantModal(false);
            setSelectedRoom(null);
          }}
          loading={loading}
        />
      )}

      {showAddPaymentModal && selectedRoom && selectedTenant && (
        <AddPaymentModal
          room={selectedRoom}
          tenant={selectedTenant}
          onSave={handleAddPayment}
          onClose={() => {
            setShowAddPaymentModal(false);
            setSelectedRoom(null);
            setSelectedTenant(null);
          }}
          loading={loading}
        />
      )}

      {showImageUploadModal && selectedRoom && (
        <ImageUploadModal
          room={selectedRoom}
          onSave={handleUploadImages}
          onClose={() => {
            setShowImageUploadModal(false);
            setSelectedRoom(null);
          }}
          loading={loading}
        />
      )}

      {showRoomDetails && selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          onClose={() => {
            setShowRoomDetails(false);
            setSelectedRoom(null);
          }}
          onAddTenant={() => {
            setShowRoomDetails(false);
            setShowAddTenantModal(true);
          }}
          onAddPayment={(tenant) => {
            setShowRoomDetails(false);
            setSelectedTenant(tenant);
            setShowAddPaymentModal(true);
          }}
          onUploadImages={() => {
            setShowRoomDetails(false);
            setShowImageUploadModal(true);
          }}
          onDeleteImage={handleDeleteImage}
          onCheckOutTenant={handleCheckOutTenant}
          onUpdateStatus={handleUpdateRoomStatus}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          getRoomTypeText={getRoomTypeText}
          loading={loading}
        />
      )}
    </div>
  );
};

// KEEP ALL YOUR EXISTING COMPONENTS EXACTLY AS THEY WERE:
// RoomCard, AddRoomModal, AddTenantModal, AddPaymentModal, ImageUploadModal, RoomDetailsModal

const RoomCard = ({ 
  room, 
  onViewDetails, 
  onAddTenant,
  onAddPayment,
  onUploadImages,
  onCheckOutTenant,
  onUpdateStatus, 
  onDelete,
  getStatusColor,
  getStatusText,
  getRoomTypeText,
  loading 
}) =>  {
  const availableSpots = room.capacity - room.currentOccupancy;
  const displayImage = room.images && room.images.length > 0 ? room.images[0] : null;

  // Handle adding payment for a specific tenant
  const handleAddPayment = (tenant) => {
    if (onAddPayment) {
      onAddPayment(room, tenant);
    }
  };

  // Handle checking out a specific tenant
  const handleCheckOutTenant = (tenantId, tenantName) => {
    if (onCheckOutTenant && window.confirm(`Are you sure you want to check out ${tenantName}?`)) {
      onCheckOutTenant(room.id, tenantId);
    }
  };

  return (
    <div className="room-card">
      {/* Room Image Section */}
      <div className="room-card-image">
        {displayImage ? (
          <div className="image-container">
            <img src={displayImage} alt={`Room ${room.roomNumber}`} />
            <div className="image-overlay">
              <button 
                className="btn-image-action"
                onClick={() => onUploadImages(room)}
                disabled={loading}
                title="Manage Images"
              >
                <i className="fas fa-camera"></i>
                {room.images?.length > 1 && <span className="image-count">+{room.images.length - 1}</span>}
              </button>
            </div>
          </div>
        ) : (
          <div className="no-image-placeholder">
            <i className="fas fa-camera"></i>
            <span>No Images</span>
            <button 
              className="btn-add-image"
              onClick={() => onUploadImages(room)}
              disabled={loading}
            >
              <i className="fas fa-plus"></i>
              Add Images
            </button>
          </div>
        )}
      </div>

      <div className="room-card-header">
        <div className="room-number">{room.roomNumber}</div>
        <div 
          className="room-status-badge"
          style={{ backgroundColor: getStatusColor(room.status) }}
        >
          {getStatusText(room.status)}
        </div>
      </div>

      <div className="room-card-body">
        <div className="room-info">
          <div className="room-type">{getRoomTypeText(room.roomType)} Room</div>
          <div className="room-price">UGX {room.price.toLocaleString()}/month</div>
        </div>

        <div className="room-meta">
          <span className="floor">Floor {room.floorNumber}</span>
          <span className="occupancy">
            {room.currentOccupancy}/{room.capacity} {room.roomType === 'single' ? 'person' : 'people'}
          </span>
        </div>

        {room.tenants && room.tenants.length > 0 && (
          <div className="tenants-preview">
            <div className="tenants-header">
              <i className="fas fa-users"></i>
              <span>Tenants ({room.tenants.length})</span>
            </div>
            <div className="tenants-list">
              {room.tenants.slice(0, 3).map((tenant) => (
                <div key={tenant.id} className="tenant-preview">
                  <div className="tenant-info-main">
                    <span className="tenant-name">{tenant.name}</span>
                    <span className={`tenant-balance ${tenant.balance > 0 ? 'has-balance' : ''}`}>
                      {tenant.balance > 0 ? `UGX ${tenant.balance.toLocaleString()}` : 'Paid'}
                    </span>
                  </div>
                  <div className="tenant-actions-preview">
                    {tenant.balance > 0 && (
                      <button 
                        className="btn-payment"
                        onClick={() => handleAddPayment(tenant)}
                        disabled={loading}
                        title="Add Payment"
                      >
                        <i className="fas fa-money-bill-wave"></i>
                      </button>
                    )}
                    <button 
                      className="btn-checkout"
                      onClick={() => handleCheckOutTenant(tenant.id, tenant.name)}
                      disabled={loading}
                      title="Check Out"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
              {room.tenants.length > 3 && (
                <div className="more-tenants">
                  +{room.tenants.length - 3} more tenants - view details to see all
                </div>
              )}
            </div>
          </div>
        )}

        {room.maintenanceReason && (
          <div className="maintenance-info">
            <i className="fas fa-tools"></i>
            <span>{room.maintenanceReason}</span>
          </div>
        )}

        {availableSpots > 0 && room.status !== 'maintenance' && (
          <div className="available-spots">
            <i className="fas fa-info-circle"></i>
            <span>{availableSpots} spot{availableSpots > 1 ? 's' : ''} available</span>
          </div>
        )}
      </div>

      <div className="room-card-actions">
        <button 
          className="btn btn-outline" 
          onClick={onViewDetails}
          disabled={loading}
        >
          <i className="fas fa-eye"></i>
          Details
        </button>
        
        <button 
          className="btn btn-info"
          onClick={() => onUploadImages(room)}
          disabled={loading}
        >
          <i className="fas fa-images"></i>
          Images
        </button>
        
        {availableSpots > 0 && room.status !== 'maintenance' && (
          <button 
            className="btn btn-success"
            onClick={() => onAddTenant(room)}
            disabled={loading}
          >
            <i className="fas fa-user-plus"></i>
            Add Tenant
          </button>
        )}
        
        {room.status === 'available' && (
          <button 
            className="btn btn-warning"
            onClick={() => onUpdateStatus(room.id, 'maintenance')}
            disabled={loading}
          >
            <i className="fas fa-tools"></i>
            Maintenance
          </button>
        )}
        
        {room.status === 'maintenance' && (
          <button 
            className="btn btn-success"
            onClick={() => onUpdateStatus(room.id, 'available')}
            disabled={loading}
          >
            <i className="fas fa-check"></i>
            Available
          </button>
        )}

        {room.currentOccupancy === 0 && (
          <button 
            className="btn btn-danger"
            onClick={() => onDelete(room.id)}
            disabled={loading}
          >
            <i className="fas fa-trash"></i>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

const AddRoomModal = ({ onSave, onClose, loading }) => {
  // ... YOUR EXISTING AddRoomModal CODE ...
    const [formData, setFormData] = useState({
      roomNumber: '',
      roomType: 'single',
      floorNumber: 1,
      price: '',
      hostelId: 'hostel_001',
      isSelfContained: true,
      images: []
    });
  
    const [imagePreviews, setImagePreviews] = useState([]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!formData.roomNumber || !formData.price) {
        alert('Please fill in all required fields');
        return;
      }
  
      const roomData = {
        ...formData,
        price: parseInt(formData.price),
        capacity: formData.roomType === 'single' ? 1 : formData.roomType === 'double' ? 2 : 3,
        hostelName: formData.hostelId === 'hostel_001' ? 'Green Valley Hostel' : 'Sunrise Hostels',
        currentOccupancy: 0,
        status: 'available'
      };
  
      onSave(roomData);
    };
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        alert('You can only upload up to 5 images');
        return;
      }
  
      const newImages = [];
      const newPreviews = [];
  
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            newPreviews.push(e.target.result);
            newImages.push(e.target.result);
            
            if (newPreviews.length === files.length) {
              setImagePreviews(prev => [...prev, ...newPreviews]);
              setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...newImages]
              }));
            }
          };
          reader.readAsDataURL(file);
        }
      });
    };
  
    const removeImage = (index) => {
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    };
  
    return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Room</h2>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="roomNumber">Room Number *</label>
            <input
              id="roomNumber"
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="e.g., 101, 202A"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomType">Room Type *</label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="triple">Triple Room</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="floorNumber">Floor Number *</label>
            <select
              id="floorNumber"
              name="floorNumber"
              value={formData.floorNumber}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Monthly Rent (UGX) *</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="450000"
              min="0"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hostelId">Hostel</label>
            <select
              id="hostelId"
              name="hostelId"
              value={formData.hostelId}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="hostel_001">Green Valley Hostel</option>
              <option value="hostel_002">Sunrise Hostels</option>
            </select>
          </div>

          {/* Image Upload Section */}
          <div className="form-group">
            <label>Room Images (Optional)</label>
            <div className="image-upload-area">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading || imagePreviews.length >= 5}
                className="image-upload-input"
              />
              <div className="upload-placeholder">
                <i className="fas fa-cloud-upload-alt"></i>
                <p>Click to upload room images</p>
                <small>Max 5 images • JPG, PNG, GIF</small>
              </div>
            </div>
            
            {imagePreviews.length > 0 && (
              <div className="image-previews">
                <h4>Selected Images ({imagePreviews.length}/5)</h4>
                <div className="preview-grid">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => removeImage(index)}
                        disabled={loading}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isSelfContained"
                checked={formData.isSelfContained}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="checkmark"></span>
              Self Contained Room
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

// Image Upload Modal Component
const ImageUploadModal = ({ room, onSave, onClose, loading }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    // Load existing images when modal opens
    if (room.images) {
      setImagePreviews(room.images);
      setSelectedImages(room.images);
    }
  }, [room]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = selectedImages.length + files.length;
    
    if (totalImages > 10) {
      alert('You can only have up to 10 images per room');
      return;
    }

    const newPreviews = [];
    const newImages = [];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target.result);
          newImages.push(e.target.result);
          
          if (newPreviews.length === files.length) {
            setImagePreviews(prev => [...prev, ...newPreviews]);
            setSelectedImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    onSave(room.id, selectedImages);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <h2>Upload Room Images - Room {room.roomNumber}</h2>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Room Images</label>
            <div className="image-upload-area large">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading || imagePreviews.length >= 10}
                className="image-upload-input"
              />
              <div className="upload-placeholder">
                <i className="fas fa-cloud-upload-alt"></i>
                <p>Click to upload room images</p>
                <small>Max 10 images • JPG, PNG, GIF • Recommended size: 800x600px</small>
              </div>
            </div>
            
            {imagePreviews.length > 0 && (
              <div className="image-previews">
                <h4>Room Images ({imagePreviews.length}/10)</h4>
                <div className="preview-grid">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <img src={preview} alt={`Room ${room.roomNumber} - Image ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => removeImage(index)}
                        disabled={loading}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Images'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add Tenant Modal Component (unchanged, but included for completeness)
const AddTenantModal = ({ room, onSave, onClose, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    university: '',
    course: '',
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: '',
    totalRent: room.price * 6, // Default to 6 months
    paymentMethod: 'cash'
  });

  useEffect(() => {
    // Set default checkout date to 6 months from now
    const defaultCheckout = new Date();
    defaultCheckout.setMonth(defaultCheckout.getMonth() + 6);
    setFormData(prev => ({
      ...prev,
      checkOutDate: defaultCheckout.toISOString().split('T')[0],
      totalRent: room.price * 6
    }));
  }, [room.price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.checkOutDate) {
      alert('Please fill in all required fields');
      return;
    }

    const tenantData = {
      ...formData,
      totalRent: parseInt(formData.totalRent),
      balance: parseInt(formData.totalRent)
    };

    onSave(tenantData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateRent = (months) => {
    return room.price * months;
  };

  const handleMonthsChange = (months) => {
    const checkOutDate = new Date(formData.checkInDate);
    checkOutDate.setMonth(checkOutDate.getMonth() + parseInt(months));
    
    setFormData(prev => ({
      ...prev,
      checkOutDate: checkOutDate.toISOString().split('T')[0],
      totalRent: calculateRent(months)
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Check-in Tenant - Room {room.roomNumber}</h2>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter tenant's full name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+256 XXX XXX XXX"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tenant@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="university">University</label>
            <input
              id="university"
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="University name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course</label>
            <input
              id="course"
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course of study"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkInDate">Check-in Date *</label>
            <input
              id="checkInDate"
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (months) *</label>
            <select
              id="duration"
              name="duration"
              onChange={(e) => handleMonthsChange(e.target.value)}
              required
              disabled={loading}
            >
              <option value="3">3 months</option>
              <option value="6" selected>6 months</option>
              <option value="12">12 months</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="checkOutDate">Check-out Date *</label>
            <input
              id="checkOutDate"
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalRent">Total Rent (UGX)</label>
            <input
              id="totalRent"
              type="number"
              name="totalRent"
              value={formData.totalRent}
              onChange={handleChange}
              min="0"
              disabled
            />
            <small>Monthly rent: UGX {room.price.toLocaleString()}</small>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Checking in...' : 'Check-in Tenant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// Add Payment Modal Component (unchanged, but included for completeness)
const AddPaymentModal = ({ room, tenant, onSave, onClose, loading }) => {
  const [formData, setFormData] = useState({
    amount: '',
    method: 'cash',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || formData.amount <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }

    if (parseInt(formData.amount) > tenant.balance) {
      alert('Payment amount cannot exceed outstanding balance');
      return;
    }

    const paymentData = {
      amount: parseInt(formData.amount),
      method: formData.method,
      notes: formData.notes
    };

    onSave(paymentData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Payment - {tenant.name}</h2>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="payment-info">
          <div className="info-item">
            <label>Room:</label>
            <span>{room.roomNumber}</span>
          </div>
          <div className="info-item">
            <label>Outstanding Balance:</label>
            <span className="balance-amount">UGX {tenant.balance.toLocaleString()}</span>
          </div>
          <div className="info-item">
            <label>Amount Paid:</label>
            <span>UGX {tenant.amountPaid.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="amount">Payment Amount (UGX) *</label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="1"
              max={tenant.balance}
              required
              disabled={loading}
            />
            <small>Maximum: UGX {tenant.balance.toLocaleString()}</small>
          </div>

          <div className="form-group">
            <label htmlFor="method">Payment Method *</label>
            <select
              id="method"
              name="method"
              value={formData.method}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="cash">Cash</option>
              <option value="mobile money">Mobile Money</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes..."
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Processing...' : 'Add Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


















// Room Details Modal Component - UPDATED WITH IMAGE GALLERY
const RoomDetailsModal = ({ 
  room, 
  onClose, 
  onAddTenant,
  onAddPayment,
  onUploadImages,
  onDeleteImage,
  onCheckOutTenant,
  onUpdateStatus,
  getStatusColor,
  getStatusText,
  getRoomTypeText,
  loading 
}) => {
  const availableSpots = room.capacity - room.currentOccupancy;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const nextImage = () => {
    setSelectedImageIndex(prev => 
      prev < room.images.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setSelectedImageIndex(prev => 
      prev > 0 ? prev - 1 : room.images.length - 1
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content x-large">
        <div className="modal-header">
          <h2>Room {room.roomNumber} Details</h2>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          {/* Image Gallery Section */}
          {room.images && room.images.length > 0 ? (
            <div className="room-image-gallery">
              <div className="gallery-main">
                <img 
                  src={room.images[selectedImageIndex]} 
                  alt={`Room ${room.roomNumber} - Image ${selectedImageIndex + 1}`}
                />
                {room.images.length > 1 && (
                  <>
                    <button className="gallery-nav prev" onClick={prevImage}>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="gallery-nav next" onClick={nextImage}>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </>
                )}
                <div className="gallery-counter">
                  {selectedImageIndex + 1} / {room.images.length}
                </div>
              </div>
              
              {room.images.length > 1 && (
                <div className="gallery-thumbnails">
                  {room.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="gallery-actions">
                <button 
                  className="btn btn-info"
                  onClick={onUploadImages}
                  disabled={loading}
                >
                  <i className="fas fa-images"></i>
                  Manage Images
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => onDeleteImage(room.id, selectedImageIndex)}
                  disabled={loading}
                >
                  <i className="fas fa-trash"></i>
                  Delete Current Image
                </button>
              </div>
            </div>
          ) : (
            <div className="no-images-section">
              <div className="no-images-placeholder">
                <i className="fas fa-camera"></i>
                <h4>No Room Images</h4>
                <p>Upload images to showcase this room to potential tenants</p>
                <button 
                  className="btn btn-primary"
                  onClick={onUploadImages}
                  disabled={loading}
                >
                  <i className="fas fa-plus"></i>
                  Upload Images
                </button>
              </div>
            </div>
          )}

          <div className="details-grid">
            <div className="detail-item">
              <label>Room Number:</label>
              <span>{room.roomNumber}</span>
            </div>
            <div className="detail-item">
              <label>Room Type:</label>
              <span>{getRoomTypeText(room.roomType)}</span>
            </div>
            <div className="detail-item">
              <label>Floor:</label>
              <span>Floor {room.floorNumber}</span>
            </div>
            <div className="detail-item">
              <label>Status:</label>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(room.status) }}
              >
                {getStatusText(room.status)}
              </span>
            </div>
            <div className="detail-item">
              <label>Monthly Rent (per person):</label>
              <span>UGX {room.price.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <label>Capacity:</label>
              <span>{room.capacity} {room.roomType === 'single' ? 'person' : 'people'}</span>
            </div>
            <div className="detail-item">
              <label>Current Occupancy:</label>
              <span>{room.currentOccupancy}</span>
            </div>
            <div className="detail-item">
              <label>Available Spots:</label>
              <span>{availableSpots}</span>
            </div>
            <div className="detail-item">
              <label>Self Contained:</label>
              <span>{room.isSelfContained ? 'Yes' : 'No'}</span>
            </div>
            <div className="detail-item">
              <label>Hostel:</label>
              <span>{room.hostelName}</span>
            </div>
          </div>

          {room.tenants && room.tenants.length > 0 && (
            <div className="tenants-section">
              <div className="section-header">
                <h3>Tenants Information ({room.tenants.length})</h3>
                {availableSpots > 0 && room.status !== 'maintenance' && (
                  <button 
                    className="btn btn-success"
                    onClick={onAddTenant}
                    disabled={loading}
                  >
                    <i className="fas fa-user-plus"></i>
                    Add Tenant
                  </button>
                )}
              </div>
              <div className="tenants-grid">
                {room.tenants.map((tenant, index) => (
                  <div key={tenant.id} className="tenant-card">
                    <div className="tenant-card-header">
                      <h4>Tenant {index + 1} - {tenant.name}</h4>
                      <div className="tenant-actions">
                        <button 
                          className="btn btn-outline"
                          onClick={() => onAddPayment(tenant)}
                          disabled={loading}
                        >
                          <i className="fas fa-money-bill-wave"></i>
                          Add Payment
                        </button>
                        <button 
                          className="btn btn-warning"
                          onClick={() => onCheckOutTenant(room.id, tenant.id)}
                          disabled={loading}
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          Check Out
                        </button>
                      </div>
                    </div>
                    
                    <div className="tenant-details">
                      <div className="detail-row">
                        <label>Name:</label>
                        <span>{tenant.name}</span>
                      </div>
                      <div className="detail-row">
                        <label>Phone:</label>
                        <span>{tenant.phone}</span>
                      </div>
                      <div className="detail-row">
                        <label>Email:</label>
                        <span>{tenant.email}</span>
                      </div>
                      <div className="detail-row">
                        <label>University:</label>
                        <span>{tenant.university}</span>
                      </div>
                      <div className="detail-row">
                        <label>Course:</label>
                        <span>{tenant.course}</span>
                      </div>
                      <div className="detail-row">
                        <label>Check-in Date:</label>
                        <span>{new Date(tenant.checkInDate).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-row">
                        <label>Check-out Date:</label>
                        <span>{new Date(tenant.checkOutDate).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-row">
                        <label>Paid Until:</label>
                        <span>{new Date(tenant.paidUntil).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-row">
                        <label>Total Rent:</label>
                        <span>UGX {tenant.totalRent?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="detail-row">
                        <label>Amount Paid:</label>
                        <span>UGX {tenant.amountPaid?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="detail-row">
                        <label>Balance:</label>
                        <span className={tenant.balance > 0 ? 'balance-amount' : ''}>
                          UGX {tenant.balance?.toLocaleString() || '0'}
                        </span>
                      </div>
                    </div>

                    {tenant.paymentHistory && tenant.paymentHistory.length > 0 && (
                      <div className="payment-history">
                        <h5>Payment History</h5>
                        <div className="payment-list">
                          {tenant.paymentHistory.map((payment) => (
                            <div key={payment.id} className="payment-item">
                              <span>{new Date(payment.date).toLocaleDateString()}</span>
                              <span>UGX {payment.amount.toLocaleString()}</span>
                              <span className={`payment-type ${payment.type}`}>
                                {payment.type} ({payment.method})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {room.maintenanceReason && (
            <div className="maintenance-section">
              <h3>Maintenance Information</h3>
              <div className="detail-item">
                <label>Reason:</label>
                <span>{room.maintenanceReason}</span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose} disabled={loading}>
            Close
          </button>
          
          <button 
            className="btn btn-info"
            onClick={onUploadImages}
            disabled={loading}
          >
            <i className="fas fa-images"></i>
            Manage Images
          </button>
          
          {room.status === 'available' && (
            <button 
              className="btn btn-warning"
              onClick={() => {
                onUpdateStatus(room.id, 'maintenance');
                onClose();
              }}
              disabled={loading}
            >
              Mark for Maintenance
            </button>
          )}
          {room.status === 'maintenance' && (
            <button 
              className="btn btn-success"
              onClick={() => {
                onUpdateStatus(room.id, 'available');
                onClose();
              }}
              disabled={loading}
            >
              Mark as Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;