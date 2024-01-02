import React from "react";
import "./WeatherDisplay.css";

const WeatherDisplay = ({ weatherData, searchedCity }) => {
  if (!weatherData) return <p>No weather data available</p>;

  return (
    <div className="weather-display">
      <h2>Weather for {searchedCity}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Feels like: {weatherData.main.feels_like}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind speed: {weatherData.wind.speed} km/h</p>
    </div>
  );
};

export default WeatherDisplay;
