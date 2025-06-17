import React from "react";
import "./MapSection.css";

const MapSection = () => {
  return (
    <div className="map-section">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="map-content" data-aos="fade-right">
              <h2 className="section-title">Visit Our Office</h2>
              <div className="divider mb-4"></div>
              <p className="mb-4">
                We're conveniently located in the heart of Visakhapatnam
                district. Stop by for a personalized demonstration of our
                vehicle tracking solutions.
              </p>

              <div className="location-details">
                <div className="location-item">
                  <strong>Address:</strong> SHARON TELEMATICS PT LTD | WAY4TRACK
                  FUEL MONITORING SYSTEM (GPS TRACKER) VISAKHAPATNAM 21-27,
                  Double road, Viman Nagar, Kakani Nagar
                </div>
                <div className="location-item">
                  <strong>Nearby:</strong> Airport Road, Visakhapatnam Station
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir//SHARON+TELEMATICS+PT+LTD+%7C+WAY4TRACK+FUEL+MONITORING+SYSTEM+%28GPS+TRACKER%29+VISAKHAPATNAM/@17.7358275,83.2239519,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-4"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="map-container shadow-lg"
              data-aos="fade-left"
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.185351501428!2d83.2239518741497!3d17.735827492675913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3968739c9d2643%3A0xbd513f2b2c5e9305!2sSHARON%20TELEMATICS%20PT%20LTD%20%7C%20WAY4TRACK%20FUEL%20MONITORING%20SYSTEM%20(GPS%20TRACKER)%20VISAKHAPATNAM!5e1!3m2!1ste!2sin!4v1747028729805!5m2!1ste!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
