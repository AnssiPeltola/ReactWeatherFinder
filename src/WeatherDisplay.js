import React from "react";
import "./WeatherDisplay.css";

const WeatherDisplay = ({ weatherData, searchedCity }) => {
  if (!searchedCity) return null;

  return (
    <div className="weather-display">
      {weatherData ? (
        <>
          <h2>Current weather for {searchedCity}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Feels like: {weatherData.main.feels_like}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind speed: {weatherData.wind.speed} km/h</p>
        </>
      ) : (
        <p>There is no weather data available for "{searchedCity}"</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
