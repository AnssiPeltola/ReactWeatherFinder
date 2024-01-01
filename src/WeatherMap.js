import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const WeatherMap = ({ latitude, longitude }) => {
  // Logging the latitude and longitude to the console
  // console.log(latitude, longitude);

  const containerStyle = {
    width: "300px",
    height: "300px",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        center={{ lat: latitude, lng: longitude }}
        zoom={8}
        containerStyle={containerStyle}
        mapContainerStyle={containerStyle}
      />
    </LoadScript>
  );
};

export default WeatherMap;
