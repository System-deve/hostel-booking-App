import React, { useState } from 'react';
import Header from '../../components/header/header';
import styles from './homePage.module.css';
import Hero from '../../components/Hero/hero'
import TopRatedHostels from '../../components/sections/TopRatedHostels/TopRatedHostels';
import PopularHostels from '../../components/sections/PopularHostels/PopularHostels';
import MostAffordableHostels from '../../components/sections/MostAffordableHostels/MostAffordableHostels';
import FAQs from '../../components/sections/FAQs/FAQs';
import Footer from '../../components/Footer/footer';

export default function HostelBookingApp() {
  return (
    <div className={styles.container}>
        {/* header */}
      <Header/>
     
      {/* Hero Section */}
      <Hero/>

      {/* Top Hostels */}
      <TopRatedHostels/>

      {/* Popular Hostels */}
      <PopularHostels/>

      {/* Hostel Types */}
      <MostAffordableHostels/>

      {/* FAQ Section */}
      <FAQs/>

      {/* Footer */}
      <Footer/>
    </div>
  );
}