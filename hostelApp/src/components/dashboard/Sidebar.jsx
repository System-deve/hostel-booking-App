// src/components/dashboard/Sidebar.jsx
import React from 'react';

const Sidebar = ({ manager, currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard', badge: null },
    { id: 'rooms', icon: 'fas fa-bed', label: 'Room Management', badge: null },
    { id: 'payments', icon: 'fas fa-wallet', label: 'Payments', badge: null },
    { id: 'analytics', icon: 'fas fa-chart-line', label: 'Analytics', badge: null },
  ];

  const settingsItems = [
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings', badge: null },
  ];

  const handleNavClick = (viewId) => {
    onNavigate(viewId);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">
            HostelPulse <span className="uganda-text">Uganda</span>
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">MAIN</h3>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </div>

        <div className="nav-section">
          <h3 className="nav-section-title">SETTINGS</h3>
          {settingsItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
          {manager.profile.profileImage ? (
  <img 
    src={manager.profile.profileImage} 
    alt={manager.profile.fullName} 
  />
) : (
  <div className="profile-placeholder">
    <i className="fas fa-user"></i>
  </div>
)}
          </div>
          <div className="user-info">
            <div className="user-name">{manager.profile.fullName}</div>
            <div className="user-role">Hostel Manager</div>
             <button 
          className="logout-btn"
          onClick={""}
        >
          <i className="fas fa-sign-out-alt"></i>                                                                                   
          Logout
        </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;