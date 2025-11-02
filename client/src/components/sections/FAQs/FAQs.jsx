import React from 'react'
import  { useState } from 'react';

import styles from './FAQs.module.css'
import {  X, Plus } from 'lucide-react';


const FAQs = () => {
     const [currentSlide, setCurrentSlide] = useState(0);
      const [openFaq, setOpenFaq] = useState(1);

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

  return (
    <div>
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
    </div>
  )
}

export default FAQs
