import pubsub from "./Pubsub";

const getAPILink = (cityName, units) => {
  const APILink = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=449b05371154016e4225fe1f885a634e`;
  return APILink;
};

const getWeatherData = async (cityName) => {
  const [metricUnitsPromise, imperialUnitsPromise] = await Promise.all([
    fetch(getAPILink(cityName, "metric")),
    fetch(getAPILink(cityName, "imperial")),
  ]);
  const dataInMetricUnits = await metricUnitsPromise.json();
  const dataInImperialUnits = await imperialUnitsPromise.json();
  console.log(dataInMetricUnits, dataInImperialUnits);
};

const weatherDataModule = {
  execute: () => {
    pubsub.subscribe("getCityName", getWeatherData);
  },
};

export default weatherDataModule;
