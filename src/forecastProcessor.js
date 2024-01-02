import { format, parseISO, addDays } from "date-fns";

export function processForecastData(data) {
  const dailyData = {};
  const today = new Date();
  const endDate = format(addDays(today, 4), "dd.MM.yyyy"); // Set the end date to 4 days from today

  data.forEach((forecast) => {
    const date = format(parseISO(forecast.dt_txt), "dd.MM.yyyy");
    if (date !== format(today, "dd.MM.yyyy") && date <= endDate) {
      if (!dailyData[date]) {
        dailyData[date] = { temps: [], conditions: [] };
      }
      dailyData[date].temps.push(forecast.main.temp);
      dailyData[date].conditions.push(forecast.weather[0].main);
    }
  });

  return Object.entries(dailyData)
    .map(([date, info]) => {
      return {
        date,
        maxTemp: Math.max(...info.temps),
        minTemp: Math.min(...info.temps),
      };
    })
    .slice(0, 4); // Limit the array to the first 4 days
}
