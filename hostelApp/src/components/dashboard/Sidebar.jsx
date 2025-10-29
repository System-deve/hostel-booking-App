// src/components/dashboard/Sidebar.jsx
import React from 'react';

const Sidebar = ({ manager }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">HostelPulse <span className="uganda-text">Uganda</span></span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">MAIN</h3>
          <a href="#" className="nav-item active">
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-home"></i>
            <span>My Hostels</span>
            <span className="nav-badge">3</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-calendar-check"></i>
            <span>Bookings</span>
            <span className="nav-badge">12</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-users"></i>
            <span>Tenants</span>
            <span className="nav-badge">45</span>
          </a>
        </div>

        <div className="nav-section">
          <h3 className="nav-section-title">MANAGEMENT</h3>
          <a href="#" className="nav-item">
            <i className="fas fa-wallet"></i>
            <span>Payments</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-chart-line"></i>
            <span>Analytics</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-star"></i>
            <span>Reviews</span>
            <span className="nav-badge">8</span>
          </a>
        </div>

        <div className="nav-section">
          <h3 className="nav-section-title">SETTINGS</h3>
          <a href="#" className="nav-item">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-bell"></i>
            <span>Notifications</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-question-circle"></i>
            <span>Support</span>
          </a>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <img src={manager.profile.profileImage} alt={manager.profile.fullName} />
          </div>
          <div className="user-info">
            <div className="user-name">{manager.profile.fullName}</div>
            <div className="user-role">Hostel Manager</div>
          </div>
          <div className="user-menu">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;