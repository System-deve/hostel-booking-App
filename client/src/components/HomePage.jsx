import React, { useState } from 'react';
import {  ChevronRight, Star, Phone, MapPin, Clock, Search, X, Plus, Bed, Users, MessageCircle, Instagram, Facebook, Twitter, Youtube, Wifi, Coffee, MapPinned, Shield } from 'lucide-react';
import Header from './header/header';
import styles from './homePage.module.css';
import Hero from './Hero/hero'

export default function HostelBookingApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(1);

  

  const hostels = [
    {
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 892,
      name: "Downtown Backpackers Hostel",
      location: "Berlin, Germany",
      amenities: ["Free WiFi", "Kitchen", "Lockers"],
      price: 18.50
    },
    {
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 1023,
      name: "Surf & Stay Beach Hostel",
      location: "Barcelona, Spain",
      amenities: ["Beach Access", "Bar", "Pool"],
      price: 22.00
    },
    {
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 745,
      name: "Old Town Social Hostel",
      location: "Prague, Czech Republic",
      amenities: ["Free Breakfast", "Tours", "WiFi"],
      price: 15.90
    },
    {
      image: "https://images.unsplash.com/photo-1626600174478-e6df78e1600c?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 956,
      name: "Mountain View Hostel",
      location: "Interlaken, Switzerland",
      amenities: ["Mountain Views", "Kitchen", "Lockers"],
      price: 28.00
    }
  ];

  const cities = [
    { name: "Amsterdam", country: "Netherlands", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=300&h=300&fit=crop" },
    { name: "Bangkok", country: "Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=300&h=300&fit=crop" },
    { name: "Lisbon", country: "Portugal", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=300&fit=crop" },
    { name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=300&fit=crop" },
    { name: "Berlin", country: "Germany", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=300&h=300&fit=crop" },
    { name: "Melbourne", country: "Australia", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=300&h=300&fit=crop" },
    { name: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=300&fit=crop" },
    { name: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=300&fit=crop" }
  ];

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
      answer: "Simply search for your destination, select your dates, choose between dorm beds or private rooms, and complete the booking. You'll receive instant confirmation via email. Our platform shows real-time availability and secure payment options."
    },
    {
      id: 2,
      question: "What's the difference between dorm beds and private rooms?",
      answer: "Dorm beds are shared rooms with multiple beds (4-12 people), perfect for budget travelers. Private rooms offer more privacy with 1-2 beds, ideal for couples or those wanting personal space."
    },
    {
      id: 3,
      question: "What is your cancellation policy?",
      answer: "Most hostels offer free cancellation up to 48 hours before check-in. Some may have different policies, which are clearly displayed before booking."
    },
    {
      id: 4,
      question: "Are hostels safe for solo travelers?",
      answer: "Yes! Most hostels have lockers, 24/7 reception, CCTV, and key card access. We only list verified hostels with good safety ratings."
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
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.badge}>Featured Hostels</div>
          <h2 className={styles.sectionTitle}>Top Rated Hostels</h2>
          <p className={styles.sectionSubtitle}>
            Handpicked hostels loved by backpackers worldwide. Great vibes, clean facilities, and unforgettable experiences guaranteed!
          </p>
        </div>

        <div className={styles.hostelGrid}>
          {hostels.map((hostel, i) => (
            <div key={i} className={styles.hostelCard}>
              <div className={styles.hostelImageWrapper}>
                <img src={hostel.image} alt={hostel.name} className={styles.hostelImage} />
                <div className={styles.hostelBadge}>
                  ⭐ Top Rated
                </div>
              </div>
              <div className={styles.hostelInfo}>
                <div className={styles.hostelRating}>
                  <Star size={16} fill="currentColor" className={styles.starIcon} />
                  <span className={styles.ratingScore}>{hostel.rating}</span>
                  <span className={styles.ratingReviews}>({hostel.reviews} reviews)</span>
                </div>
                <h3 className={styles.hostelName}>{hostel.name}</h3>
                <div className={styles.hostelLocation}>
                  <MapPin size={14} />
                  <span>{hostel.location}</span>
                </div>
                <div className={styles.hostelAmenities}>
                  {hostel.amenities.map((amenity, idx) => (
                    <span key={idx} className={styles.amenity}>{amenity}</span>
                  ))}
                </div>
                <div className={styles.hostelFooter}>
                  <div className={styles.hostelPrice}>
                    <span className={styles.priceAmount}>${hostel.price}</span>
                    <span className={styles.priceLabel}> /night</span>
                  </div>
                  <button className={styles.bookButton}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className={styles.destinationsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.badge}>Explore Cities</div>
          <h2 className={styles.sectionTitle}>Popular Destinations</h2>
          <p className={styles.sectionSubtitle}>
            From bustling cities to tropical beaches, discover hostels in the world's most exciting destinations!
          </p>
        </div>

        <div className={styles.citiesGrid}>
          {cities.map((city, i) => (
            <div key={i} className={styles.cityCard}>
              <img src={city.image} alt={city.name} className={styles.cityImage} />
              <div className={styles.cityOverlay}></div>
              <div className={styles.cityInfo}>
                <h3 className={styles.cityName}>{city.name}</h3>
                <p className={styles.cityCountry}>{city.country}</p>
                <ChevronRight className={styles.cityArrow} size={24} />
              </div>
            </div>
          ))}
        </div>
      </section>

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
              Everything you need to know about booking hostels with HostelHub
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
                <span className={styles.logoText}>Hostel<span className={styles.logoAccent}>Hub</span></span>
              </div>
              <p className={styles.footerDescription}>
                HostelHub connects budget travelers with amazing hostels worldwide. Book with confidence and save up to 70% ... <span className={styles.readMore}>Read More</span>
              </p>
              <div className={styles.footerContact}>
                <div className={styles.footerContactItem}>
                  <Phone size={16} />
                  <span>+1 555 123 4567</span>
                </div>
                <div className={styles.footerContactItem}>
                  <Clock size={16} />
                  <span>24/7 Customer Support</span>
                </div>
                <div className={styles.footerContactItem}>
                  <MapPin size={16} />
                  <span>Global HQ: San Francisco, CA, USA</span>
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
                <p className={styles.featureValue}>+1 555 123 4567</p>
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
            <p className={styles.copyright}>©2024 HostelHub.com. All rights Reserved.</p>
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