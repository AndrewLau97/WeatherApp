import { useState } from "react";
import WeatherAnimation from "./WeatherAnimation";

const WeatherWeekCard = ({ dayData, showWeather, setShowWeather }) => {
  const [weatherCondition, setWeatherCondition] = useState("");
  const {
    time,
    apparent_temperature_max: tempFeelMax,
    apparent_temperature_min: tempFeelMin,
    precipitation_hours: precipiTime,
    precipitation_sum: precipiSum,
    rain_sum: rainSum,
    snowfall_sum: snowSum,
    temperature_2m_max: tempMax,
    temperature_2m_min: tempMin,
    weathercode,
    wind_direction_10m_dominant: windDirection,
    wind_gusts_10m_max: gustSpeed,
    wind_speed_10m_max: windSpeed,
  } = dayData;
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });
  const dayDataDate = new Date(time).toLocaleDateString("en-GB", {
    weekday: "long",
  });
  if (showWeather !== time) {
    return (
      <div
        onClick={() => {
          setShowWeather(time);
        }}
        className="hover:cursor-pointer hover:translate-y-1 border-1 hover:shadow-md transform-all duration-500 p-3 rounded-2xl text-center min-h-57 flex flex-col justify-between"
      >
        <div>
          <p className="text-2xl">
            {dayDataDate === today ? "Today" : dayDataDate}
          </p>
          <p>{time.split("-").slice(1).join("/")}</p>
          <p className="text-xl">{weatherCondition}</p>
        </div>
        <div>
          <div className="w-10 h-10 mx-auto">
            <WeatherAnimation
              code={weathercode}
              setWeatherCondition={setWeatherCondition}
            />
          </div>
          <div className="flex justify-around w-1/2 mx-auto">
            <p>H: {tempMax}°</p>
            <p>L: {tempMin}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="border-1 p-3 rounded-2xl hover:cursor-pointer" onClick={()=>{setShowWeather("")}}>
        <div className="flex gap-2">
          <p className="text-3xl">
            {dayDataDate === today ? "Today" : dayDataDate}{" "}
          </p>
          <p className="my-auto">{time.split("-").slice(1).join("/")}</p>
        </div>
        <p className="text-2xl">{weatherCondition}</p>
        <div className="flex">
          <div className="w-30 h-30">
            <WeatherAnimation
              code={weathercode}
              setWeatherCondition={setWeatherCondition}
            />
          </div>
          <div className="flex flex-col justify-evenly">
            <p>H: {tempMax}°</p>
            <p>L: {tempMin}</p>
          </div>
        </div>
        <p>
          Where it feels like a high of {tempFeelMax}° and a low of{" "}
          {tempFeelMin}°
        </p>
        <p>
          {precipiTime} Hours {precipiSum}mm
        </p>
        <p>wind:{windSpeed} km/h</p>
        <p>gust:{gustSpeed} km/h</p>
      </div>
    );
  }
  // return (
  //   <>
  //     <div
  //       onClick={() => {
  //         setShowWeather(time);
  //       }}
  //     >
  //       Click here for weather information
  //     </div>
  //     {showWeather === time && <div>Weather Information</div>}

  <div className="border-1 w-1/4 mx-auto">
    <p className="text-3xl">{dayDataDate === today ? "Today" : dayDataDate}</p>
    <p>{time.split("-").slice(1).join("/")}</p>
    <p className="text-2xl">{weatherCondition}</p>
    <div className="flex">
      <div className="w-30 h-30">
        <WeatherAnimation
          code={weathercode}
          setWeatherCondition={setWeatherCondition}
        />
      </div>
      <div>
        <p>H: {tempMax}°</p>
        <p>L: {tempMin}</p>
      </div>
    </div>
    <p>
      Where it feels like a high of {tempFeelMax}° and a low of {tempFeelMin}°
    </p>
    <p>
      {precipiTime} Hours {precipiSum}mm
    </p>
    <p>
      wind:{windSpeed} km/h gust:{gustSpeed} km/h
    </p>
  </div>;
  //   </>
  // );
};

export default WeatherWeekCard;
