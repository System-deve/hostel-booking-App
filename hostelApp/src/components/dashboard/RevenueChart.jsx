// src/components/dashboard/RevenueChart.jsx
import React, { useState } from 'react';

const RevenueChart = ({ payments }) => {
  const [timeRange, setTimeRange] = useState('last_3_months');

  // Calculate revenue data based on payments
  const calculateRevenueData = () => {
    // Mock revenue data for demonstration
    const revenueData = [
      { month: 'Oct', revenue: 3800000, bookings: 3200000, services: 600000 },
      { month: 'Nov', revenue: 4100000, bookings: 3400000, services: 700000 },
      { month: 'Dec', revenue: 4200000, bookings: 3500000, services: 700000 }
    ];

    return revenueData;
  };

  const revenueData = calculateRevenueData();
  const maxRevenue = Math.max(...revenueData.map(item => item.revenue));

  const formatCurrency = (amount) => {
    return `UGX ${amount?.toLocaleString() || '0'}`;
  };

  return (
    <section className="content-card">
      <div className="card-header">
        <h3 className="card-title">Revenue Overview</h3>
        <div className="time-filter">
          <select 
            className="filter-select"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="last_7_days">Last 7 days</option>
            <option value="last_30_days">Last 30 days</option>
            <option value="last_3_months">Last 3 months</option>
            <option value="last_year">Last year</option>
          </select>
        </div>
      </div>
      <div className="card-content">
        <div className="chart-placeholder">
          <div className="chart-bars">
            {revenueData.map((data, index) => (
              <div key={index} className="chart-bar" style={{ height: `${(data.revenue / maxRevenue) * 80}%` }}>
                <div className="bar-value">{formatCurrency(data.revenue)}</div>
                <div className="bar-label">{data.month}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color bookings"></span>
            <span>Bookings Revenue</span>
          </div>
          <div className="legend-item">
            <span className="legend-color services"></span>
            <span>Additional Services</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueChart;