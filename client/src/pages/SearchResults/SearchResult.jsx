import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Star, MapPin, Users, Bed, Heart } from 'lucide-react';
import styles from './SearchResults.module.css';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState('');
  const [isPartialMatch, setIsPartialMatch] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, [searchParams]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsPartialMatch(false);

      // Get all search parameters
      const locationParam = searchParams.get('location');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const roomType = searchParams.get('roomType');

      setSearchedLocation(locationParam || '');

      // Build the query string manually to ensure proper encoding
      const params = new URLSearchParams();
      if (locationParam) params.append('location', locationParam);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (roomType) params.append('roomType', roomType);

      const queryString = params.toString();
      const url = `http://localhost:5001/api/rooms/available${queryString ? `?${queryString}` : ''}`;
      
      console.log('Fetching from URL:', url); // Debug log
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result); // Debug log

      if (result.success) {
        setRooms(result.data || []);
        
        // Check if we have results and if they're fuzzy matches
        if (result.data && result.data.length > 0 && locationParam) {
          // Check if any location exactly matches the search term
          const hasExactLocationMatch = result.data.some(room => {
            const roomLocation = room.hostelId?.location?.toLowerCase() || '';
            const searchTerm = locationParam.toLowerCase().trim();
            // Exact match means the location equals the search term exactly
            return roomLocation === searchTerm || roomLocation === `${searchTerm}, uganda`;
          });
          
          // If no exact match but we have results, show fuzzy match message
          setIsPartialMatch(!hasExactLocationMatch);
        }
      } else {
        setRooms([]);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to load rooms. Please try again later.');
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const getPrimaryImage = (images) => {
    if (!images || images.length === 0) {
      return 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop';
    }
    const primary = images.find(img => img.isPrimary);
    return primary?.url || images[0]?.url || 
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop';
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
          <p>Finding available rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Results Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.resultCount}>
            {rooms.length > 0 ? `${rooms.length} stay${rooms.length > 1 ? 's' : ''}` : 'No stays found'}
          </h1>
          {searchedLocation && rooms.length > 0 && (
            <p className={styles.searchInfo}>
              {isPartialMatch 
                ? `We didn't find an exact match for "${searchedLocation}", but you might be looking for these`
                : `in ${searchedLocation}`}
            </p>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className={styles.resultsWrapper}>
        {error ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
            <button onClick={fetchRooms} className={styles.retryButton}>
              Try again
            </button>
          </div>
        ) : rooms.length === 0 ? (
          <div className={styles.emptyContainer}>
            <h2 className={styles.emptyTitle}>No exact matches</h2>
            <p className={styles.emptyText}>
              {searchedLocation 
                ? `We couldn't find any hostels matching "${searchedLocation}". Try adjusting your search or check the spelling.`
                : 'Try adjusting your search. We suggest changing your filters or try a different location.'}
            </p>
            <button onClick={() => navigate('/')} className={styles.backHomeButton}>
              Back to home
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
                    alt={`Room ${room.roomNumber || ''}`}
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
                      Rare find
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>
                      <h3 className={styles.hostelName}>
                        {room.hostelId?.name || 'Hostel'}
                      </h3>
                      {room.hostelId?.rating && (
                        <div className={styles.rating}>
                          <Star size={12} fill="currentColor" />
                          <span>{room.hostelId.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className={styles.location}>
                    {room.hostelId?.location || 'Location'}
                  </p>

                  <div className={styles.roomDetails}>
                    <span className={styles.roomType}>
                      {getRoomTypeLabel(room.roomType)}
                    </span>
                    <span className={styles.separator}>·</span>
                    <span className={styles.capacity}>
                      {room.capacity} guest{room.capacity > 1 ? 's' : ''}
                    </span>
                    <span className={styles.separator}>·</span>
                    <span className={styles.beds}>
                      {room.availableBeds} bed{room.availableBeds > 1 ? 's' : ''} available
                    </span>
                  </div>

                  {room.amenities && room.amenities.length > 0 && (
                    <p className={styles.amenities}>
                      {room.amenities.slice(0, 2).join(' · ')}
                      {room.amenities.length > 2 && ` · +${room.amenities.length - 2} more`}
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

export default SearchResults;