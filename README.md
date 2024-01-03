# Weather Finder App

## Description
Weather Finder is a responsive web application that allows users to search for weather information, including current weather, a 4-day forecast, and a Google Map view of the searched location. The app effectively manages data fetching and displays results clearly.

## Features
- Search for weather information by city name.
- Display current weather data including temperature, humidity, and wind speed.
- 4-day weather forecast with maximum and minimum temperatures.
- Integrated Google Maps to pinpoint the searched location.

## Technologies Used
- React
- [OpenWeather API](https://openweathermap.org/)
- [Google Maps API](https://developers.google.com/maps)

## Setup and Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory of the project.
4. Add your API keys to the `.env` file: 
```
   REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
*Replace `your_openweather_api_key` and `your_google_maps_api_key` with your actual API keys.*

5. Run the app using `npm start`.

![Weather Finder App Screenshot](https://github.com/AnssiPeltola/ReactWeatherFinder/blob/main/WeatherFinderApp.png)

## License
This project is licensed under the MIT License.
