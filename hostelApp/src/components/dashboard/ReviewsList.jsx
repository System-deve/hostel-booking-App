// src/components/dashboard/ReviewsList.jsx
import React from 'react';

const ReviewsList = ({ reviews }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getHostelName = (hostelId) => {
    return hostelId === 'hostel_001' ? 'Green Valley Hostel' : 'Campus Comfort Hostel';
  };

  return (
    <section className="content-card">
      <div className="card-header">
        <h3 className="card-title">Recent Reviews</h3>
        <a href="#" className="card-action">View All</a>
      </div>
      <div className="card-content">
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer">
                  <div className="reviewer-avatar">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.tenantName)}&background=2563eb&color=fff`}
                      alt={review.tenantName}
                    />
                  </div>
                  <div className="reviewer-info">
                    <div className="reviewer-name">{review.tenantName}</div>
                    <div className="review-date">{formatDate(review.date)}</div>
                  </div>
                </div>
                <div className="review-rating">
                  <span className="stars" style={{ color: '#f59e0b' }}>
                    {renderStars(review.rating)}
                  </span>
                </div>
              </div>
              <p className="review-text">"{review.comment}"</p>
              <div className="review-hostel">{getHostelName(review.hostelId)}</div>
            </div>
          ))}
          
          {/* Fallback if no reviews */}
          {reviews.length === 0 && (
            <div className="no-reviews">
              <p>No reviews yet. Reviews will appear here once students start rating your hostels.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsList;