import { useState } from "react";
import WeatherAnimation from "./WeatherAnimation";

const WeatherHourlyCard = ({ hourData, currentHour }) => {
    // const [description, setDescription]=useState("")
  const {
    time,
    temperature,
    apparentTemperature,
    precipitation,
    precipitationProbability,
    humidity,
    weatherCode,
  } = hourData;
  const hour = time.split("T")[1].split(":")[0];

  return (
    <>
      <div className={`text-center mx-2 border-1 py-5 rounded-3xl flex flex-col`}>
          <div>
            <p className="text-3xl">{currentHour===hour?"Now":hour}</p>
            {/* <p className="text-lg">{description}</p> */}
          </div>
          <div>
            <div className="w-1/2 mx-auto">
                <WeatherAnimation code={weatherCode}/>
            </div>
            <p className="text-2xl">{temperature}° </p>
          </div>
        </div>
    </>
  );
};

export default WeatherHourlyCard;
