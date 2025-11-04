// src/components/dashboard/AnalyticsPage.jsx
import React, { useState, useEffect } from 'react';
import { hostelManagerStore } from '../../data/store/HostelManagerStore';
import '../../styles/dashboard.css';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = () => {
    setLoading(true);
    try {
      // Get mock analytics data since we don't have getAnalyticsData method yet
      const data = generateMockAnalyticsData(timeRange);
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate mock analytics data
  const generateMockAnalyticsData = (range) => {
    const rooms = hostelManagerStore.getManagerRooms();
    const tenants = hostelManagerStore.getManagerTenants();
    const payments = hostelManagerStore.getAllPayments();
    
    // Calculate basic stats
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const occupiedRooms = rooms.filter(room => room.currentOccupancy > 0).length;
    const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;
    const pendingBalance = tenants.reduce((sum, tenant) => sum + (tenant.balance || 0), 0);

    // Generate revenue trends based on time range
    const revenueTrends = generateRevenueTrends(range, totalRevenue);
    
    // Occupancy data
    const occupancyData = [
      { label: 'Occupied', value: occupiedRooms, color: '#ef4444' },
      { label: 'Available', value: rooms.length - occupiedRooms, color: '#10b981' },
      { label: 'Maintenance', value: rooms.filter(r => r.status === 'maintenance').length, color: '#f59e0b' }
    ];

    // Payment methods data
    const paymentMethodsData = [
      { label: 'Cash', value: 1500000, color: '#10b981' },
      { label: 'Mobile Money', value: 800000, color: '#3b82f6' },
      { label: 'Bank Transfer', value: 500000, color: '#8b5cf6' }
    ];

    // Recent activity
    const recentActivity = [
      { text: 'New tenant checked into Room 101', time: '2 hours ago', icon: 'fas fa-user-plus' },
      { text: 'Payment received - UGX 320,000', time: '5 hours ago', icon: 'fas fa-money-bill-wave' },
      { text: 'Maintenance request submitted', time: '1 day ago', icon: 'fas fa-tools' },
      { text: 'Room 103 marked as available', time: '2 days ago', icon: 'fas fa-bed' }
    ];

    return {
      totalRevenue,
      occupancyRate,
      totalTenants: tenants.length,
      pendingBalance,
      availableRooms: rooms.length - occupiedRooms,
      maintenanceRooms: rooms.filter(r => r.status === 'maintenance').length,
      pendingPayments: tenants.filter(t => t.balance > 0).length,
      newTenants: tenants.filter(t => {
        const checkIn = new Date(t.checkInDate);
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - 30);
        return checkIn > daysAgo;
      }).length,
      revenueTrends,
      occupancyData,
      paymentMethodsData,
      recentActivity
    };
  };

  // Generate realistic revenue trends
  const generateRevenueTrends = (range, totalRevenue) => {
    const trends = [];
    const now = new Date();
    
    if (range === 'week') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const baseAmount = totalRevenue / 30; // Daily average
        const randomFactor = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
        const value = Math.round(baseAmount * randomFactor);
        
        trends.push({
          label: dayName,
          value: value,
          date: date.toISOString().split('T')[0],
          trend: i > 0 && value > trends[i-1]?.value ? 'up' : 'down'
        });
      }
    } else if (range === 'month') {
      // Last 30 days in weekly chunks
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      weeks.forEach((week, index) => {
        const baseAmount = totalRevenue / 4;
        const randomFactor = 0.8 + Math.random() * 0.4;
        const value = Math.round(baseAmount * randomFactor);
        
        trends.push({
          label: week,
          value: value,
          trend: index > 0 && value > trends[index-1]?.value ? 'up' : 'down'
        });
      });
    } else {
      // Last 3 months
      const months = ['Jan', 'Feb', 'Mar'];
      months.forEach((month, index) => {
        const baseAmount = totalRevenue / 3;
        const randomFactor = 0.9 + Math.random() * 0.2;
        const value = Math.round(baseAmount * randomFactor);
        
        trends.push({
          label: month,
          value: value,
          trend: index > 0 && value > trends[index-1]?.value ? 'up' : 'down'
        });
      });
    }
    
    return trends;
  };

  const handleRefresh = () => {
    loadAnalyticsData();
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="page-container">
        <div className="error-state">
          <i className="fas fa-chart-bar"></i>
          <h3>No Analytics Data</h3>
          <p>Unable to load analytics data. Please try again.</p>
          <button className="btn btn-primary" onClick={handleRefresh}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="page-subtitle">Performance insights and key metrics</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-outline"
            onClick={handleRefresh}
          >
            <i className="fas fa-sync-alt"></i>
            Refresh
          </button>
          <div className="time-filter">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-select"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last 3 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#3b82f6' }}>
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">
              UGX {analyticsData.totalRevenue?.toLocaleString() || '0'}
            </div>
            <div className="metric-label">Total Revenue</div>
            <div className="metric-trend">
              <i className="fas fa-arrow-up trend-up"></i>
              <span>12% from last period</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#10b981' }}>
            <i className="fas fa-bed"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">
              {analyticsData.occupancyRate || 0}%
            </div>
            <div className="metric-label">Occupancy Rate</div>
            <div className="metric-trend">
              <i className="fas fa-arrow-up trend-up"></i>
              <span>5% increase</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#8b5cf6' }}>
            <i className="fas fa-users"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">
              {analyticsData.totalTenants || 0}
            </div>
            <div className="metric-label">Active Tenants</div>
            <div className="metric-trend">
              <i className="fas fa-user-plus trend-up"></i>
              <span>{analyticsData.newTenants || 0} new</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#f59e0b' }}>
            <i className="fas fa-clock"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">
              UGX {analyticsData.pendingBalance?.toLocaleString() || '0'}
            </div>
            <div className="metric-label">Pending Balance</div>
            <div className="metric-trend">
              <i className="fas fa-exclamation-circle trend-warning"></i>
              <span>{analyticsData.pendingPayments || 0} pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="analytics-grid">
        {/* Revenue Chart - IMPROVED */}
        <div className="analytics-card large">
          <div className="card-header">
            <h3>Revenue Trends - {timeRange === 'week' ? 'Last 7 Days' : timeRange === 'month' ? 'Last Month' : 'Last 3 Months'}</h3>
            <span className="card-subtitle">Revenue distribution over time</span>
          </div>
          <div className="card-content">
            <RevenueChart data={analyticsData.revenueTrends || []} timeRange={timeRange} />
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Room Occupancy</h3>
            <span className="card-subtitle">Current room status distribution</span>
          </div>
          <div className="card-content">
            <OccupancyChart data={analyticsData.occupancyData || []} />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Payment Methods</h3>
            <span className="card-subtitle">Revenue by payment type</span>
          </div>
          <div className="card-content">
            <PaymentMethods data={analyticsData.paymentMethodsData || []} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Quick Stats</h3>
            <span className="card-subtitle">At a glance overview</span>
          </div>
          <div className="card-content">
            <QuickStats data={analyticsData} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <span className="card-subtitle">Latest updates and events</span>
          </div>
          <div className="card-content">
            <RecentActivity data={analyticsData.recentActivity || []} />
          </div>
        </div>

        {/* Performance Insights */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Performance Insights</h3>
            <span className="card-subtitle">Key recommendations</span>
          </div>
          <div className="card-content">
            <PerformanceInsights data={analyticsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

// IMPROVED Revenue Chart Component
const RevenueChart = ({ data, timeRange }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-placeholder">
        <i className="fas fa-chart-line"></i>
        <p>No revenue data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));
  const totalRevenue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="revenue-chart">
      <div className="chart-header">
        <div className="chart-total">
          Total: UGX {totalRevenue.toLocaleString()}
        </div>
      </div>
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="bar-container">
            <div className="bar-wrapper">
              <div 
                className="bar"
                style={{ 
                  height: `${maxValue > 0 ? (item.value / maxValue) * 80 : 0}%`,
                  backgroundColor: item.trend === 'up' ? '#10b981' : '#ef4444'
                }}
                title={`${item.label}: UGX ${item.value.toLocaleString()}`}
              >
                <div className="bar-value">UGX {item.value.toLocaleString()}</div>
              </div>
            </div>
            <div className="bar-label">{item.label}</div>
            {timeRange === 'week' && (
              <div className="bar-date">{item.date}</div>
            )}
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
          <span>Revenue Increase</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
          <span>Revenue Decrease</span>
        </div>
      </div>
    </div>
  );
};

