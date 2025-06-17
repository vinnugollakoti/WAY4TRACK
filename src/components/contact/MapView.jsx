import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Mapview.css';            // keep your own styles

const containerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '8px',
};

const MapView = ({ position }) => {
  const [lat, lng] = position;     // [lat, lng] from props

  return (
    <div className="map-view-container">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }}
          zoom={14}
          options={{
            disableDefaultUI: true,       // hides controls, keeps it minimal
            gestureHandling: 'greedy',    // or 'cooperative' if you want
          }}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapView;
