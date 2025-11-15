// src/components/dashboard/Dashboard.jsx
/*import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { hostelManagerStore } from '../../data/store/HostelManagerStore';
import Sidebar from './Sidebar';
import StatsGrid from './StatsGrid';
import QuickActions from './QuickActions';
import RoomsPage from './looms.jsx';
import '../../styles/dashboard.css';
import PaymentsPage from './PaymentsPage.jsx';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage.jsx';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [stats, setStats] = useState({});
  const [managerRooms, setManagerRooms] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [managerProfile, setManagerProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profileImage: ''
  });

  // Load manager-specific data
  useEffect(() => {
    loadManagerData();
  }, [currentUser]);

  const loadManagerData = () => {
    const manager = hostelManagerStore.manager;
    setStats(hostelManagerStore.getDashboardStats());
    setManagerRooms(hostelManagerStore.getManagerRooms());
    setManagerProfile({
      fullName: manager.profile?.fullName || '',
      email: manager.profile?.email || '',
      phone: manager.profile?.phone || '',
      address: manager.profile?.address || '',
      profileImage: manager.profile?.profileImage || ''
    });
  };

  // Function to update manager profile
  const handleProfileUpdate = (updatedProfile) => {
    const success = hostelManagerStore.updateManagerProfile(updatedProfile);
    if (success) {
      setManagerProfile(updatedProfile);
      loadManagerData();
      return true;
    }
    return false;
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'Add Room':
        setCurrentView('rooms');
        break;
      case 'Manage Rooms':
        setCurrentView('rooms');
        break;
      case 'Generate Report':
        alert('Report generation coming soon!');
        break;
      case 'View Analytics':
        setCurrentView('analytics');
        break;
      default:
        console.log('Action:', action);
    }
  };

  const handleAddRoom = (roomData) => {
    const newRoom = hostelManagerStore.addRoom(roomData);
    if (newRoom) {
      alert('Room added successfully!');
      loadManagerData();
      setCurrentView('dashboard');
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (!result.success) {
      alert('Error logging out: ' + result.error);
    }
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'rooms':
        return <RoomsPage />;
      case 'addRoom':
        return (
          <AddRoomPage 
            onSave={handleAddRoom}
            onCancel={() => setCurrentView('dashboard')}
          />
        );
      case 'analytics':
        return <AnalyticsPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'settings':
        return (
          <SettingsPage 
            onProfileUpdate={handleProfileUpdate}
            initialProfile={managerProfile}
          />
        );
      case 'dashboard':
      default:
        return (
          <>
            <StatsGrid stats={stats} />
            <div className="content-grid">
              <div className="content-column">
                <ManagerRoomsPreview 
                  rooms={managerRooms} 
                  onViewAll={() => setCurrentView('rooms')}
                  onAddRoom={() => setCurrentView('rooms')}
                />
                <RecentActivity />
              </div>
              <div className="content-column">
                <QuickActions onActionClick={handleQuickAction} />
                <UpcomingCheckouts rooms={managerRooms} />
              </div>
            </div>
          </>
        );
    }
  };

  const getHeaderTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      rooms: 'Room Management',
      addRoom: 'Add New Room',
      analytics: 'Analytics',
      payments: 'Payments',
      settings: 'Settings'
    };
    return titles[currentView] || 'Dashboard';
  };

  const getHeaderSubtitle = () => {
    const subtitles = {
      dashboard: `Welcome back, ${managerProfile.fullName || hostelManagerStore.manager.profile.fullName}! Manage your ${managerRooms.length} rooms`,
      rooms: 'Manage all your rooms, tenants, and maintenance',
      addRoom: 'Add a new room to your hostel',
      analytics: 'Detailed insights and performance metrics',
      payments: 'Track payments and revenue',
      settings: 'Manage your account settings'
    };
    return subtitles[currentView] || 'Welcome back!';
  };

  const showAddRoomButton = currentView === 'dashboard' || currentView === 'rooms';

  return (
    <div className="dashboard-container">
      <Sidebar 
        manager={{
          ...hostelManagerStore.manager,
          profile: managerProfile
        }}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        <header className="content-header">
          <div className="header-left">
            <h1 className="page-title">{getHeaderTitle()}</h1>
            <p className="page-subtitle">{getHeaderSubtitle()}</p>
          </div>
          {showAddRoomButton && (
            <div className="header-actions">
              <button 
                className="btn btn-primary" 
                onClick={() => setCurrentView('rooms')}
              >
                <i className="fas fa-bed"></i>
                Manage Rooms
              </button>
            </div>
          )}
        </header>

        {renderMainContent()}
      </main>
    </div>
  );
};

// Manager's Rooms Preview Component
const ManagerRoomsPreview = ({ rooms, onViewAll, onAddRoom }) => {
  const recentRooms = rooms.slice(0, 6);

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
      'partially-occupied': 'Partial',
      'maintenance': 'Maintenance'
    };
    return statusMap[status] || status;
  };

  return (
    <section className="content-card">
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-title">My Rooms</h3>
          <span className="room-count-badge">{rooms.length} rooms</span>
        </div>
        <div className="card-actions">
          <button className="card-action-btn" onClick={onAddRoom}>
            <i className="fas fa-plus"></i>
            Add Room
          </button>
          {rooms.length > 0 && (
            <button className="card-action-btn btn-outline" onClick={onViewAll}>
              View All
            </button>
          )}
        </div>
      </div>
      
      <div className="card-content">
        {recentRooms.length > 0 ? (
          <div className="rooms-preview-grid">
            {recentRooms.map(room => (
              <div key={room.id} className="room-preview-card">
                <div className="room-preview-header">
                  <div className="room-preview-number">{room.roomNumber}</div>
                  <div 
                    className="room-preview-status"
                    style={{ backgroundColor: getStatusColor(room.status) }}
                  >
                    {getStatusText(room.status)}
                  </div>
                </div>
                
                <div className="room-preview-info">
                  <div className="room-preview-type">{room.roomType} Room</div>
                  <div className="room-preview-price">UGX {room.price.toLocaleString()}/month</div>
                </div>
                
                <div className="room-preview-meta">
                  <span className="floor">Floor {room.floorNumber}</span>
                  <span className="occupancy">
                    {room.currentOccupancy}/{room.capacity} {room.roomType === 'single' ? 'person' : 'people'}
                  </span>
                </div>

                {room.tenants && room.tenants.length > 0 && (
                  <div className="room-preview-tenant">
                    <i className="fas fa-user"></i>
                    <span className="tenant-name">{room.tenants[0].name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-rooms-preview">
            <div className="no-rooms-icon">
              <i className="fas fa-door-open"></i>
            </div>
            <h4>No Rooms Yet</h4>
            <p>Get started by adding your first room to manage</p>
            <button className="btn btn-primary" onClick={onAddRoom}>
              <i className="fas fa-plus"></i>
              Add Your First Room
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Recent Activity Component
const RecentActivity = () => {
  const recentActivities = [
    {
      id: 1,
      type: 'checkin',
      message: 'Sarah K. Nalwoga checked into Room 101',
      time: '2 hours ago',
      icon: 'fas fa-sign-in-alt',
      color: '#10b981'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received from John M. Ssemakula - UGX 320,000',
      time: '5 hours ago',
      icon: 'fas fa-money-bill-wave',
      color: '#10b981'
    },
    {
      id: 3,
      type: 'maintenance',
      message: 'Maintenance issue reported for Room 201',
      time: '1 day ago',
      icon: 'fas fa-tools',
      color: '#f59e0b'
    },
    {
      id: 4,
      type: 'checkout',
      message: 'Grace L. Nalubega checked out from Room 103',
      time: '2 days ago',
      icon: 'fas fa-sign-out-alt',
      color: '#ef4444'
    }
  ];

  return (
    <section className="content-card">
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
      </div>
      <div className="card-content">
        <div className="activity-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon" style={{ backgroundColor: activity.color }}>
                <i className={activity.icon}></i>
              </div>
              <div className="activity-content">
                <p className="activity-message">{activity.message}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Upcoming Checkouts Component
const UpcomingCheckouts = ({ rooms }) => {
  const upcomingCheckouts = rooms
    .filter(room => room.tenants && room.tenants.length > 0)
    .flatMap(room => 
      room.tenants.map(tenant => ({
        ...tenant,
        roomNumber: room.roomNumber,
        roomId: room.id
      }))
    )
    .filter(tenant => tenant.checkOutDate)
    .map(tenant => {
      const checkOutDate = new Date(tenant.checkOutDate);
      const today = new Date();
      const daysUntil = Math.ceil((checkOutDate - today) / (1000 * 60 * 60 * 24));
      
      return {
        ...tenant,
        daysUntil,
        isUrgent: daysUntil <= 7
      };
    })
    .filter(tenant => tenant.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5);

  return (
    <section className="content-card">
      <div className="card-header">
        <h3 className="card-title">Upcoming Checkouts</h3>
      </div>
      <div className="card-content">
        {upcomingCheckouts.length > 0 ? (
          <div className="checkouts-list">
            {upcomingCheckouts.map((tenant, index) => (
              <div key={index} className={`checkout-item ${tenant.isUrgent ? 'urgent' : ''}`}>
                <div className="checkout-room">
                  <strong>Room {tenant.roomNumber}</strong>
                  <span className="checkout-tenant">{tenant.name}</span>
                </div>
                <div className="checkout-date">
                  <span className={`days-badge ${tenant.isUrgent ? 'urgent' : ''}`}>
                    {tenant.daysUntil} {tenant.daysUntil === 1 ? 'day' : 'days'}
                  </span>
                  <small>{new Date(tenant.checkOutDate).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-checkouts">
            <p>No upcoming checkouts in the next 30 days</p>
          </div>
        )}
      </div>
    </section>
  );
};

// Add Room Page Component
const AddRoomPage = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'single',
    floorNumber: 1,
    price: '',
    hostelId: 'hostel_001',
    isSelfContained: true
  });

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

  return (
    <div className="page-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="hostel-form">
          <div className="form-section card">
            <div className="section-header">
              <h3>Room Information</h3>
              <p>Add a new room to your hostel</p>
            </div>
            
            <div className="form-grid">
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
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hostelId">Hostel</label>
              <select
                id="hostelId"
                name="hostelId"
                value={formData.hostelId}
                onChange={handleChange}
              >
                <option value="hostel_001">Green Valley Hostel</option>
                <option value="hostel_002">Sunrise Hostels</option>
              </select>
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

          <div className="form-actions">
            <button type="button" className="btn btn-outline large" onClick={onCancel}>
              <i className="fas fa-arrow-left"></i>
              Back to Dashboard
            </button>
            <button type="submit" className="btn btn-primary large">
              <i className="fas fa-save"></i>
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;*/

























