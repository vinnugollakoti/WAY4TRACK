import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapSection.css";

const MapSection = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Add Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    document.head.appendChild(link);

    // Set loaded state after a short delay to ensure CSS is applied
    setTimeout(() => {
      setMapLoaded(true);
    }, 500);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const position = [37.7749, -122.4194]; // San Francisco coordinates

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
                  Double road, Viman Nagar,kakani Nagar
                </div>
                <div className="location-item">
                  <strong>Nearby:</strong> Airport Road ,Visakhapatnam
                  station
                </div>
                {/* <div className="location-item">
                  <strong>Parking:</strong> Available in the building garage
                </div> */}
              </div>

              <button className="btn btn-primary mt-4">Get Directions</button>
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
