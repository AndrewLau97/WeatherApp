import { useState } from "react";
import { changeToFDegree } from "../Utils/temperatureFn";
import WeatherWeekCard from "./WeatherWeekCard";

const WeatherWeek = ({ weatherWeekData, tempUnit }) => {
  const [showWeather, setShowWeather] = useState("");
  const weekData = weatherWeekData.daily.time.map((time, index) => ({
    time,
    apparent_temperature_max: changeToFDegree(
      weatherWeekData.daily.apparent_temperature_max[index],
      tempUnit
    ),
    apparent_temperature_min: changeToFDegree(
      weatherWeekData.daily.apparent_temperature_min[index],
      tempUnit
    ),
    precipitation_hours: weatherWeekData.daily.precipitation_hours[index],
    precipitation_sum: weatherWeekData.daily.precipitation_sum[index],
    rain_sum: weatherWeekData.daily.rain_sum[index],
    snowfall_sum: weatherWeekData.daily.snowfall_sum[index],
    temperature_2m_max: changeToFDegree(
      weatherWeekData.daily.temperature_2m_max[index],
      tempUnit
    ),
    temperature_2m_min: changeToFDegree(
      weatherWeekData.daily.temperature_2m_min[index],
      tempUnit
    ),
    weathercode: weatherWeekData.daily.weathercode[index],
    wind_direction_10m_dominant:
      weatherWeekData.daily.wind_direction_10m_dominant[index],
    wind_gusts_10m_max: weatherWeekData.daily.wind_gusts_10m_max[index],
    wind_speed_10m_max: weatherWeekData.daily.wind_speed_10m_max[index],
  }));
  return (
    <>
      <div className="xl:w-full flex justify-center py-5 flex-col xl:flex-row gap-2 sm:w-1/2 mx-auto">
        {weekData.map((dayData, index) => {
          return (
            <div
              key={index}
              className={`${
                dayData.time === showWeather
                  ? "2xl:w-1/7 bg-blue2 xl:w-full"
                  : "2xl:w-1/9 bg-blue xl:w-full"
              } mx-2`}
            >
              <WeatherWeekCard
                dayData={dayData}
                showWeather={showWeather}
                setShowWeather={setShowWeather}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeatherWeek;
