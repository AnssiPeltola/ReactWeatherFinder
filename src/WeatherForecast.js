import React from "react";

// The WeatherForecast component takes forecast data and renders a weather forecast UI
const WeatherForecast = ({ forecastData }) => {
  return (
    <div className="forecast-container">
      {/* Mapping through each day's data in forecastData */}
      {forecastData.map((day) => (
        // Each forecast box represents a single day's forecast
        <div className="forecast-box" key={day.date}>
          {/* Displaying the date */}
          <p>Date: {day.date}</p>
          {/* Displaying the maximum temperature for the day */}
          <p>Max: {day.maxTemp}°C</p>
          {/* Displaying the minimum temperature for the day */}
          <p>Min: {day.minTemp}°C</p>
          {/* Additional weather details can be added here */}
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
