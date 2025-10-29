// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { hostelManagerStore } from '../../data/store/HostelManagerStore';
import Sidebar from './Sidebar';
import StatsGrid from './StatsGrid';
import BookingList from './BookingList';
import HostelCards from './HostelCards';
import QuickActions from './QuickActions';
import RevenueChart from './RevenueChart';
import ReviewsList from './ReviewsList';
import '../../styles/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    // Load data from store
    setStats(hostelManagerStore.getDashboardStats());
    setUpcomingBookings(hostelManagerStore.getUpcomingBookings());
    setRecentReviews(hostelManagerStore.getRecentReviews());
  }, []);

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    if (hostelManagerStore.updateBookingStatus(bookingId, newStatus)) {
      // Refresh data
      setUpcomingBookings(hostelManagerStore.getUpcomingBookings());
    }
  };

  const handleAddHostel = () => {
    alert('Add New Hostel feature would open here');
  };

  return (
    <div className="dashboard-container">
      <Sidebar manager={hostelManagerStore.manager} />
      
      <main className="main-content">
        {/* Header */}
        <header className="content-header">
          <div className="header-left">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">
              Welcome back, {hostelManagerStore.manager.profile.fullName}! Here's your business overview
            </p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={handleAddHostel}>
              <i className="fas fa-plus"></i>
              Add New Hostel
            </button>
            <div className="notification-bell">
              <i className="fas fa-bell"></i>
              <span className="notification-count">3</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Left Column */}
          <div className="content-column">
            <BookingList 
              bookings={upcomingBookings} 
              onUpdateStatus={handleUpdateBookingStatus}
            />
            <HostelCards hostels={hostelManagerStore.hostels} />
          </div>

          {/* Right Column */}
          <div className="content-column">
            <QuickActions />
            <RevenueChart payments={hostelManagerStore.payments} />
            <ReviewsList reviews={recentReviews} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;