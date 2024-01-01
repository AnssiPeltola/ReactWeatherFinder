import React from "react";

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return <p>No weather data available</p>;

  return (
    <div>
      <h2>Weather for {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Feels like: {weatherData.main.feels_like}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind speed: {weatherData.wind.speed} km/h</p>
    </div>
  );
};

export default WeatherDisplay;
