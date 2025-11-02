import React from 'react'
import styles from './MostAffordableHostels.module.css';
import {  ChevronRight } from 'lucide-react';

const MostAffordableHostels = () => {
     const hostelTypes = [
    { title: "Party Hostels", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop", count: 245 },
    { title: "Boutique Hostels", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop", count: 189 },
    { title: "Beach Hostels", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop", count: 312 },
    { title: "Quiet & Relaxed", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop", count: 156 },
    { title: "Adventure Hostels", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop", count: 203 }
  ];

  return (
    <div>
      <section className={styles.section}>
        <div className={styles.typesGrid}>
          {hostelTypes.map((type, i) => (
            <div key={i} className={styles.typeCard}>
              <img src={type.image} alt={type.title} className={styles.typeImage} />
              <div className={styles.typeOverlay}></div>
              <div className={styles.typeCount}>
                📍 {type.count} Hostels
              </div>
              <div className={styles.typeInfo}>
                <h3 className={styles.typeTitle}>{type.title}</h3>
                <p className={styles.typeDescription}>
                  Perfect for travelers seeking vibrant social atmosphere, events, and meeting new friends from around the world.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaLabel}>Join thousands of travelers!</p>
            <h3 className={styles.ctaTitle}>Book Smart, Travel More!</h3>
            <button className={styles.ctaLargeButton}>
              Get Started <ChevronRight size={20} className={styles.ctaIcon} />
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop" alt="Backpacker" className={styles.ctaImage} />
        </div>
      </section>
    </div>
  )
}

export default MostAffordableHostels
