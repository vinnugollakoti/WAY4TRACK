// Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loading-screen">
      {/* Radar Rings */}
      <motion.div
        className="ripple ripple1"
        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="ripple ripple2"
        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 0.9,
        }}
      />

      {/* Center GPS Dot */}
      <motion.div
        className="gps-dot"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 0px #60A442",
            "0 0 10px #60A442",
            "0 0 0px #60A442"
          ]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Loading Text */}
      <motion.p
        className="loading-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        We are setting up <strong>WAY4track</strong> for you...
      </motion.p>
    </div>
  );
};

export default Loader;
