import React from 'react'
import styles from './Footer.module.css'
import {  ChevronRight, Star, Phone, MapPin, Clock, Search, X, Plus, Bed, Users, MessageCircle, Instagram, Facebook, Twitter, Youtube, Wifi, Coffee, MapPinned, Shield } from 'lucide-react';


const Footer = () => {
     const instagramPosts = [
    { image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=150&h=150&fit=crop" },
    { image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=150&h=150&fit=crop" },
    { image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=150&h=150&fit=crop" },
    { image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&h=150&fit=crop" },
    { image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=150&h=150&fit=crop" },
    { image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=150&h=150&fit=crop" },
    { image: "https://images.unsplash.com/photo-1626600174478-e6df78e1600c?w=150&h=150&fit=crop" },
    { image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop" }
  ];
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <Bed size={32} className={styles.logoIcon} />
                <span className={styles.logoText}>Agiza<span className={styles.logoAccent}>hosteli</span></span>
              </div>
              <p className={styles.footerDescription}>
                Agiza hosteli connects local and international students to amazing hostels around Makerere University. Book with confidence and save up to 70% ... <span className={styles.readMore}>Read More</span>
              </p>
              <div className={styles.footerContact}>
                <div className={styles.footerContactItem}>
                  <Phone size={16} />
                  <span>+256 744755572</span>
                </div>
                <div className={styles.footerContactItem}>
                  <Clock size={16} />
                  <span>24/7 Customer Support</span>
                </div>
                <div className={styles.footerContactItem}>
                  <MapPin size={16} />
                  <span>Makerere Kikoni</span>
                </div>
              </div>
            </div>

            <div className={styles.footerLinks}>
              <h3 className={styles.footerLinkTitle}>Support</h3>
              <ul className={styles.footerLinkList}>
                <li><a href="#" className={styles.footerLink}>Contact Us</a></li>
                <li><a href="#" className={styles.footerLink}>About Us</a></li>
                <li><a href="#" className={styles.footerLink}>Help Center</a></li>
              </ul>
            </div>

            <div className={styles.footerLinks}>
              <h3 className={styles.footerLinkTitle}>Legal</h3>
              <ul className={styles.footerLinkList}>
                <li><a href="#" className={styles.footerLink}>Privacy Policy</a></li>
                <li><a href="#" className={styles.footerLink}>Terms & Conditions</a></li>
                <li><a href="#" className={styles.footerLink}>Cookie Policy</a></li>
              </ul>
            </div>

            <div className={styles.footerSocial}>
              <h3 className={styles.footerLinkTitle}>Follow Us</h3>
              <div className={styles.instagramGrid}>
                {instagramPosts.map((post, i) => (
                  <div key={i} className={styles.instagramPost}>
                    <img src={post.image} alt="" className={styles.instagramImage} />
                    <div className={styles.instagramOverlay}>
                      <Instagram size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.footerFeatures}>
            <div className={styles.featureCard}>
              <Users size={40} />
              <div>
                <p className={styles.featureLabel}>Need help? 24/7 Support</p>
                <p className={styles.featureValue}>+256 744755572</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <Shield size={40} />
              <div>
                <p className={styles.featureValue}>Secure Booking</p>
                <p className={styles.featureLabel}>100% Payment Protection</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <MessageCircle size={40} />
              <div>
                <p className={styles.featureValue}>Best Price Guarantee</p>
                <p className={styles.featureLabel}>Find it cheaper? We'll match it!</p>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.copyright}>©2024 agizahosteli.com. All rights Reserved.</p>
            <div className={styles.socialLinks}>
              <span className={styles.followText}>Follow us</span>
              <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
              <a href="#" className={styles.socialLink}><Facebook size={20} /></a>
              <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
              <a href="#" className={styles.socialLink}><Youtube size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
