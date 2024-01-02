import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const WeatherMap = ({ latitude, longitude }) => {
  const containerStyle = {
    width: "400px",
    height: "200px",
  };

  const [zoom, setZoom] = useState(0); // Initial zoom level

  useEffect(() => {
    // Reset zoom level to 0 when latitude or longitude changes
    setZoom(0);
  }, [latitude, longitude]);

  useEffect(() => {
    const zoomInterval = setInterval(() => {
      // Increase zoom by 1 every 200ms
      setZoom((prevZoom) => prevZoom + 1);
    }, 200);

    // Stop increasing when zoom level is 12
    if (zoom >= 12) {
      clearInterval(zoomInterval);
    }

    // Clear interval on unmount
    return () => clearInterval(zoomInterval);
  }, [zoom]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        center={{ lat: latitude, lng: longitude }}
        zoom={zoom}
        containerStyle={containerStyle}
        mapContainerStyle={containerStyle}
      />
    </LoadScript>
  );
};

export default WeatherMap;