// Occupancy Chart Component
const OccupancyChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-placeholder">
        <i className="fas fa-chart-pie"></i>
        <p>No occupancy data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="occupancy-chart">
      <div className="chart-visual">
        {data.map((item, index) => (
          <div 
            key={index}
            className="chart-segment"
            style={{ 
              backgroundColor: item.color,
              width: `${(item.value / total) * 100}%`
            }}
            title={`${item.label}: ${item.value} (${Math.round((item.value / total) * 100)}%)`}
          >
            <span className="segment-label">{item.label}</span>
            <span className="segment-value">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <span 
              className="legend-color"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="legend-text">
              {item.label} ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Payment Methods Component
const PaymentMethods = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-placeholder">
        <i className="fas fa-credit-card"></i>
        <p>No payment data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="payment-methods">
      {data.map((item, index) => (
        <div key={index} className="method-item">
          <div className="method-header">
            <span className="method-name">{item.label}</span>
            <span className="method-amount">UGX {item.value.toLocaleString()}</span>
          </div>
          <div className="method-bar">
            <div 
              className="method-fill"
              style={{ 
                width: `${(item.value / total) * 100}%`,
                backgroundColor: item.color
              }}
            ></div>
          </div>
          <div className="method-percentage">
            {Math.round((item.value / total) * 100)}%
          </div>
        </div>
      ))}
    </div>
  );
};

// Quick Stats Component
const QuickStats = ({ data }) => {
  const stats = [
    {
      label: 'Available Rooms',
      value: data.availableRooms || 0,
      icon: 'fas fa-door-open',
      color: '#10b981'
    },
    {
      label: 'Maintenance Issues',
      value: data.maintenanceRooms || 0,
      icon: 'fas fa-tools',
      color: '#ef4444'
    },
    {
      label: 'Pending Payments',
      value: data.pendingPayments || 0,
      icon: 'fas fa-clock',
      color: '#f59e0b'
    },
    {
      label: 'New Tenants',
      value: data.newTenants || 0,
      icon: 'fas fa-user-plus',
      color: '#3b82f6'
    }
  ];

  return (
    <div className="quick-stats">
      {stats.map((stat, index) => (
        <div key={index} className="quick-stat-item">
          <div className="stat-icon" style={{ backgroundColor: stat.color }}>
            <i className={stat.icon}></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Recent Activity Component
const RecentActivity = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="no-activities">
        <i className="fas fa-bell-slash"></i>
        <p>No recent activities</p>
      </div>
    );
  }

  return (
    <div className="recent-activities">
      {data.map((activity, index) => (
        <div key={index} className="activity-item">
          <div className="activity-icon">
            <i className={activity.icon}></i>
          </div>
          <div className="activity-content">
            <p className="activity-text">{activity.text}</p>
            <span className="activity-time">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Performance Insights Component
const PerformanceInsights = ({ data }) => {
  const insights = [];

  if (data.occupancyRate > 80) {
    insights.push({
      type: 'success',
      message: 'High occupancy rate! Consider optimizing room pricing.',
      icon: 'fas fa-chart-line'
    });
  } else if (data.occupancyRate < 50) {
    insights.push({
      type: 'warning',
      message: 'Low occupancy. Review marketing and pricing strategies.',
      icon: 'fas fa-exclamation-triangle'
    });
  }

  if (data.pendingBalance > 1000000) {
    insights.push({
      type: 'danger',
      message: 'High pending balance. Follow up on overdue payments.',
      icon: 'fas fa-money-bill-wave'
    });
  }

  if (data.newTenants > 3) {
    insights.push({
      type: 'info',
      message: `Good growth! ${data.newTenants} new tenants this period.`,
      icon: 'fas fa-users'
    });
  }

  if (insights.length === 0) {
    insights.push({
      type: 'info',
      message: 'Performance is stable. Continue current strategies.',
      icon: 'fas fa-check-circle'
    });
  }

  return (
    <div className="performance-insights">
      {insights.map((insight, index) => (
        <div key={index} className={`insight-item ${insight.type}`}>
          <div className="insight-icon">
            <i className={insight.icon}></i>
          </div>
          <div className="insight-content">
            <p>{insight.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsPage;