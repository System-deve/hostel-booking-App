import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Users, 
  Bed, 
  ArrowLeft,
  Heart
} from 'lucide-react';
import styles from './HostelRoom.module.css';

const HostelRooms = () => {
  const { hostelId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [hostelInfo, setHostelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:5001/api/rooms/hostel/${hostelId}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setRooms(result.data);
          setHostelInfo(result.hostel);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError('Failed to load rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hostelId]);

  const getPrimaryImage = (images) => {
    const primary = images?.find(img => img.isPrimary);
    return primary?.url || images?.[0]?.url || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';
  };

  const getRoomTypeLabel = (type) => {
    const labels = {
      private: 'Private room',
      shared: 'Shared room',
      dorm: 'Dormitory'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading available rooms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
          <button onClick={() => navigate(-1)} className={styles.backHomeButton}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={18} />
        </button>
        
        {hostelInfo && (
          <div className={styles.hostelInfo}>
            <h1 className={styles.hostelName}>{hostelInfo.name}</h1>
            <div className={styles.hostelMeta}>
              <div className={styles.location}>
                <MapPin size={14} />
                <span>{hostelInfo.location}</span>
              </div>
              {hostelInfo.rating && (
                <div className={styles.rating}>
                  <Star size={14} fill="currentColor" />
                  <span>{hostelInfo.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h2 className={styles.resultCount}>
          {rooms.length} room{rooms.length !== 1 ? 's' : ''} available
        </h2>

        {rooms.length === 0 ? (
          <div className={styles.emptyContainer}>
            <h2 className={styles.emptyTitle}>No rooms available</h2>
            <p className={styles.emptyText}>
              This hostel doesn't have any available rooms at the moment. Please check back later or explore other hostels.
            </p>
            <button onClick={() => navigate('/')} className={styles.backHomeButton}>
              Browse all hostels
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {rooms.map((room) => (
              <div 
                key={room._id} 
                className={styles.card}
                onClick={() => navigate(`/room/${room._id}`)}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={getPrimaryImage(room.roomImages)}
                    alt={`Room ${room.roomNumber}`}
                    className={styles.image}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop';
                    }}
                  />
                  <button className={styles.favoriteBtn} onClick={(e) => e.stopPropagation()}>
                    <Heart size={20} />
                  </button>
                  {room.availableBeds < 3 && room.availableBeds > 0 && (
                    <div className={styles.urgentBadge}>
                      Only {room.availableBeds} left
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.roomTitle}>
                      Room {room.roomNumber} · {getRoomTypeLabel(room.roomType)}
                    </h3>
                  </div>

                  <p className={styles.description}>
                    {room.roomDescription.length > 80
                      ? `${room.roomDescription.substring(0, 80)}...`
                      : room.roomDescription}
                  </p>

                  <div className={styles.roomDetails}>
                    <span className={styles.detail}>
                      <Users size={14} />
                      {room.capacity} guest{room.capacity > 1 ? 's' : ''}
                    </span>
                    <span className={styles.separator}>·</span>
                    <span className={styles.detail}>
                      <Bed size={14} />
                      {room.availableBeds} bed{room.availableBeds > 1 ? 's' : ''}
                    </span>
                    <span className={styles.separator}>·</span>
                    <span className={styles.genderBadge}>
                      {room.roomGender}
                    </span>
                  </div>

                  {room.amenities && room.amenities.length > 0 && (
                    <p className={styles.amenities}>
                      {room.amenities.slice(0, 3).join(' · ')}
                      {room.amenities.length > 3 && ` · +${room.amenities.length - 3} more`}
                    </p>
                  )}

                  <div className={styles.priceContainer}>
                    <div className={styles.price}>
                      <span className={styles.priceAmount}>${room.roomPrice}</span>
                      <span className={styles.priceUnit}> night</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelRooms;