import React, { useState } from 'react';
import {  ChevronRight, Star, Phone, MapPin, Clock, Search, X, Plus, Bed, Users, MessageCircle, Instagram, Facebook, Twitter, Youtube, Wifi, Coffee, MapPinned, Shield } from 'lucide-react';
import Header from './header/header';
import styles from './homePage.module.css';
import Hero from './Hero/hero'
import TopRatedHostels from './sections/topRatedHostels/TopRatedHostels';
import PopularHostels from './sections/PopularHostels/PopularHostels';


export default function HostelBookingApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(1);

  const hostelTypes = [
    { title: "Party Hostels", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop", count: 245 },
    { title: "Boutique Hostels", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop", count: 189 },
    { title: "Beach Hostels", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop", count: 312 },
    { title: "Quiet & Relaxed", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop", count: 156 },
    { title: "Adventure Hostels", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop", count: 203 }
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I book a hostel bed on your platform?",
      answer: "Simply browse through our available hostels click on it and follow the next steps, if you have not logged in , u may need to provide your login credentials to confirm our booking. Then select your favorable payment option and continue to place in your secrete pin"
    },
    {
      id: 2,
      question: "How do I pay for my booking?",
      answer: "We accept various payment methods, including credit cards and online payment platforms. You'll be prompted to pay during the booking process."
    },
    {
      id: 3,
      question: "What is your cancellation policy?",
      answer: "Most hostels offer free cancellation up to 48 hours before check-in. Some may have different policies, which are clearly displayed before booking."
    },
    {
      id: 4,
      question: "What if I have issues with my hostel room?",
      answer: "There is a report section where one can report the situation at the hostel. for this immediate action is taken but our hostel are examined to check if they meet standards"
    },
    {
      id: 5,
      question: "What amenities are typically included?",
      answer: "Common amenities include free WiFi, bed linens, communal kitchen, common areas, and lockers. Some hostels also offer free breakfast, laundry, and organized activities."
    }
  ];

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
    <div className={styles.container}>
      <Header/>
     

      {/* Hero Section */}
      <Hero/>

      {/* Top Hostels */}
      <TopRatedHostels/>

      {/* Popular Hostels */}
      <PopularHostels/>

      {/* Hostel Types */}
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

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.badge}>Got Questions?</div>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to know about booking hostels with Agiza Hosteli
            </p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <div key={faq.id} className={styles.faqItem}>
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className={styles.faqQuestion}
                >
                  <div className={styles.faqQuestionContent}>
                    <span className={styles.faqNumber}>{String(faq.id).padStart(2, '0')}</span>
                    <span className={styles.faqQuestionText}>{faq.question}</span>
                  </div>
                  {openFaq === faq.id ? (
                    <X className={styles.faqIcon} />
                  ) : (
                    <Plus className={styles.faqIconPlus} />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div className={styles.faqAnswer}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
  );
}