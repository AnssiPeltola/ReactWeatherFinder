import { format, parseISO } from "date-fns";

// This function processes the raw forecast data from the API
export function processForecastData(data) {
  const dailyData = {}; // Object to store processed data, grouped by date
  const today = format(new Date(), "dd.MM.yyyy"); // Get today's date in dd.MM.yyyy format

  data.forEach((forecast) => {
    const date = format(parseISO(forecast.dt_txt), "dd.MM.yyyy"); // Format each forecast's date
    if (date !== today) {
      // Check if the forecast date is not today
      if (!dailyData[date]) {
        // If this date hasn't been added to dailyData, initialize it
        dailyData[date] = { temps: [], conditions: [] };
      }
      // Push temperature and weather condition into the respective arrays for this date
      dailyData[date].temps.push(forecast.main.temp);
      dailyData[date].conditions.push(forecast.weather[0].main);
    }
  });

  // Convert the dailyData object into an array and calculate max/min temperatures
  return Object.entries(dailyData).map(([date, info]) => {
    return {
      date,
      maxTemp: Math.max(...info.temps), // Calculate max temperature for the day
      minTemp: Math.min(...info.temps), // Calculate min temperature for the day
      // Additional processing for weather conditions can be added here
    };
  });
}
