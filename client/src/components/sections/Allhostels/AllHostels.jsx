import React from 'react'
import styles from './AllHostels.module.css';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MostAffordableHostels = () => {
  const [hostels, setHostels] = useState([]) // Changed to array and plural name
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHostels = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:5001/api/hostels/allHostels`);
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`) // Fixed string concatenation
        }
        const result = await response.json()
        console.log('Fetched hostels:', result); // Debug log
        
        if (result.success && Array.isArray(result.data)) {
          setHostels(result.data);
        } else {
          setHostels([])
        }

      } catch (error) {
        console.log('Fetch error:', error)
        setError('Failed to load hostels') // Actually set the error state
      } finally {
        setLoading(false)
      }
    }

    fetchAllHostels()
  }, []);

  if (loading) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p>Loading hostels...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (hostels.length === 0) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p>No hostels found</p>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <section className={styles.section}>
        <div className={styles.typesGrid}>
          {hostels.map((hostel, i) => ( // Changed from 'type' to 'hostel'
            <div
              key={i} 
              className={styles.typeCard}
              onClick={() => navigate(`/hostel/${hostel._id}/rooms`)} // Fixed: using hostel._id
            >
              <img 
                src={hostel.image} 
                alt={hostel.name} // Changed from type.title to hostel.name
                className={styles.typeImage} 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop'
                }}
              />
              <div className={styles.typeOverlay}></div>
              <div className={styles.typeCount}>
                {hostel.rating} ⭐ {/* Show rating instead of count */}
              </div>
              <div className={styles.typeInfo}>
                <h3 className={styles.typeTitle}>{hostel.name}</h3> {/* Added hostel name */}
                <p className={styles.typeDescription}>
                  {hostel.description} {/* Use actual hostel description */}
                </p>
                <div className={styles.hostelLocation}>
                  📍 {hostel.location} {/* Show location */}
                </div>
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