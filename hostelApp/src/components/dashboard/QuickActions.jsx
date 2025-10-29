// src/components/dashboard/QuickActions.jsx
import React from 'react';

const QuickActions = () => {
  const actions = [
    { icon: 'fas fa-home', label: 'Add Hostel', color: '#2563eb' },
    { icon: 'fas fa-calendar-plus', label: 'New Booking', color: '#10b981' },
    { icon: 'fas fa-file-invoice', label: 'Generate Report', color: '#f59e0b' },
    { icon: 'fas fa-bullhorn', label: 'Promote Listing', color: '#8b5cf6' },
    { icon: 'fas fa-users', label: 'Manage Tenants', color: '#ef4444' },
    { icon: 'fas fa-chart-bar', label: 'View Analytics', color: '#06b6d4' }
  ];

  const handleActionClick = (actionLabel) => {
    alert(`Action: ${actionLabel} - This would open the respective feature`);
  };

  return (
    <section className="content-card">
      <div className="card-header">
        <h3 className="card-title">Quick Actions</h3>
      </div>
      <div className="card-content">
        <div className="actions-grid">
          {actions.map((action, index) => (
            <button
              key={index}
              className="action-btn"
              onClick={() => handleActionClick(action.label)}
            >
              <div className="action-icon" style={{ backgroundColor: action.color }}>
                <i className={action.icon}></i>
              </div>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;