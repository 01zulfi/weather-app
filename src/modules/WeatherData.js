import { fromUnixTime, format } from "date-fns";
import pubsub from "./Pubsub";

const sendEventForLoading = () => {
  pubsub.publish("loading");
};

const getAPILink = (cityName, units) => {
  const link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=449b05371154016e4225fe1f885a634e`;
  return link;
};

const extractRequiredData = (metric, imperial) => {
  const requiredData = {
    weatherMain: {
      main: metric.weather[0].main,
      iconId: metric.weather[0].icon,
      desc: metric.weather[0].description.toLowerCase(),
      temp: {
        metricUnits: Math.round(Number(metric.main.temp)),
        imperialUnits: Math.round(Number(imperial.main.temp)),
      },
      city: metric.name,
      country: metric.sys.country,
    },
    weatherDetails: {
      tempDetails: {
        metricUnits: {
          feelsLike: Math.round(Number(metric.main.feels_like)),
          tempMax: Math.round(Number(metric.main.temp_max)),
          tempMin: Math.round(Number(metric.main.temp_min)),
        },
        imperialUnits: {
          feelsLike: Math.round(Number(imperial.main.feels_like)),
          tempMax: Math.round(Number(imperial.main.temp_max)),
          tempMin: Math.round(Number(imperial.main.temp_min)),
        },
      },
      humidity: metric.main.humidity,
      windSpeed: {
        metricUnits: metric.wind.speed,
        imperialUnits: imperial.wind.speed,
      },
      cloudiness: metric.clouds.all,
      sunrise: format(fromUnixTime(metric.sys.sunrise), "HH:m:ss"),
      sunset: format(fromUnixTime(metric.sys.sunset), "HH:mm:ss"),
    },
  };
  pubsub.publish("getWeatherData", requiredData);
};

const checkForError = (dataObject) => {
  if (dataObject.cod === 200) return false;
  return true;
};

const handleError = (dataObject) => {
  console.clear();
  pubsub.publish("errorWhileFetching", dataObject.message);
};

const getWeatherData = async (cityName) => {
  sendEventForLoading();
  const [metricUnitsPromise, imperialUnitsPromise] = await Promise.all([
    fetch(getAPILink(cityName, "metric"), { mode: "cors" }),
    fetch(getAPILink(cityName, "imperial"), { mode: "cors" }),
  ]);
  const dataInMetricUnits = await metricUnitsPromise.json();
  const dataInImperialUnits = await imperialUnitsPromise.json();
  if (checkForError(dataInMetricUnits)) {
    handleError(dataInMetricUnits);
  } else {
    extractRequiredData(dataInMetricUnits, dataInImperialUnits);
  }
};

const weatherDataModule = {
  execute: () => {
    pubsub.subscribe("getCityName", getWeatherData);
  },
};

export default weatherDataModule;
