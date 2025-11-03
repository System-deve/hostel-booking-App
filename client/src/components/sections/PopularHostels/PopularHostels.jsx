import React from 'react'
import styles from './PopularHostels.module.css'
import {  ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';


const PopularHostels = () => {
  const [ hostel, setHostel]= useState([])
  const [Loading, setLoading]=useState(true)
  const [error, setError]= useState(null)

  useEffect(()=>{

    const fetchHostelsPerLocation= async()=>{
      try{
        setLoading(true);
        setError(null)
        const response = await fetch(`http://localhost:5001/api/hostels/locationBasedHostels`);
        if(!response.ok){
          console.log("error in fetching string")
          throw new Error(`HTTP Error! status ${response.status}` )

        }
        const result= await response.json();
        if(result.success && Array.isArray(result.data)){
          setHostel(result.data)
        }else{
          setHostel([])
        }


      } catch(error){
        console.log("Error Fetching", error);

      } finally{
        setLoading(false)
      }
    }
    fetchHostelsPerLocation()

  }, [])

  if(Loading){
    return(
      <div className={styles.section}>
      <div className={styles.sectionHeader}>In Different Locations</div>
      <p>Loading hostels...</p>
    </div>
    )
  }

  if(error){
     return(
      <div className={styles.section}>
      <div className={styles.sectionHeader}>In Different Locations</div>
      <p>{error}</p>
    </div>
    )
  }

  if(hostel.length === 0){
     return(
      <div className={styles.section}>
      <div className={styles.sectionHeader}>In Different Locations</div>
      <p>No hostels found</p>
    </div>
    )
  }

   
  return (
    <div>
      <section className={styles.destinationsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.badge}>Explore Hostel Locations</div>
          <h2 className={styles.sectionTitle}>In Different Locations</h2>
          <p className={styles.sectionSubtitle}>
            Discover our Hostels in different cities, Book any of our hostel according to a location listed, 
          </p>
        </div>

        <div className={styles.citiesGrid}>
          {hostel.map((location, i) => (
            <div key={i} className={styles.cityCard}>
              <img src={location.image} alt={location.name} className={styles.cityImage} />
              <div className={styles.cityOverlay}></div>
              <div className={styles.cityInfo}>
                <h3 className={styles.cityName}>{location.name}</h3>
                <p className={styles.cityCountry}>{location.location}</p>
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
