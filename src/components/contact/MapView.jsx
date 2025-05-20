import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Mapview.css';

const MapView = ({ position }) => {
  return (
    <div className="map-view-container">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: "200px", width: "100%", borderRadius: "8px" }}
      >
      <TileLayer
  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>

        <Marker position={position}>
          <Popup>
            This location is approximate
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;