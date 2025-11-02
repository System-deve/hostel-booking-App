import React from 'react'
import styles from './TopRatedHostels.module.css'
import {  ChevronRight, Star, Phone, MapPin, Clock, Search, X, Plus, Bed, Users, MessageCircle, Instagram, Facebook, Twitter, Youtube, Wifi, Coffee, MapPinned, Shield } from 'lucide-react';

const TopRatedHostels = () => {
     const hostels = [
    {
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 892,
      name: "Downtown Backpackers Hostel",
      location: "Berlin, Germany",
      amenities: ["Free WiFi", "Kitchen", "Lockers"],
      price: 18.50
    },
    {
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 1023,
      name: "Surf & Stay Beach Hostel",
      location: "Barcelona, Spain",
      amenities: ["Beach Access", "Bar", "Pool"],
      price: 22.00
    },
    {
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 745,
      name: "Old Town Social Hostel",
      location: "Prague, Czech Republic",
      amenities: ["Free Breakfast", "Tours", "WiFi"],
      price: 15.90
    },
    {
      image: "https://images.pexels.com/photos/32340767/pexels-photo-32340767.jpeg",
      rating: 4.9,
      reviews: 956,
      name: "Mountain View Hostel",
      location: "Interlaken, Switzerland",
      amenities: ["Mountain Views", "Kitchen", "Lockers"],
      price: 28.00
    }
  ];
  return (
    <div>
      {/* Top Hostels */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.badge}>Featured Hostels</div>
          <h2 className={styles.sectionTitle}>Top Rated Hostels</h2>
          <p className={styles.sectionSubtitle}>
            Handpicked hostels loved by backpackers worldwide. Great vibes, clean facilities, and unforgettable experiences guaranteed!
          </p>
        </div>

        <div className={styles.hostelGrid}>
          {hostels.map((hostel, i) => (
            <div key={i} className={styles.hostelCard}>
              <div className={styles.hostelImageWrapper}>
                <img src={hostel.image} alt={hostel.name} className={styles.hostelImage} />
                {/* <div className={styles.hostelBadge}>
                  ⭐ Top Rated
                </div> */}
              </div>
              <div className={styles.hostelInfo}>
                <div className={styles.hostelRating}>
                  <Star size={16} fill="currentColor" className={styles.starIcon} />
                  <span className={styles.ratingScore}>{hostel.rating}</span>
                  <span className={styles.ratingReviews}>({hostel.reviews} reviews)</span>
                </div>
                <h3 className={styles.hostelName}>{hostel.name}</h3>
                <div className={styles.hostelLocation}>
                  <MapPin size={14} />
                  <span>{hostel.location}</span>
                </div>
                <div className={styles.hostelAmenities}>
                  {hostel.amenities.map((amenity, idx) => (
                    <span key={idx} className={styles.amenity}>{amenity}</span>
                  ))}
                </div>
                <div className={styles.hostelFooter}>
                  <div className={styles.hostelPrice}>
                    <span className={styles.priceAmount}>${hostel.price}</span>
                    <span className={styles.priceLabel}> /night</span>
                  </div>
                  <button className={styles.bookButton}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TopRatedHostels
