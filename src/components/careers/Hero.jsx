import React, { useRef } from 'react';
import Navbar from '../New_Templates/Navbar';
import Footer from '../New_Templates/Footer';
import AddHiring from './AddHiring';

const Hero = () => {
  // Create a ref to the AddHiring component
  const addHiringRef = useRef(null);

  // Function to scroll to AddHiring when the image is clicked
  const scrollToAddHiring = () => {
    if (addHiringRef.current) {
      addHiringRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const backgroundImage = './images/career.jpeg';

  return (
    <>
      <Navbar />

      <div
        className="careers-image"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '80vh',
          cursor: 'pointer', // Optional: to indicate the image is clickable
        }}
        onClick={scrollToAddHiring} // Click event to scroll
      ></div>

      <div ref={addHiringRef}>
        <AddHiring />
      </div>
      <Footer />
    </>
  );
};

export default Hero;
