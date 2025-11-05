import { useState } from "react";
import {
  getWeather,
  getWeatherWeek,
  getLocation,
  getWeatherHourly,
} from "../api";
import Lottie from "lottie-react";
// import mist from "../assets/Animation/Weather-mist.json";
// import cloudy from "../assets/Animation/Weather-partly cloudy.json";
// import shower from "../assets/Animation/Weather-partly shower.json";
// import snow from "../assets/Animation/Weather-snow.json";
// import storm from "../assets/Animation/Weather-storm.json";
// import sunny from "../assets/Animation/Weather-sunny.json";
// import windy from "../assets/Animation/Weather-windy.json";
import loading from "../assets/Animation/LoadingWeather.json";
import WeatherDay from "../Components/WeatherDay";
import WeatherWeek from "../Components/WeatherWeek";
import WeatherHourly from "../Components/WeatherHourly";
// import locations from "../Data/Locations";

const Weather = () => {
  const [searching, setSearching] = useState(false);
  const [location, setLocation] = useState("");
  const [shownLocation, setShownLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDataHourly, setWeatherDataHourly] = useState(null);
  const [weatherWeekData, setWeatherWeekData] = useState(null);
  const [wrongLocation, setWrongLocation] = useState(false);
  const [tempUnit, setTempUnit] = useState("");
  const date = new Date().toISOString().split("T")[0];

  async function searchWeather(search) {
    if (!search.trim()) {
      return;
    }
    setSearching(true);
    await getLocation(search).then((searchLocation) => {
      if (searchLocation.results) {
        setShownLocation(location);
        setWrongLocation(false);
        const { longitude, latitude } = searchLocation.results[0];
        getWeather(longitude, latitude)
          .then((weatherData) => {
            setWeatherData(weatherData);
          })
          .then(() => {
            setSearching(false);
          });
        getWeatherWeek(longitude, latitude).then((weatherData) => {
          setWeatherWeekData(weatherData);
        });
        getWeatherHourly(longitude, latitude, date).then((weatherData) => {
          setWeatherDataHourly(weatherData);
        });
      } else {
        setWrongLocation(true);
      }
    });
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchWeather(location);
    }
    if (e.key === "Delete") {
      e.preventDefault();
      setLocation("");
    }
  }

  return (
    <>
      <div className="h-screen font-georgia p-3">
        <div className="bg-gray-400 flex w-fit px-2 rounded-3xl mx-auto">
          <input
            type="text"
            placeholder="Location"
            required
            className="p-1 text-charcoal rounded-xs text-black"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            onKeyDown={handleKeyPress}
          ></input>
          <button
            onClick={() => {
              searchWeather(location);
            }}
            className="hover:cursor-pointer"
          >
            🔍
          </button>
          <button
            onClick={() => {
              setLocation("");
            }}
            className="hover:cursor-pointer"
          >
            ❌
          </button>
        </div>
        {weatherData && !searching && (
          <WeatherDay
            weatherData={weatherData}
            shownLocation={shownLocation}
            tempUnit={tempUnit}
            setTempUnit={setTempUnit}
          />
        )}
        {weatherDataHourly && !searching && (
          <WeatherHourly weatherDataHourly={weatherDataHourly} timezone={weatherData.timezone} tempUnit={tempUnit}/>
        )}
        {weatherWeekData && !searching && (
          <WeatherWeek weatherWeekData={weatherWeekData} tempUnit={tempUnit} />
        )}
        {searching && !wrongLocation && (
          <Lottie animationData={loading} className="h-100 w-100 mx-auto" />
        )}
        {wrongLocation && (
          <p className="text-red-500 text-lg text-center m-5">Unable to find location</p>
        )}
        {/* {searching&&<Lottie animationData={loading} className="h-100 w-100"/>}
        {search ? (
          <div>
            <Lottie
              animationData={
                WeatherCode[weatherData.current_weather.weathercode].lottie
              }
              className="h-100 w-100"
            />
          </div>
        ) : (
          ""
        )}
        {search ? (
          <h1>{WeatherCode[weatherData.current_weather.weathercode].text}</h1>
        ) : (
          ""
        )}
        {wrongLocation && (
          <p className="text-red-500 text-lg">Unable to find location</p>
        )}
        <input
          type="text"
          placeholder="Location"
          required
          className="w-full p-1 mt-1 bg-gray-300 text-charcoal rounded-xs text-black"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            searchWeather(location);
          }}
          className="hover:cursor-pointer"
        >
          Search
        </button>
        {weatherData && (
          <div>
            <p>
              {weatherData.current_weather.temperature}
              {weatherData.current_weather_units.temperature}
            </p>
            <p>
              {weatherData.current_weather.windspeed}
              {weatherData.current_weather_units.windspeed}
            </p>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Weather;
