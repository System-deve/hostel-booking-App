// src/components/dashboard/QuickActions.jsx
import React from 'react';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    { icon: 'fas fa-door-open', label: 'Add Room', color: '#2563eb' }, // CHANGED: from Add Hostel to Add Room
    { icon: 'fas fa-bed', label: 'Manage Rooms', color: '#10b981' },
    { icon: 'fas fa-file-invoice', label: 'Generate Report', color: '#f59e0b' },
    { icon: 'fas fa-chart-bar', label: 'View Analytics', color: '#06b6d4' }
  ];

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
              onClick={() => onActionClick(action.label)}
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