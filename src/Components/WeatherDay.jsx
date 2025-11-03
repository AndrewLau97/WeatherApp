// import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import WeatherAnimation from "./WeatherAnimation";
import { changeToFDegree, roundOneDecimal } from "../Utils/temperatureFn";

const WeatherDay = ({ weatherData, shownLocation, tempUnit, setTempUnit }) => {
  useEffect(() => {
    setTempUnit(weatherData.current_weather_units.temperature);
    setTemperature(weatherData.current_weather.temperature);
  }, []);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [temperature, setTemperature] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const locationName = shownLocation
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");

  function changeTempUnit(wantedUnit) {
    if (wantedUnit !== tempUnit) {
      if (wantedUnit === "°C") {
        setTempUnit("°C");
        setTemperature(roundOneDecimal((temperature - 32) * (5 / 9)));
      } else {
        setTempUnit("°F");
        setTemperature(roundOneDecimal(temperature * 1.8 + 32));
      }
    }
  }

  function checkWindDirection(deg) {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  }
  useEffect(() => {
    setWindDirection(
      checkWindDirection(
        (weatherData.current_weather.winddirection + 180) % 360
      )
    );
  }, []);

  return (
    <>
      <div className="w-full">
        <div>
          <h1 className="flex justify-center text-3xl">{locationName}</h1>
        </div>
        <div className="flex justify-center">
          <div className="h-50 w-50">
            <WeatherAnimation
              code={weatherData.current_weather.weathercode}
              setWeatherCondition={setWeatherCondition}
            />
          </div>
          <div className="my-auto">
            <p className="text-9xl font-merriweather">{temperature}°</p>
          </div>
          <div
            className={`flex  ${
              tempUnit === "°C" ? "flex-col" : "flex-col-reverse justify-end"
            }`}
          >
            <button
              className={`${
                tempUnit === "°C" ? "text-9xl" : "text-5xl hover:cursor-pointer"
              } mr-auto`}
              onClick={() => {
                changeTempUnit("°C");
              }}
            >
              C
            </button>
            <button
              className={`${
                tempUnit === "°F" ? "text-9xl" : "text-5xl hover:cursor-pointer"
              } mr-auto`}
              onClick={() => {
                changeTempUnit("°F");
              }}
            >
              F
            </button>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl">{weatherCondition}</h1>
          <p>
            H:
            {changeToFDegree(weatherData.daily.temperature_2m_max[0],tempUnit)}
            ° L:
            {changeToFDegree(weatherData.daily.temperature_2m_min[0],tempUnit)}
            °
          </p>
        </div>
        {weatherData && (
          <div className="text-center flex justify-center pt-3">
            <div className=" h-50 w-50">
              <p className="text-xl">🌡️Feels Like</p>
              <p> H:{changeToFDegree(weatherData.daily.apparent_temperature_max[0],tempUnit)}°</p>
              <p>
                {" "}
                L:
                {changeToFDegree(weatherData.daily.apparent_temperature_min[0],tempUnit)}°
              </p>
            </div>
            <div className="flex w-50 h-50  flex-col">
              <div className="">
                <p>
                  Wind Speed: {weatherData.current_weather.windspeed}{" "}
                  {weatherData.current_weather_units.windspeed}
                </p>
                <p>
                  Gust: {weatherData.daily.wind_gusts_10m_max}{" "}
                  {weatherData.daily_units.wind_gusts_10m_max}
                </p>
                <p>WindDirection: {windDirection}</p>
              </div>
              <div className="relative flex justify-center items-center w-24 h-24 mx-auto">
                <img
                  src="/CompassBase.png"
                  className="text-6xl text-gray-500 opacity-80"
                />
                <img
                  src="/CompassArrow.png"
                  className="absolute text-red-500 text-xl"
                  style={{
                    transform: `rotate(${
                      (weatherData.current_weather.winddirection + 180) % 360
                    }deg)`,
                  }}
                />
              </div>
            </div>
            <div className=" w-50 h-50">
              <p>Precipitation</p>
              <p>{weatherData.daily.precipitation_sum[0]} mm Today</p>
              <p>
                {weatherData.daily.precipitation_probability_max[0]}% Chance
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherDay;
