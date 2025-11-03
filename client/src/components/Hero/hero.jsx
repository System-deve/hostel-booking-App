import React, { useState } from 'react'
import styles from './Hero.module.css'
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState({
    priceRange: '',
    location: '',
    roomType: ''
  });

  const heroImages = [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop"
  ];

  const handleSearchChange = (field, value) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // Build query parameters - only include fields that have values
    const queryParams = new URLSearchParams();
    
    // Handle price range
    if (searchCriteria.priceRange) {
      const [min, max] = searchCriteria.priceRange.split('-');
      if (min) queryParams.append('minPrice', min);
      if (max && max !== '') queryParams.append('maxPrice', max);
    }
    
    // Handle location - trim whitespace and encode
    if (searchCriteria.location.trim()) {
      queryParams.append('location', searchCriteria.location.trim());
      console.log('Searching for location:', searchCriteria.location.trim());
    }
    
    // Handle room type
    if (searchCriteria.roomType) {
      queryParams.append('roomType', searchCriteria.roomType);
    }

    const queryString = queryParams.toString();
    console.log('Query string:', queryString);
    
    // Navigate to search results page with proper query string
    if (queryString) {
      navigate(`/rooms?${queryString}`);
    } else {
      navigate('/rooms');
    }
  };

  // Handle Enter key press in location input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              From any location
            </h1>
            <p className={styles.heroSubtitle}>
              Connect to any hostel, save money, and experience authentic local culture. 
              Book from thousands of verified hostels in Uganda.
            </p>
            
            {/* Search Box */}
            <div className={styles.searchBoxWrapper}>
              <div className={styles.searchBox}>
                <div className={styles.searchFields}>
                  <div className={styles.searchField}>
                    <label className={styles.searchLabel}>Price Range</label>
                    <select 
                      className={styles.searchInput}
                      value={searchCriteria.priceRange}
                      onChange={(e) => handleSearchChange('priceRange', e.target.value)}
                    >
                      <option value="">Any Price</option>
                      <option value="0-500000">Under shs 500,000</option>
                      <option value="500001-1000000">shs 500,000 - shs 1000,000</option>
                      <option value="1000000-2000000">shs 1000,000 - shs 2000,000</option>
                      <option value="2000001-">Above shs 2000,000</option>
                    </select>
                  </div>
                  
                  <div className={styles.searchField}>
                    <label className={styles.searchLabel}>Location</label>
                    <input 
                      type="text"
                      className={styles.searchInput}
                      placeholder="Search locations..."
                      value={searchCriteria.location}
                      onChange={(e) => handleSearchChange('location', e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>

                  <div className={styles.searchField}>
                    <label className={styles.searchLabel}>Room Type</label>
                    <select 
                      className={styles.searchInput}
                      value={searchCriteria.roomType}
                      onChange={(e) => handleSearchChange('roomType', e.target.value)}
                    >

                      <option value="">Any Room Type</option>
                      <option value="shared">shared room</option>
                      <option value="single">single 1 person room</option>
                      <option value="double">Double 1 person room</option>
                    </select>
                  </div>
                </div>
                <button 
                  className={styles.searchButton}
                  onClick={handleSearch}
                >
                  <Search size={20} className={styles.searchIcon} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.heroImages}>
            {heroImages.map((img, i) => (
              <img key={i} src={img} alt="" className={styles.heroImage} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero;