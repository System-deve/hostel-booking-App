import React from 'react'
import styles from './header.module.css'
import {  Phone,  Bed } from 'lucide-react';
const header = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Bed size={32} className={styles.logoIcon} />
            <span className={styles.logoText}>Agiza<span className={styles.logoAccent}>hosteli</span></span>
          </div>
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>Home</a>
            <a href="#" className={styles.navLink}>Find Hostels</a>
            <a href="#" className={styles.navLink}>Destinations</a>
            <a href="#" className={styles.navLink}>About</a>
            <a href="#" className={styles.navLink}>Contact</a>
          </nav>
          <div className={styles.headerActions}>
            <div className={styles.phoneNumber}>
              <Phone size={16} className={styles.phoneIcon} />
              <span>+256 744755572</span>
            </div>
            <button className={styles.ctaButton}>Sign Up</button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default header
