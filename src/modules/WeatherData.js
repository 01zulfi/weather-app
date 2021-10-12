import pubsub from "./Pubsub";

const getWeatherData = async (cityName) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=449b05371154016e4225fe1f885a634e`,
  );
  const weatherData = await response.json();
  console.log(weatherData);
};

const weatherDataModule = {
  execute: () => {
    pubsub.subscribe("getCityName", getWeatherData);
  },
};

export default weatherDataModule;
