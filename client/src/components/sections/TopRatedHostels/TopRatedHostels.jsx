import React from 'react'
import styles from './TopRatedHostels.module.css'
import {  Star, MapPin,  } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopRatedHostels = () => {
  const[hostel, setHostel]=useState([])
  const[loading, setLoading]=useState(true);
  const[error, setError]=useState(null)
  const navigate =useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  useEffect(()=>{
    const fetchTopRatedHostel =async()=>{
      try{
        setLoading(true);
        setError(null)
        const response =await fetch(`${BACKEND_URL}/api/hostels/topRated`);
        if(!response.ok){ 
          console.log('Error Fetching')
          throw new Error(`HTTP error! status: ${response.status}`);
        }
         const result= await response.json()
         console.log(result)
        
         if(result.success && Array.isArray(result.data)){
            setHostel(result.data)
         } else{
          setHostel([])
         }


      } catch(error){
        console.log("error fetching top rated Data", error);
        setError('Failed to load hostels please try again later')

      } finally{
        setLoading(false)
      }
    }
  fetchTopRatedHostel()


}, [])

if(loading){
  return(
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Top Rated Hostels</h2>
        <p>Loading hostels...</p>
      </div>

    </div>
  )

}

if(error){
  return(
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Top Rated Hostels</h2>
        <p>{error}</p>
      </div>

    </div>
  )

}

if(hostel.length === 0){
  return(
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Top Rated Hostels</h2>
        <p>No hostels found.</p>
      </div>

    </div>
  )


}
  
const checkAmenities= (hostelAmenities)=>{
  if(!hostelAmenities || !Array.isArray(hostelAmenities)){
    return []


}
if(hostelAmenities.length > 5){
  return hostelAmenities.slice(0,5)

}
return hostelAmenities
}



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
          {hostel.map((hostel, i) => (
            <div 
            key={i} 
            className={styles.hostelCard}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate(`/hostel/${hostel._id}/rooms`);
            }}
            
            style={{cursor: 'pointer'}}
            
            >
              <div className={styles.hostelImageWrapper}>
                <img 
                src={hostel.image} 
                alt={hostel.name}
                className={styles.hostelImage} 
                onError={(e)=>{
                   e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop'
                }}
                />
                
                
              </div>
              <div className={styles.hostelInfo}>
                <div className={styles.hostelRating}>
                  <Star size={16} fill="currentColor" className={styles.starIcon} />
                  <span className={styles.ratingScore}>{hostel.rating}</span>
                </div>
                <h3 className={styles.hostelName}>{hostel.name}</h3>
                <div className={styles.hostelLocation}>
                  <MapPin size={14} />
                  <span>{hostel.location}</span>
                </div>
                <div className={styles.hostelAmenities}>
                  {hostel.amenities && checkAmenities(hostel.amenities).map((amenity, idx) => (
                    <span key={idx} className={styles.amenity}>{amenity}</span>
                  ))}
                  {hostel.amenities && hostel.amenities.length > 5 &&(
                    <span className={styles.moreText}>+{hostel.amenities.length -5}more</span>
                  )}
                </div>
                <div className={styles.hostelFooter}>
                 
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
