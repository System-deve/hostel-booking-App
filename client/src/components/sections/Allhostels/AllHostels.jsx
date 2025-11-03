import React from 'react'
import styles from './AllHostels.module.css';
import {  ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

const MostAffordableHostels = () => {

  const [hostel, setHostel]= useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError]= useState(null)

  useEffect(()=>{
    const fetchAllHostels= async()=>{
      try{
        setLoading(true);
        setError(null);

        const response= await fetch(`http://localhost:5001/api/hostels/allHostels`);
        if(!response.ok){
          console.error(error)
          throw new Error('HTTP Error! status:', response.status)

        }
        const result = await response.json()
        if(result.success && Array.isArray(result.data)){
          setHostel(result.data);

        }else{
          setHostel([])
        }

      } catch(error){
        console.log(error)

      } finally{
        setLoading(false)
      }
    }

    fetchAllHostels()
  }, []);

  if(loading){
    return(
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p>loading hostels...</p>
        </div>

      </div>
    )

  }

  if(error){
    return(
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p>{error}</p>
        </div>

      </div>
    )

  }

  if(hostel.length===0){
    return(
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p>No hostel found</p>
        </div>

      </div>
    )

  }
  
  return (
    <div>
      <section className={styles.section}>
        <div className={styles.typesGrid}>
          {hostel.map((type, i) => (
            <div key={i} className={styles.typeCard}>
              <img src={type.image} alt={type.title} className={styles.typeImage} />
              <div className={styles.typeOverlay}></div>
              <div className={styles.typeCount}>
                 {type.count} Hostels
              </div>
              <div className={styles.typeInfo}>
                {/* <h3 className={styles.typeTitle}>{type.title}</h3> */}
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
