import WeatherHourlyCard from "./WeatherHourlyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { changeToFDegree } from "../Utils/temperatureFn";

const WeatherHourly = ({ weatherDataHourly, timezone, tempUnit }) => {
  const hourlyData = weatherDataHourly.hourly.time.map((time, index) => ({
    time,
    temperature: changeToFDegree(
      weatherDataHourly.hourly.temperature_2m[index],
      tempUnit
    ),
    apparentTemperature: weatherDataHourly.hourly.apparent_temperature[index],
    precipitation: weatherDataHourly.hourly.precipitation[index],
    precipitationProbability:
      weatherDataHourly.hourly.precipitation_probability[index],
    humidity: weatherDataHourly.hourly.relative_humidity_2m[index],
    weatherCode: weatherDataHourly.hourly.weathercode[index],
  }));
  const currentTime = new Date().toLocaleString("en-GB", {
    timeZone: timezone,
  });
  const currentHour = currentTime.split(", ")[1].split(":")[0];
  return (
    <>
      <div className="">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            860: { slidesPerView: 5 },
            1100: { slidesPerView: 6 },
            1440: { slidesPerView: 7 },
          }}
          initialSlide={currentHour}
          navigation={true}
          modules={[Navigation]}
          className="w-7/8 gap-2"
        >
          {hourlyData.map((hourData, index) => {
            return (
              <SwiperSlide key={index}>
                <WeatherHourlyCard
                  hourData={hourData}
                  currentHour={currentHour}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default WeatherHourly;
