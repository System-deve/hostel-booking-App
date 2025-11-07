import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    Star,
    MapPin,
    Users,
    Bed,
    ArrowLeft,
    Check,
    Wifi,
    Coffee,
    Lock,
    ShowerHead,
    Wind,
    ChevronLeft,
    ChevronRight,
    X
} from 'lucide-react';
import styles from './RoomDetail.module.css';

const RoomDetails = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `http://localhost:5001/api/rooms/${roomId}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    setRoom(result.data);
                } else {
                    throw new Error('Room not found');
                }
            } catch (error) {
                console.error('Error fetching room details:', error);
                setError('Failed to load room details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    const getAmenityIcon = (amenity) => {
        const iconMap = {
            wifi: <Wifi size={20} />,
            'free wifi': <Wifi size={20} />,
            kitchen: <Coffee size={20} />,
            lockers: <Lock size={20} />,
            shower: <ShowerHead size={20} />,
            'air conditioning': <Wind size={20} />,
            ac: <Wind size={20} />
        };

        const key = amenity.toLowerCase();
        return iconMap[key] || <Check size={20} />;
    };

    // Function to get images for the grid layout
    const getGridImages = () => {
        const images = room?.roomImages || [];
        const primaryImage = images.find(img => img.isPrimary)?.url || images[0]?.url;

        if (images.length === 0) {
            return {
                mainImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
                sideImages: []
            };
        }

        if (images.length === 1) {
            return {
                mainImage: primaryImage,
                sideImages: []
            };
        }

        // For 2-5 images, show main + side images
        return {
            mainImage: primaryImage,
            sideImages: images.slice(1, 5) // Get up to 4 side images
        };
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Loading room details...</p>
                </div>
            </div>
        );
    }

    if (error || !room) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <p className={styles.errorText}>{error || 'Room not found'}</p>
                    <button onClick={() => navigate(-1)} className={styles.backHomeButton}>
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const { mainImage, sideImages } = getGridImages();
    const allImages = room.roomImages || [];
    const hasMultipleImages = allImages.length > 1;

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <button onClick={() => navigate(-1)} className={styles.backBtn}>
                    <ArrowLeft size={18} />
                </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
                {/* Title Section */}
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Room {room.roomNumber}</h1>
                    <div className={styles.subtitle}>
                        <div className={styles.location}>
                            <MapPin size={14} />
                            <span>{room.hostelId?.location}</span>
                        </div>
                    </div>
                </div>

                {/* Images Grid */}
                <div className={`${styles.imagesGrid} ${!hasMultipleImages ? styles.singleImage : ''}`}>
                    <div className={`${styles.mainImageWrapper} ${!hasMultipleImages ? styles.fullWidth : ''}`}>
                        <img
                            src={mainImage}
                            alt="Main room"
                            className={styles.mainImage}
                            onClick={() => setShowAllPhotos(true)}
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop';
                            }}
                        />
                    </div>

                    {hasMultipleImages && sideImages.length > 0 && (
                        <div className={styles.sideImages}>
                            {sideImages.map((img, idx) => (
                                <div key={idx} className={styles.sideImageWrapper}>
                                    <img
                                        src={img.url}
                                        alt={`Room ${idx + 2}`}
                                        className={styles.sideImage}
                                        onClick={() => setShowAllPhotos(true)}
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {allImages.length > 5 && (
                        <button className={styles.showAllPhotosBtn} onClick={() => setShowAllPhotos(true)}>
                            Show all photos
                        </button>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className={styles.mainGrid}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        <div className={styles.hostInfo}>
                            <h2 className={styles.hostTitle}>{room.hostelId?.name}</h2>
                            <div className={styles.roomMeta}>
                                <span>{room.capacity} guest{room.capacity > 1 ? 's' : ''}</span>
                                <span className={styles.dot}>·</span>
                                <span>{room.availableBeds} bed{room.availableBeds > 1 ? 's' : ''}</span>
                                <span className={styles.dot}>·</span>
                                <span className={styles.roomType}>{room.roomType}</span>
                                <span className={styles.dot}>·</span>
                                <span className={styles.genderTag}>{room.roomGender}</span>
                            </div>
                            {room.hostelId?.rating && (
                                <div className={styles.hostRating}>
                                    <Star size={14} fill="currentColor" />
                                    <span>{room.hostelId.rating.toFixed(1)}</span>
                                </div>
                            )}
                        </div>

                        <div className={styles.divider}></div>

                        <div className={styles.description}>
                            <p>{room.roomDescription}</p>
                        </div>

                        <div className={styles.divider}></div>

                        {/* Room Amenities */}
                        {room.amenities && room.amenities.length > 0 && (
                            <>
                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>What this room offers</h3>
                                    <div className={styles.amenitiesList}>
                                        {room.amenities.map((amenity, idx) => (
                                            <div key={idx} className={styles.amenityItem}>
                                                {getAmenityIcon(amenity)}
                                                <span>{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.divider}></div>
                            </>
                        )}

                        {/* Hostel Amenities */}
                        {room.hostelId?.amenities && room.hostelId.amenities.length > 0 && (
                            <>
                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>Hostel amenities</h3>
                                    <div className={styles.amenitiesList}>
                                        {room.hostelId.amenities.map((amenity, idx) => (
                                            <div key={idx} className={styles.amenityItem}>
                                                {getAmenityIcon(amenity)}
                                                <span>{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className={styles.rightColumn}>
                        <div className={styles.bookingCard}>
                            <div className={styles.priceHeader}>
                                <div className={styles.price}>
                                    <span className={styles.priceAmount}>${room.roomPrice}</span>
                                    <span className={styles.priceUnit}> night</span>
                                </div>
                            </div>

                            <div className={styles.bookingDetails}>
                                <div className={styles.detailRow}>
                                    <Users size={16} />
                                    <span>{room.capacity} guest{room.capacity > 1 ? 's' : ''}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <Bed size={16} />
                                    <span>{room.availableBeds} bed{room.availableBeds > 1 ? 's' : ''} available</span>
                                </div>
                            </div>

                            {room.availableBeds < 3 && room.availableBeds > 0 && (
                                <div className={styles.urgencyBanner}>
                                    Only {room.availableBeds} bed{room.availableBeds > 1 ? 's' : ''} left!
                                </div>
                            )}

                            <button
                                className={styles.bookButton}
                                disabled={room.availableBeds === 0 || !isAuthenticated}
                                onClick={() => {
                                    if (!isAuthenticated) {
                                        navigate('/login');
                                        return;
                                    }
                                    alert('Booking functionality coming soon!');
                                }}
                            >
                                {!isAuthenticated
                                    ? 'Login to Reserve'
                                    : room.availableBeds === 0
                                        ? 'Fully Booked'
                                        : 'Reserve'}
                            </button>

                            {room.availableBeds > 0 && isAuthenticated && (
                                <p className={styles.bookingNote}>You won't be charged yet</p>
                            )}

                            {!isAuthenticated && (
                                <p className={styles.loginNote}>
                                    Sign up or log in to make a reservation
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo Gallery Modal */}
            {showAllPhotos && (
                <div className={styles.photoModal}>
                    <div className={styles.modalHeader}>
                        <button onClick={() => setShowAllPhotos(false)} className={styles.closeBtn}>
                            <X size={20} />
                        </button>
                    </div>
                    <div className={styles.modalContent}>
                        {allImages.map((img, idx) => (
                            <div key={idx} className={styles.modalImageWrapper}>
                                <img
                                    src={img.url}
                                    alt={`Room ${idx + 1}`}
                                    className={styles.modalImage}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;