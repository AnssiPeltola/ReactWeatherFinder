import React, { useState } from "react";
import Header from "./Header"; // Importing the Header component
import WeatherDisplay from "./WeatherDisplay";
import WeatherMap from "./WeatherMap";

function App() {
  const [searchInput, setSearchInput] = useState(""); // Creating a state variable to store the search input
  const [weatherData, setWeatherData] = useState(null); // Creating a state variable to store the weather data
  const [lat, setLat] = useState(null); // Creating a state variable to store the latitude
  const [lon, setLon] = useState(null); // Creating a state variable to store the longitude

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

    // Fetching the coordinates of the location
    fetchCoordinates(searchInput)
      .then(({ lat, lon }) => {
        setLat(lat);
        setLon(lon);

        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`; // If want Fahrenheit units, change units=metric to units=imperial
        return fetch(API_URL);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok for weather data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Logging the data to the consolewww
        setWeatherData(data); // Updating the weather data state variable
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  return (
    <div className="App">
      <Header
        searchInput={searchInput}
        onInputChange={handleInputChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <WeatherDisplay weatherData={weatherData} />
      {lat && lon && <WeatherMap latitude={lat} longitude={lon} />}
    </div>
  );
}

export default App;
