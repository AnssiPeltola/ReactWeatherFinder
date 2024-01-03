import React, { useState } from "react";
import Header from "./Header"; // Importing the Header component
import WeatherDisplay from "./WeatherDisplay";
import WeatherMap from "./WeatherMap";
import WeatherForecast from "./WeatherForecast";
import { processForecastData } from "./forecastProcessor";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState(""); // Creating a state variable to store the search input
  const [weatherData, setWeatherData] = useState(null); // Creating a state variable to store the weather data
  const [lat, setLat] = useState(null); // Creating a state variable to store the latitude
  const [lon, setLon] = useState(null); // Creating a state variable to store the longitude
  const [forecastData, setForecastData] = useState([]); // Creating a state variable to store the forecast data
  const [searchedCity, setSearchedCity] = useState(""); // Creating a state variable to store the searched city

  // Creating a function to handle the search input change
  function handleInputChange(event) {
    // Updating the search input state variable
    setSearchInput(event.target.value);
  }

  // Creating a function to fetch the coordinates of a location
  function fetchCoordinates(city) {
    const GEOCODING_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${GEOCODING_API_KEY}`;

    return fetch(GEOCODING_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok for geocoding");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          // Reset weather and forecast data if no location is found
          setWeatherData(null);
          setForecastData([]);
          throw new Error("No location found");
        }
        return {
          lat: data[0].lat,
          lon: data[0].lon,
        };
      });
  }

  // Creating a function to handle the search form submission
  function handleSearchSubmit(event) {
    event.preventDefault();
    // Update searchedCity when form is submitted
    setSearchedCity(searchInput);

    // Fetching the coordinates of the location
    fetchCoordinates(searchInput)
      .then(({ lat, lon }) => {
        setLat(lat); // set state, but don't use it immediately
        setLon(lon); // set state, but don't use it immediately

        // Creating the API URLs
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const API_FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        // Fetch the weather data
        return (
          fetch(API_WEATHER_URL)
            .then((response) => {
              if (!response.ok)
                throw new Error("Network response was not ok for weather data");
              return response.json();
            })
            // Then process the weather data
            .then((data) => {
              setWeatherData(data);
              // Then fetch the forecast data
              return fetch(API_FORECAST_URL);
            })
        );
      })
      // Then process the forecast data
      .then((response) => response.json())
      .then((forecast) => {
        const processedData = processForecastData(forecast.list);
        setForecastData(processedData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  return (
    <div className="app-wrapper">
      <Header
        searchInput={searchInput}
        onInputChange={handleInputChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <WeatherDisplay weatherData={weatherData} searchedCity={searchedCity} />
      {lat && lon && <WeatherMap latitude={lat} longitude={lon} />}
      {weatherData && (
        <div className="forecast-header">
          <h2>{searchedCity} 4 day forecast</h2>
        </div>
      )}
      {forecastData && forecastData.length > 0 && (
        <WeatherForecast forecastData={forecastData} />
      )}
    </div>
  );
}

export default App;