/*
// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { authAPI, roomsAPI, tenantsAPI, paymentsAPI } from '../../api/index.js';
import Sidebar from './Sidebar';
import StatsGrid from './StatsGrid';
import QuickActions from './QuickActions';
import PaymentsPage from './PaymentsPage.jsx';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage.jsx';
import RoomsPage from './RoomsPage.jsx';
import '../../styles/dashboard.css';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({});
  const [managerRooms, setManagerRooms] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [managerProfile, setManagerProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load current user & manager data
  useEffect(() => {
    loadManagerData();
  }, []);

  const loadManagerData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get current user
      const user = await authAPI.getMe();
      setCurrentUser(user);

      // Load profile
      setManagerProfile({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage
      });

      // Load rooms
      const rooms = await roomsAPI.getRooms();
      setManagerRooms(rooms);

      // Load dashboard stats
      const totalRooms = rooms.length;
      const occupied = rooms.filter(r => r.status === 'occupied').length;
      const available = rooms.filter(r => r.status === 'available').length;
      const partiallyOccupied = rooms.filter(r => r.status === 'partially-occupied').length;
      const maintenance = rooms.filter(r => r.status === 'maintenance').length;

      setStats({
        totalRooms,
        occupied,
        available,
        partiallyOccupied,
        maintenance
      });

    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Update manager profile
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      await authAPI.updateProfile(updatedProfile);
      setManagerProfile(updatedProfile);
      await loadManagerData();
      return true;
    } catch (err) {
      console.error('Profile update failed:', err);
      return false;
    }
  };

  // Handle quick actions
  const handleQuickAction = (action) => {
    switch (action) {
      case 'Add Room':
      case 'Manage Rooms':
        setCurrentView('rooms');
        break;
      case 'Generate Report':
        alert('Report generation coming soon!');
        break;
      case 'View Analytics':
        setCurrentView('analytics');
        break;
      default:
        console.log('Action:', action);
    }
  };

  // Add a new room
  const handleAddRoom = async (roomData) => {
    try {
      await roomsAPI.createRoom(roomData);
      alert('Room added successfully!');
      await loadManagerData();
      setCurrentView('dashboard');
    } catch (err) {
      console.error('Error adding room:', err);
      alert('Error adding room: ' + err.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      authAPI.logout();
      window.location.href = '/login';
    } catch (err) {
      alert('Error logging out: ' + err.message);
    }
  };

  // Main content renderer
  const renderMainContent = () => {
    switch (currentView) {
      case 'rooms':
        return <RoomsPage rooms={managerRooms} reload={loadManagerData} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'payments':
        return <PaymentsPage rooms={managerRooms} />;
      case 'settings':
        return (
          <SettingsPage
            onProfileUpdate={handleProfileUpdate}
            initialProfile={managerProfile}
          />
        );
      case 'dashboard':
      default:
        return (
          <>
            <StatsGrid stats={stats} />
            <div className="content-grid">
              <div className="content-column">
                <ManagerRoomsPreview
                  rooms={managerRooms}
                  onViewAll={() => setCurrentView('rooms')}
                  onAddRoom={() => setCurrentView('rooms')}
                />
                <RecentActivity rooms={managerRooms} />
              </div>
              <div className="content-column">
                <QuickActions onActionClick={handleQuickAction} />
                <UpcomingCheckouts rooms={managerRooms} />
              </div>
            </div>
          </>
        );
    }
  };

  const getHeaderTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      rooms: 'Room Management',
      analytics: 'Analytics',
      payments: 'Payments',
      settings: 'Settings'
    }; 
    return titles[currentView] || 'Dashboard';
  };

  const getHeaderSubtitle = () => {
    const subtitles = {
      dashboard: `Welcome back, ${managerProfile.fullName || ''}! Manage your ${managerRooms.length} rooms`,
      rooms: 'Manage all your rooms, tenants, and maintenance',
      analytics: 'Detailed insights and performance metrics',
      payments: 'Track payments and revenue',
      settings: 'Manage your account settings'
    };
    return subtitles[currentView] || 'Welcome back!';
  };

  const showAddRoomButton = currentView === 'dashboard' || currentView === 'rooms';

  if (loading) return <div className="loader">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <Sidebar
        manager={{
          profile: managerProfile
        }}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />
      <main className="main-content">
        <header className="content-header">
          <div className="header-left">
            <h1 className="page-title">{getHeaderTitle()}</h1>
            <p className="page-subtitle">{getHeaderSubtitle()}</p>
          </div>
          {showAddRoomButton && (
            <div className="header-actions">
              <button
                className="btn btn-primary"
                onClick={() => setCurrentView('rooms')}
              >
                <i className="fas fa-bed"></i> Manage Rooms
              </button>
            </div>
          )}
        </header>

        {renderMainContent()}
      </main>
    </div>
  );
};

export default Dashboard;*/














// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { roomsAPI } from '../../api/rooms.js';
import { tenantsAPI } from '../../api/tenants.js';
import { maintenanceAPI } from '../../api/maintenance.js';
import { bookingsAPI } from '../../api/bookings.js';
import { authAPI } from '../../api/auth.js';
import Sidebar from './Sidebar';
import StatsGrid from './StatsGrid';
import QuickActions from './QuickActions';
import RoomsPage from './RoomsPage.jsx';
import PaymentsPage from './PaymentsPage.jsx';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage.jsx';
import '../../styles/dashboard.css';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [managerProfile, setManagerProfile] = useState({});
  const [managerRooms, setManagerRooms] = useState([]);
  const [stats, setStats] = useState({});
  const [currentView, setCurrentView] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all dashboard data


  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Current user / manager profile
      const user = await authAPI.getMe();
      setCurrentUser(user);
      setManagerProfile({
        fullName: currentUser?.fullName || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        address: currentUser?.address || '',
        profileImage: currentUser?.profileImage || ''
      });

      // 2. Rooms
      let rooms = await roomsAPI.getRooms();
      rooms = Array.isArray(rooms) ? rooms : [];
      setManagerRooms(rooms);

      // 3. Tenants
      let tenants = [];
      for (const room of rooms) {
        if (room.id) {
          const roomTenants = room.tenants || [];
          tenants.push(...roomTenants);
        }
      }

      // 4. Maintenance
      let maintenanceRequests = await maintenanceAPI.getMaintenanceRequests();
      maintenanceRequests = Array.isArray(maintenanceRequests) ? maintenanceRequests : [];

      // 5. Bookings (optional)
      let bookings = await bookingsAPI.getBookings();
      bookings = Array.isArray(bookings) ? bookings : [];

      // 6. Calculate dashboard stats
      const totalRooms = rooms.length;
      const occupied = rooms.filter(r => r.status === 'occupied').length;
      const available = rooms.filter(r => r.status === 'available').length;
      const partiallyOccupied = rooms.filter(r => r.status === 'partially-occupied').length;
      const maintenance = rooms.filter(r => r.status === 'maintenance').length;

      setStats({
        manager: currentUser.fullName || 'Manager',
        rooms: totalRooms,
        tenants: tenants.length,
        issues: maintenanceRequests.length,
        totalRooms,
        occupied,
        available,
        partiallyOccupied,
        maintenance,
        bookings: bookings.length
      });

    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);


    useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);
  // Update manager profile
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      await authAPI.updateProfile(updatedProfile);
      setManagerProfile(updatedProfile);
      await loadDashboardData();
      return true;
    } catch (err) {
      console.error('Profile update failed:', err);
      return false;
    }
  };

  // Quick actions
  const handleQuickAction = (action) => {
    switch (action) {
      case 'Add Room':
      case 'Manage Rooms':
        setCurrentView('rooms');
        break;
      case 'Generate Report':
        alert('Report generation coming soon!');
        break;
      case 'View Analytics':
        setCurrentView('analytics');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  // Add a new room
const handleAddRoom = async (roomData) => {
    try {
      await roomsAPI.createRoom(roomData);
      alert('Room added successfully!');
      await loadDashboardData();
      setCurrentView('dashboard');
    } catch (err) {
      console.error('Error adding room:', err);
      alert('Error adding room: ' + err.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      alert('Error logging out: ' + err.message);
    }
  };

  // Render main content based on view
  const renderMainContent = () => {
    switch (currentView) {
      case 'rooms':
        return <RoomsPage rooms={managerRooms} reload={loadDashboardData} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'payments':
        return <PaymentsPage rooms={managerRooms} />;
      case 'settings':
        return <SettingsPage
          onProfileUpdate={handleProfileUpdate}
          initialProfile={managerProfile}
        />;
      case 'dashboard':
      default:
        return (
          <>
            <StatsGrid stats={stats} />
            <div className="content-grid">
              <div className="content-column">
               {/* <ManagerRoomsPreview
                  rooms={managerRooms}
                  onViewAll={() => setCurrentView('rooms')}
                  onAddRoom={() => setCurrentView('rooms')}
                /> */}
                <RecentActivity rooms={managerRooms} />
              </div>
              <div className="content-column">
                <QuickActions onActionClick={handleQuickAction} />
                <UpcomingCheckouts rooms={managerRooms} />
              </div>
            </div>
          </>
        );
    }
  };

  const getHeaderTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      rooms: 'Room Management',
      analytics: 'Analytics',
      payments: 'Payments',
      settings: 'Settings'
    }; 
    return titles[currentView] || 'Dashboard';
  };

  const getHeaderSubtitle = () => {
    const subtitles = {
      dashboard: `Welcome back, ${managerProfile.fullName || ''}! Manage your ${managerRooms.length} rooms`,
      rooms: 'Manage all your rooms, tenants, and maintenance',
      analytics: 'Detailed insights and performance metrics',
      payments: 'Track payments and revenue',
      settings: 'Manage your account settings'
    };
    return subtitles[currentView] || 'Welcome back!';
  };

  const showAddRoomButton = currentView === 'dashboard' || currentView === 'rooms';

  if (loading) return <div className="loader">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <Sidebar
        manager={{
          profile: managerProfile
        }}
        currentView={currentView}
        onNavigate={setCurrentView}     />
      <main className="main-content">
        <header className="content-header">
          <div className="header-left">
            <h1 className="page-title">{getHeaderTitle()}</h1>
            <p className="page-subtitle">{getHeaderSubtitle()}</p>
          </div>
          {showAddRoomButton && (
            <div className="header-actions">
              <button
                className="btn btn-primary"
                onClick={() => setCurrentView('rooms')}
              >
                <i className="fas fa-bed"></i> Manage Rooms
              </button>
            </div>
          )}
        </header>

        {renderMainContent()}
      </main>
    </div>
  );
};

export default Dashboard;
