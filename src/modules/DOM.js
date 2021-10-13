import pubsub from "./Pubsub";

const formFunction = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = form.cityNameInput;
    pubsub.publish("getCityName", cityName.value);
    form.reset();
  });
};

const renderMain = (weatherDataMain) => {
  document
    .querySelector(".weather-main")
    .append(JSON.stringify(weatherDataMain));
};

const renderDetails = (weatherDataDetails) => {
  document
    .querySelector(".weather-details")
    .append(JSON.stringify(weatherDataDetails));
};

const renderWeatherData = (weatherData) => {
  renderMain(weatherData.weatherMain);
  renderDetails(weatherData.weatherDetails);
};

const domModule = {
  execute: () => {
    formFunction();
    pubsub.subscribe("getWeatherData", renderWeatherData);
  },
};

export default domModule;
