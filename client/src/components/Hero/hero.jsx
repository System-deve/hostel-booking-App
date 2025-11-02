import React from 'react'
import styles from './Hero.module.css'
import {  Search, } from 'lucide-react';

const hero = () => {

    const heroImages = [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop"
  ];
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
              Connect to any hostel, save money, and experience authentic local culture. Book from thousands of verified hostels in Uganda.
            </p>
            
            
             {/* Search Box */}
         <div className={styles.searchBoxWrapper}>
          <div className={styles.searchBox}>
            <div className={styles.searchFields}>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Price Range</label>
                <select className={styles.searchInput}>
                  <option> below 600,000</option>
                  <option> 600,000 - 1000,000</option>
                  <option> 1000,000 + </option>
                </select>
              </div>
              
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Check-out</label>
                <input type="date" className={styles.searchInput} />
              </div>

              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Room Type</label>
                <select className={styles.searchInput}>
                  <option>single Room</option>
                   <option>Double Room</option>
                </select>
              </div>
            </div>
            <button className={styles.searchButton}>
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

export default hero
