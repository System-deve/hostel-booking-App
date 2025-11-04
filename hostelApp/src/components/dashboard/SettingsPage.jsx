
// src/components/dashboard/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { hostelManagerStore } from '../../data/store/HostelManagerStore';
import './SettingsPage.css';

const SettingsPage = ({ onProfileUpdate, initialProfile }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Profile Settings - use initialProfile prop
  const [profileData, setProfileData] = useState(initialProfile || {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profileImage: ''
  });

  // Security Settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings
  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    maintenanceAlerts: true,
    newBookingAlerts: true,
    lowOccupancyAlerts: true
  });

  // Payment Settings
  const [paymentData, setPaymentData] = useState({
    currency: 'UGX',
    paymentMethods: ['cash', 'mobile money', 'bank'],
    lateFeePercentage: 5,
    gracePeriodDays: 3,
    autoReminders: true
  });

  useEffect(() => {
    loadSettingsData();
  }, []);

  const loadSettingsData = () => {
    setLoading(true);
    try {
      // Load manager profile
      const manager = hostelManagerStore.manager;
      setProfileData({
        fullName: manager.profile?.fullName || '',
        email: manager.profile?.email || '',
        phone: manager.profile?.phone || '',
        address: manager.profile?.address || '',
        profileImage: manager.profile?.profileImage || ''
      });

    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (section) => {
    setLoading(true);
    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (section === 'profile') {
        // Use the callback to update profile in parent component
        const success = onProfileUpdate(profileData);
        if (!success) {
          throw new Error('Failed to update profile');
        }
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading && !saveStatus) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account and system preferences</p>
        </div>
        {saveStatus && (
          <div className={`save-status ${saveStatus}`}>
            {saveStatus === 'saving' && <i className="fas fa-spinner fa-spin"></i>}
            {saveStatus === 'saved' && <i className="fas fa-check-circle"></i>}
            {saveStatus === 'error' && <i className="fas fa-exclamation-triangle"></i>}
            <span>
              {saveStatus === 'saving' && 'Saving changes...'}
              {saveStatus === 'saved' && 'Changes saved successfully!'}
              {saveStatus === 'error' && 'Error saving changes'}
            </span>
          </div>
        )}
      </div>

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="fas fa-bell"></i>
              <span>Notifications</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              <i className="fas fa-credit-card"></i>
              <span>Payment</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <i className="fas fa-shield-alt"></i>
              <span>Security</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'backup' ? 'active' : ''}`}
              onClick={() => setActiveTab('backup')}
            >
              <i className="fas fa-cloud-download-alt"></i>
              <span>Backup & Export</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          {activeTab === 'profile' && (
            <ProfileSettings
              data={profileData}
              onChange={setProfileData}
              onImageChange={handleProfileImageChange}
              onSave={() => handleSaveSettings('profile')}
              loading={loading && saveStatus === 'saving'}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationSettings
              data={notificationData}
              onChange={setNotificationData}
              onSave={() => handleSaveSettings('notifications')}
              loading={loading && saveStatus === 'saving'}
            />
          )}

          {activeTab === 'payment' && (
            <PaymentSettings
              data={paymentData}
              onChange={setPaymentData}
              onSave={() => handleSaveSettings('payment')}
              loading={loading && saveStatus === 'saving'}
            />
          )}

          {activeTab === 'security' && (
            <SecuritySettings
              data={securityData}
              onChange={setSecurityData}
              onSave={() => handleSaveSettings('security')}
              loading={loading && saveStatus === 'saving'}
            />
          )}

          {activeTab === 'backup' && (
            <BackupSettings />
          )}
        </div>
      </div>
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = ({ data, onChange, onImageChange, onSave, loading }) => {
  const handleChange = (field, value) => {
    onChange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Profile Settings</h2>
        <p>Update your personal information and profile picture</p>
      </div>

      <div className="settings-form">
        <div className="profile-image-section">
          <div className="profile-image-container">
            <img 
              src={data.profileImage || '/api/placeholder/120/120'} 
              alt="Profile" 
              className="profile-image"
            />
            <div className="image-overlay">
              <i className="fas fa-camera"></i>
              <span>Change Photo</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="image-input"
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+256 XXX XXX XXX"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Enter your address"
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            className="btn btn-primary" 
            onClick={onSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Notification Settings Component
const NotificationSettings = ({ data, onChange, onSave, loading }) => {
  const handleToggle = (field) => {
    onChange(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Notification Preferences</h2>
        <p>Choose how you want to receive notifications</p>
      </div>

      <div className="settings-form">
        <div className="notification-category">
          <h3>Notification Methods</h3>
          <div className="toggle-group">
            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">Email Notifications</span>
                <span className="toggle-description">Receive notifications via email</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={data.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">SMS Notifications</span>
                <span className="toggle-description">Receive notifications via SMS</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={data.smsNotifications}
                  onChange={() => handleToggle('smsNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="notification-category">
          <h3>Notification Types</h3>
          <div className="toggle-group">
            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">Payment Reminders</span>
                <span className="toggle-description">Get reminded about upcoming payments</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={data.paymentReminders}
                  onChange={() => handleToggle('paymentReminders')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">Maintenance Alerts</span>
                <span className="toggle-description">Receive maintenance request alerts</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={data.maintenanceAlerts}
                  onChange={() => handleToggle('maintenanceAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">New Booking Alerts</span>
                <span className="toggle-description">Get notified about new bookings</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={data.newBookingAlerts}
                  onChange={() => handleToggle('newBookingAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">Low Occupancy Alerts</span>
                <span className="toggle-description">Alert when occupancy drops below threshold</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={data.lowOccupancyAlerts}
                  onChange={() => handleToggle('lowOccupancyAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            className="btn btn-primary" 
            onClick={onSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment Settings Component
const PaymentSettings = ({ data, onChange, onSave, loading }) => {
  const handleChange = (field, value) => {
    onChange(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodToggle = (method) => {
    const updatedMethods = data.paymentMethods.includes(method)
      ? data.paymentMethods.filter(m => m !== method)
      : [...data.paymentMethods, method];
    
    handleChange('paymentMethods', updatedMethods);
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Payment Settings</h2>
        <p>Configure payment methods and policies</p>
      </div>

      <div className="settings-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              value={data.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
            >
              <option value="UGX">UGX - Ugandan Shilling</option>
              <option value="USD">USD - US Dollar</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="TZS">TZS - Tanzanian Shilling</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="lateFee">Late Fee Percentage</label>
            <input
              id="lateFee"
              type="number"
              value={data.lateFeePercentage}
              onChange={(e) => handleChange('lateFeePercentage', parseInt(e.target.value))}
              min="0"
              max="50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gracePeriod">Grace Period (Days)</label>
            <input
              id="gracePeriod"
              type="number"
              value={data.gracePeriodDays}
              onChange={(e) => handleChange('gracePeriodDays', parseInt(e.target.value))}
              min="0"
              max="30"
            />
          </div>
        </div>

        <div className="payment-methods-section">
          <label>Accepted Payment Methods</label>
          <div className="payment-methods-grid">
            {['cash', 'mobile money', 'bank', 'credit card'].map(method => (
              <div key={method} className="payment-method-item">
                <input
                  type="checkbox"
                  id={`payment-${method}`}
                  checked={data.paymentMethods.includes(method)}
                  onChange={() => handlePaymentMethodToggle(method)}
                />
                <label htmlFor={`payment-${method}`}>
                  <i className={`fas fa-${getPaymentMethodIcon(method)}`}></i>
                  <span>{method.charAt(0).toUpperCase() + method.slice(1)}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="toggle-item full-width">
          <div className="toggle-info">
            <span className="toggle-label">Automatic Payment Reminders</span>
            <span className="toggle-description">Send automatic reminders for overdue payments</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={data.autoReminders}
              onChange={() => handleChange('autoReminders', !data.autoReminders)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="form-actions">
          <button 
            className="btn btn-primary" 
            onClick={onSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Update Payment Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Security Settings Component
const SecuritySettings = ({ data, onChange, onSave, loading }) => {
  const handleChange = (field, value) => {
    onChange(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    onSave();
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Security Settings</h2>
        <p>Manage your password and security preferences</p>
      </div>

      <div className="settings-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password *</label>
              <input
                id="currentPassword"
                type="password"
                value={data.currentPassword}
                onChange={(e) => handleChange('currentPassword', e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password *</label>
              <input
                id="newPassword"
                type="password"
                value={data.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password *</label>
              <input
                id="confirmPassword"
                type="password"
                value={data.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="password-strength">
            <div className="strength-meter">
              <div className="strength-bar"></div>
            </div>
            <span className="strength-text">Password strength: Medium</span>
          </div>

          <div className="security-tips">
            <h4>Password Requirements:</h4>
            <ul>
              <li>At least 8 characters long</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Include at least one number</li>
              <li>Include at least one special character</li>
            </ul>
          </div>

          <div className="form-actions">
            <button 
              type="submit"
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Backup Settings Component
const BackupSettings = () => {
  const handleExportData = () => {
    // Export data logic
    const data = {
      tenants: hostelManagerStore.getManagerTenants(),
      payments: hostelManagerStore.getAllPayments(),
      rooms: hostelManagerStore.getManagerRooms(),
      issues: hostelManagerStore.getManagerIssues()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hostel-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = (type) => {
    let data, headers, filename;
    
    switch (type) {
      case 'tenants':
        data = hostelManagerStore.getManagerTenants();
        headers = ['Name', 'Phone', 'Email', 'Room', 'Check-in Date', 'Balance'];
        filename = 'tenants.csv';
        break;
      case 'payments':
        data = hostelManagerStore.getAllPayments();
        headers = ['Date', 'Tenant', 'Amount', 'Method', 'Type'];
        filename = 'payments.csv';
        break;
      case 'rooms':
        data = hostelManagerStore.getManagerRooms();
        headers = ['Room Number', 'Type', 'Status', 'Price', 'Occupancy'];
        filename = 'rooms.csv';
        break;
      default:
        return;
    }

    const csvContent = [
      headers.join(','),
      ...data.map(item => {
        const row = headers.map(header => {
          const value = item[header.toLowerCase().replace(' ', '')] || item[header] || '';
          return `"${value}"`;
        });
        return row.join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Backup & Export</h2>
        <p>Manage data backups and exports</p>
      </div>

      <div className="settings-form">
        <div className="backup-options">
          <div className="backup-card">
            <div className="backup-icon">
              <i className="fas fa-file-export"></i>
            </div>
            <div className="backup-content">
              <h3>Export Full Backup</h3>
              <p>Download complete hostel data in JSON format</p>
              <button className="btn btn-outline" onClick={handleExportData}>
                Export JSON Backup
              </button>
            </div>
          </div>

          <div className="backup-card">
            <div className="backup-icon">
              <i className="fas fa-file-csv"></i>
            </div>
            <div className="backup-content">
              <h3>Export CSV Files</h3>
              <p>Download specific data in CSV format for spreadsheets</p>
              <div className="csv-buttons">
                <button className="btn btn-outline sm" onClick={() => handleExportCSV('tenants')}>
                  Tenants CSV
                </button>
                <button className="btn btn-outline sm" onClick={() => handleExportCSV('payments')}>
                  Payments CSV
                </button>
                <button className="btn btn-outline sm" onClick={() => handleExportCSV('rooms')}>
                  Rooms CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="backup-info">
          <h4>Last Backup</h4>
          <p>No backups created yet</p>
          
          <h4>Auto Backup</h4>
          <p>Automatic backups are currently disabled</p>
          
          <div className="backup-stats">
            <h4>Data Statistics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total Tenants</span>
                <span className="stat-value">{hostelManagerStore.getManagerTenants().length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Rooms</span>
                <span className="stat-value">{hostelManagerStore.getManagerRooms().length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Payments</span>
                <span className="stat-value">{hostelManagerStore.getAllPayments().length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function
const getPaymentMethodIcon = (method) => {
  const icons = {
    'cash': 'money-bill-wave',
    'mobile money': 'mobile-alt',
    'bank': 'university',
    'credit card': 'credit-card'
  };
  return icons[method] || 'money-bill-wave';
};

export default SettingsPage;