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
            12% from last month
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon bookings">
          <i className="fas fa-calendar-check"></i>
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.activeBookings || 0}</div>
          <div className="stat-label">Active Bookings</div>
          <div className="stat-trend positive">
            <i className="fas fa-arrow-up"></i>
            3 new this week
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon occupancy">
          <i className="fas fa-bed"></i>
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.occupancyRate || 0}%</div>
          <div className="stat-label">Occupancy Rate</div>
          <div className="stat-trend positive">
            <i className="fas fa-arrow-up"></i>
            5% increase
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon reviews">
          <i className="fas fa-star"></i>
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.averageRating || 0}</div>
          <div className="stat-label">Average Rating</div>
          <div className="stat-trend">
            <i className="fas fa-minus"></i>
            No change
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;