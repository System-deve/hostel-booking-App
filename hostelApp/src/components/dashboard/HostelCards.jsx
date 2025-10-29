// src/components/dashboard/HostelCards.jsx
import React from 'react';

const HostelCards = ({ hostels }) => {
  const calculateOccupancy = (hostel) => {
    return Math.round((hostel.basicInfo.currentOccupancy / hostel.basicInfo.totalCapacity) * 100);
  };

  const getHostelImage = (hostelId) => {
    return hostelId === 'hostel_001' 
      ? 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
      : 'https://images.unsplash.com/photo-1555854876-ca341a21c98f?w=300&h=200&fit=crop';
  };

  return (
    <section className="content-card">
      <div className="card-header">
        <h3 className="card-title">My Hostels</h3>
        <a href="#" className="card-action">Manage</a>
      </div>
      <div className="card-content">
        <div className="hostels-grid">
          {hostels.map(hostel => (
            <div key={hostel.id} className="hostel-card">
              <div className="hostel-image">
                <img src={getHostelImage(hostel.id)} alt={hostel.basicInfo.name} />
                <div className={`hostel-badge ${hostel.id === 'hostel_001' ? 'featured' : ''}`}>
                  {hostel.id === 'hostel_001' ? 'Featured' : 'Active'}
                </div>
              </div>
              <div className="hostel-info">
                <h4 className="hostel-name">{hostel.basicInfo.name}</h4>
                <div className="hostel-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {hostel.location.street}, {hostel.location.division}
                </div>
                <div className="hostel-stats">
                  <div className="stat">
                    <span className="stat-value">{hostel.basicInfo.currentOccupancy}</span>
                    <span className="stat-label">Tenants</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{calculateOccupancy(hostel)}%</span>
                    <span className="stat-label">Occupancy</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">
                      {hostel.id === 'hostel_001' ? '4.8' : '4.6'}
                    </span>
                    <span className="stat-label">Rating</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostelCards;