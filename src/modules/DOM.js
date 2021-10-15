import pubsub from "./Pubsub";

const preventDefaultFormBehavior = (event) => {
  event.preventDefault();
  event.target.reset();
};

const publishFormData = (form) => {
  const cityName = form.cityNameInput;
  pubsub.publish("getCityName", cityName.value);
};

const handleForm = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    publishFormData(form);
    preventDefaultFormBehavior(event);
  });
};

const DOMFactory = (element, attributes) => {
  const newElement = document.createElement(element);
  for (const attribute in attributes) {
    if (!newElement[attribute]) {
      newElement[attribute] = attributes[attribute];
    }
  }
  return newElement;
};

const createLoaderDiv = () => DOMFactory("div", { className: "loader" });

const createNoDataMessage = () => {
  const container = DOMFactory("p", {
    className: "no-data-message",
    textContent:
      "Nothing to show here... Enter your favorite city to get the weather",
  });
  return container;
};

const renderNoDataMessage = () => {
  const weatherMainCard = document.querySelector(".weather-main-card");
  const weatherDetailsCard = document.querySelector(".weather-details-card");
  weatherMainCard.append(createNoDataMessage());
  weatherDetailsCard.append(createNoDataMessage());
};

const clearNoDataMessage = () => {
  const noDataMessages = document.querySelectorAll(".no-data-messages");
  noDataMessages.forEach((message) => message.remove());
};

const clearError = () => {
  const errorMessageSpan = document.querySelector(".error-message");
  errorMessageSpan.textContent = "";
};

const clearWeatherMainCard = () => {
  const weatherMainCard = document.querySelector(".weather-main-card");
  while (weatherMainCard.firstChild) {
    weatherMainCard.lastChild.remove();
  }
};

const clearWeatherDetailsCard = () => {
  const weatherDetailsCard = document.querySelector(".weather-details-card");
  while (weatherDetailsCard.firstChild) {
    weatherDetailsCard.lastChild.remove();
  }
};

const clearWeatherData = () => {
  clearWeatherMainCard();
  clearWeatherDetailsCard();
};

const renderLoadingComponent = () => {
  clearWeatherData();
  const weatherMainCard = document.querySelector(".weather-main-card");
  const weatherDetailsCard = document.querySelector(".weather-details-card");
  weatherMainCard.append(createLoaderDiv());
  weatherDetailsCard.append(createLoaderDiv());
};

const renderError = (errorMessage) => {
  clearWeatherData();
  renderNoDataMessage();
  const errorMessageSpan = document.querySelector(".error-message");
  errorMessageSpan.textContent = errorMessage;
};

const renderWeatherMainCard = (weatherDataMain) => {
  const renderMainObject = {
    init() {
      this.cacheDOM();
      this.createElements();
      this.appendElements();
    },
    cacheDOM() {
      this.weatherMainDiv = document.querySelector(".weather-main-card");
    },
    createElements() {
      this.locationDiv = DOMFactory("div", { className: "location-div" });
      this.cityAndCountryName = DOMFactory("p", {
        textContent: `${weatherDataMain.city}, ${weatherDataMain.country}`,
      });
      this.changeUnitsButton = DOMFactory("button", {
        textContent: "Change Units",
        className: "change-units-button",
      });
      this.tempAndIconDiv = DOMFactory("div", {
        className: "temp-and-icon-div",
      });
      this.tempMetricText = DOMFactory("p", {
        className: "units-changeable",
        textContent: `${weatherDataMain.temp.metricUnits}° C`,
      });
      this.tempImperialText = DOMFactory("p", {
        className: "units-changeable hidden",
        textContent: `${weatherDataMain.temp.imperialUnits}° F`,
      });
      this.icon = DOMFactory("img", {
        src: `http://openweathermap.org/img/wn/${weatherDataMain.iconId}@2x.png`,
      });
      this.mainAndDescDiv = DOMFactory("div", {
        className: "weather-main-and-desc",
      });
      this.weatherMainText = DOMFactory("p", {
        textContent: weatherDataMain.main,
      });
      this.weatherDescText = DOMFactory("p", {
        textContent: weatherDataMain.desc,
      });
    },
    appendElements() {
      this.locationDiv.append(this.cityAndCountryName);
      this.tempAndIconDiv.append(
        this.tempMetricText,
        this.tempImperialText,
        this.icon,
      );
      this.mainAndDescDiv.append(this.weatherMainText, this.weatherDescText);
      this.weatherMainDiv.append(
        this.locationDiv,
        this.changeUnitsButton,
        this.tempAndIconDiv,
        this.mainAndDescDiv,
      );
    },
  };
  renderMainObject.init();
};

