import React, { useEffect } from 'react';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ProductShowcase from './ProductShowcase';
import MapSection from './MapSection';
import ChatWidget from './ChatWidget';
import './ContactPage.css';
import { useLocation } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css'; // ✅ Include AOS styles

const ContactPage = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // ✅ Initialize AOS once
  }, []);

  useEffect(() => {
    AOS.refresh(); // ✅ Refresh on route change
  }, [location.pathname]);

  return (
    <div className="contact-page">
      <ContactHero />
      
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-lg-7" data-aos="fade-right">
            <ContactForm />
          </div>
          <div className="col-lg-5" data-aos="fade-left" data-aos-delay="200">
            <ContactInfo />
          </div>
        </div>
      </div>
      
      <div data-aos="fade-up">
        <ProductShowcase />
      </div>
      
      <div data-aos="zoom-in">
        <MapSection />
      </div>
      
      <ChatWidget />
    </div>
  );
};

export default ContactPage;
