// src/components/dashboard/StatsGrid.jsx
import React from 'react';

const StatsGrid = ({ stats }) => {
  const formatCurrency = (amount) => {
    return `UGX ${amount?.toLocaleString() || '0'}`;
  };

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon income">
          <i className="fas fa-money-bill-wave"></i>
        </div>
        <div className="stat-info">
          <div className="stat-value">{formatCurrency(stats.totalRevenue)}</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-trend positive">
            <i className="fas fa-arrow-up"></i>
            This month
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon bookings">
          <i className="fas fa-door-closed"></i>
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.totalRooms || 0}</div>
          <div className="stat-label">Total Rooms</div>
          <div className="stat-trend">
            Across all hostels
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon occupancy">
          <i className="fas fa-bed"></i>
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.occupiedRooms || 0}</div>
          <div className="stat-label">Occupied Rooms</div>
          <div className="stat-trend positive">
            <i className="fas fa-users"></i>
            Current tenants
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon maintenance">
          <i className="fas fa-tools"></i>
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.pendingIssues || 0}</div>
          <div className="stat-label">Pending Issues</div>
          <div className="stat-trend warning">
            Needs attention
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;