const renderWeatherDetailsCard = (weatherDataDetails) => {
  const renderDetailsObject = {
    init() {
      this.cacheDOM();
      this.createElements();
      this.appendElements();
    },
    cacheDOM() {
      this.weatherDetailsDiv = document.querySelector(".weather-details-card");
    },
    createElements() {
      this.tempDetailsDiv = DOMFactory("div", {
        className: "temp-details-div",
      });
      this.tempFeelsLikeMetricText = DOMFactory("p", {
        className: "units-changeable",
        textContent: `Feels Like:${weatherDataDetails.tempDetails.metricUnits.feelsLike}° C`,
      });
      this.tempFeelsLikeImperialText = DOMFactory("p", {
        className: "units-changeable hidden",
        textContent: `Feels Like:${weatherDataDetails.tempDetails.imperialUnits.feelsLike}° F`,
      });
      this.tempMaxMetricText = DOMFactory("p", {
        className: "units-changeable",
        textContent: `Max: ${weatherDataDetails.tempDetails.metricUnits.tempMax}° C`,
      });
      this.tempMaxImperialText = DOMFactory("p", {
        className: "units-changeable hidden",
        textContent: `Max: ${weatherDataDetails.tempDetails.imperialUnits.tempMax}° F`,
      });
      this.tempMinMetricText = DOMFactory("p", {
        className: "units-changeable",
        textContent: `Min:${weatherDataDetails.tempDetails.metricUnits.tempMin}° C`,
      });
      this.tempMinImperialText = DOMFactory("p", {
        className: "units-changeable hidden",
        textContent: `Min:${weatherDataDetails.tempDetails.imperialUnits.tempMin}° F`,
      });
      this.cloudinessDiv = DOMFactory("div", {
        textContent: `Cloudiness: ${weatherDataDetails.cloudiness}%`,
      });
      this.humidityDiv = DOMFactory("div", {
        textContent: `Humidity: ${weatherDataDetails.humidity}%`,
      });
      this.windSpeedMetricDiv = DOMFactory("div", {
        className: "units-changeable",
        textContent: `Wind Speed: ${weatherDataDetails.windSpeed.metricUnits} meter/second`,
      });
      this.windSpeedImperialDiv = DOMFactory("div", {
        className: "units-changeable hidden",
        textContent: `Wind Speed: ${weatherDataDetails.windSpeed.imperialUnits} miles/hour`,
      });
      this.sunriseSunsetDiv = DOMFactory("div", {
        className: "sunrise-sunset-div",
      });
      this.sunriseText = DOMFactory("p", {
        textContent: `Sunrise: ${weatherDataDetails.sunrise}`,
      });
      this.sunsetText = DOMFactory("p", {
        textContent: `Sunset: ${weatherDataDetails.sunset}`,
      });
    },
    appendElements() {
      this.tempDetailsDiv.append(
        this.tempFeelsLikeMetricText,
        this.tempFeelsLikeImperialText,
        this.tempMaxMetricText,
        this.tempMaxImperialText,
        this.tempMinMetricText,
        this.tempMinImperialText,
      );
      this.sunriseSunsetDiv.append(this.sunriseText, this.sunsetText);
      this.weatherDetailsDiv.append(
        this.tempDetailsDiv,
        this.cloudinessDiv,
        this.humidityDiv,
        this.windSpeedMetricDiv,
        this.windSpeedImperialDiv,
        this.sunriseSunsetDiv,
      );
    },
  };
  renderDetailsObject.init();
};

const changeUnits = () => {
  const changeUnitsButton = document.querySelector(".change-units-button");
  const unitsChangeableElements =
    document.querySelectorAll(".units-changeable");
  changeUnitsButton.addEventListener("click", () => {
    unitsChangeableElements.forEach((el) => el.classList.toggle("hidden"));
  });
};

const renderWeatherData = (weatherData) => {
  clearNoDataMessage();
  clearError();
  clearWeatherData();
  renderWeatherMainCard(weatherData.weatherMain);
  renderWeatherDetailsCard(weatherData.weatherDetails);
  changeUnits();
};

const domModule = {
  execute: () => {
    handleForm();
    pubsub.subscribe("loading", renderLoadingComponent);
    pubsub.subscribe("errorWhileFetching", renderError);
    pubsub.subscribe("getWeatherData", renderWeatherData);
  },
};

export default domModule;
