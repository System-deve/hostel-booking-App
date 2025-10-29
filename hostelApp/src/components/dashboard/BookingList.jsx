// src/components/dashboard/BookingList.jsx
import React from 'react';

const BookingList = ({ bookings, onUpdateStatus }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `UGX ${amount?.toLocaleString() || '0'}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'pending';
      case 'confirmed': return 'confirmed';
      case 'paid': return 'paid';
      case 'active': return 'confirmed';
      default: return 'pending';
    }
  };

  return (
    <section className="content-card">
      <div className="card-header">
        <h3 className="card-title">Recent Bookings</h3>
        <a href="#" className="card-action">View All</a>
      </div>
      <div className="card-content">
        <div className="booking-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-item">
              <div className="booking-avatar">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(booking.tenant.fullName)}&background=2563eb&color=fff`}
                  alt={booking.tenant.fullName}
                />
              </div>
              <div className="booking-details">
                <div className="booking-name">{booking.tenant.fullName}</div>
                <div className="booking-meta">
                  {booking.hostelId === 'hostel_001' ? 'Green Valley Hostel' : 'Campus Comfort'} • {booking.roomId.includes('single') ? 'Single' : 'Double'} Room
                </div>
                <div className="booking-date">Check-in: {formatDate(booking.checkInDate)}</div>
              </div>
              <div className="booking-amount">{formatCurrency(booking.totalAmount)}</div>
              <div 
                className={`booking-status ${getStatusColor(booking.bookingStatus)}`}
                onClick={() => onUpdateStatus(booking.id, 'confirmed')}
              >
                {booking.bookingStatus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingList;