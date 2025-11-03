import axios from "axios";

const api = axios.create({ baseURL: "https://api.open-meteo.com/v1/" });
const apiGeo = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1/",
});

function getWeatherHourly(longitude, latitude, date) {
  return api
    .get("forecast", {
      params: {
        latitude,
        longitude,
        hourly:
          "temperature_2m,apparent_temperature,precipitation,precipitation_probability,relative_humidity_2m,weathercode",
        start_date: date,
        end_date: date,
      },
    })
    .then(({ data }) => {
      return data;
    });
}

function getWeather(longitude, latitude) {
  return api
    .get("forecast", {
      params: {
        latitude,
        longitude,
        current_weather: true,
        timezone: "auto",
        daily:
          "temperature_2m_min,temperature_2m_max,apparent_temperature_min,apparent_temperature_max,precipitation_sum,precipitation_probability_max,wind_gusts_10m_max",
        forecast_days: 1,
      },
    })
    .then(({ data }) => {
      return data;
    });
}

function getWeatherWeek(longitude, latitude) {
  return api
    .get("forecast", {
      // params: {
      //   latitude,
      //   longitude,
      //   daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
      //   timezone: "auto",
      //   forecast_days: 7,
      // },
      params: {
        latitude,
        longitude,
        daily:
          "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant",
        timezone: "auto",
        forecast_days: 7,
      },
    })
    .then(({ data }) => {
      return data;
    });
}

function getLocation(name) {
  return apiGeo.get("search", { params: { name } }).then(({ data }) => {
    return data;
  });
}

export { getWeather, getWeatherWeek, getLocation, getWeatherHourly };
