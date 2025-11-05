import Lottie from "lottie-react";
import mist from "../assets/Animation/Weather-mist.json";
import cloudy from "../assets/Animation/Weather-partly cloudy.json";
import shower from "../assets/Animation/Weather-partly shower.json";
import snow from "../assets/Animation/Weather-snow.json";
import storm from "../assets/Animation/Weather-storm.json";
import sunny from "../assets/Animation/Weather-sunny.json";
import windy from "../assets/Animation/Weather-windy.json";
import { useEffect } from "react";

const WeatherAnimation = ({ code, setWeatherCondition }) => {
  const WeatherCode = {
    0: { text: "Clear sky", lottie: sunny },
    1: { text: "Mainly clear", lottie: cloudy },
    2: { text: "Partly cloudy", lottie: windy },
    3: { text: "Overcast", lottie: windy },
    45: { text: "Fog", lottie: mist },
    48: { text: "Depositing rime fog", lottie: shower },
    51: { text: "Light drizzle", lottie: shower },
    53: { text: "Moderate drizzle", lottie: shower },
    55: { text: "Dense drizzle", lottie: shower },
    56: { text: "Light freezing drizzle", lottie: shower },
    57: { text: "Freezing drizzle", lottie: snow },
    61: { text: "Slight rain", lottie: shower },
    63: { text: "Moderate rain", lottie: shower },
    65: { text: "Heavy rain", lottie: shower },
    66: { text: "Light freezing rain", lottie: shower },
    67: { text: "Heavy freezing rain", lottie: snow },
    71: { text: "Slight snow fall", lottie: snow },
    73: { text: "Moderate snow fall", lottie: snow },
    75: { text: "Heavy snow fall", lottie: snow },
    77: { text: "Snow grains", lottie: snow },
    80: { text: "Slight rain showers", lottie: shower },
    81: { text: "Moderate rain showers", lottie: shower },
    82: { text: "Violent rain showers", lottie: storm },
    85: { text: "Slight snow showers", lottie: snow },
    86: { text: "Heavy snow showers", lottie: snow },
    95: { text: "Thunderstorm", lottie: storm },
    96: { text: "Thunderstorm with slight hail", lottie: storm },
    99: { text: "Thunderstorm with heavy hail", lottie: storm },
  };
  useEffect(()=>{
    if(setWeatherCondition){
      setWeatherCondition(WeatherCode[code].text);
    }
  },[])
  return (
    <>
      <div>
        <Lottie
          animationData={WeatherCode[code].lottie}
          className="h-full w-full"
        />
      </div>
    </>
  );
};

export default WeatherAnimation;
