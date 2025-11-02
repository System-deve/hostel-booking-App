import React from 'react'
import styles from './PopularHostels.module.css'
import {  ChevronRight } from 'lucide-react';


const PopularHostels = () => {
    const cities = [
    { name: "Amsterdam", country: "Netherlands", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=300&h=300&fit=crop" },
    { name: "Bangkok", country: "Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=300&h=300&fit=crop" },
    { name: "Lisbon", country: "Portugal", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=300&fit=crop" },
    { name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=300&fit=crop" },
    { name: "Berlin", country: "Germany", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=300&h=300&fit=crop" },
    { name: "Melbourne", country: "Australia", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=300&h=300&fit=crop" },
    { name: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=300&fit=crop" },
    { name: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=300&fit=crop" }
  ];
  return (
    <div>
      <section className={styles.destinationsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.badge}>Explore Hostel Locations</div>
          <h2 className={styles.sectionTitle}>Popular Hostels</h2>
          <p className={styles.sectionSubtitle}>
            From bustling cities to tropical beaches, discover hostels in the world's most exciting destinations!
          </p>
        </div>

        <div className={styles.citiesGrid}>
          {cities.map((city, i) => (
            <div key={i} className={styles.cityCard}>
              <img src={city.image} alt={city.name} className={styles.cityImage} />
              <div className={styles.cityOverlay}></div>
              <div className={styles.cityInfo}>
                <h3 className={styles.cityName}>{city.name}</h3>
                <p className={styles.cityCountry}>{city.country}</p>
                <ChevronRight className={styles.cityArrow} size={24} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PopularHostels
