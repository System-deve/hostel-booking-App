import React, { useState } from 'react';
import styles from './HomePage.module.css';
import Hero from '../../components/Hero/hero'
import TopRatedHostels from '../../components/sections/TopRatedHostels/TopRatedHostels';
import PopularHostels from '../../components/sections/PopularHostels/PopularHostels';
import AllHostels from '../../components/sections/Allhostels/AllHostels';
import FAQs from '../../components/sections/FAQs/FAQs';

export default function HostelBookingApp() {
  return (
    <div className={styles.container}>
     
     
      {/* Hero Section */}
      <Hero/>

      {/* Top Hostels */}
      <TopRatedHostels/>

      {/* Popular Hostels */}
      <PopularHostels/>

      {/* Hostel Types */}
      <AllHostels/>

      {/* FAQ Section */}
      <FAQs/>

     
    </div>
  );
}
