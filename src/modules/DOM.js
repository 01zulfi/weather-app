import pubsub from "./Pubsub";
import sunIcon from "../icons/sun.svg";
import waterIcon from "../icons/water.svg";
import thermostatIcon from "../icons/thermostat.svg";
import cloudIcon from "../icons/cloud.svg";
import airIcon from "../icons/air.svg";

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

const renderFavicon = () => {
  const head = document.querySelector("head");
  const favicon = DOMFactory("link", {
    type: "image/png",
    rel: "icon",
    href: sunIcon,
  });
  head.append(favicon);
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

const clearError = () => {
  const errorMessageText = document.querySelector(".error-message");
  if (!errorMessageText) return;
  errorMessageText.remove();
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
  clearError();
  const errorMessageText = DOMFactory("p", {
    className: "error-message",
    textContent: errorMessage,
  });
  const formContainer = document.querySelector("form");
  formContainer.append(errorMessageText);
};

const renderBackgroundImage = (weatherMain) => {
  const body = document.querySelector("body");
  body.className = "";
  if (weatherMain.iconId.includes("04")) {
    body.classList.add("clouds-more");
    return;
  }
  if (weatherMain.iconId.includes("50")) {
    body.classList.add("atmosphere");
    return;
  }
  body.classList.add(weatherMain.main.toLowerCase());
};

const renderWeatherMainCard = (weatherDataMain) => {
  const renderWeatherMainObject = {
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
      this.cityAndCountryName = DOMFactory("h2", {
        textContent: `${weatherDataMain.city}, ${weatherDataMain.country}`,
      });
      this.changeUnitsButton = DOMFactory("button", {
        textContent: "F°",
        className: "change-units-button",
      });
      this.tempMainDiv = DOMFactory("div", {
        className: "temp-main-div",
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
        src: `https://openweathermap.org/img/wn/${weatherDataMain.iconId}@2x.png`,
      });
      this.mainAndDescDiv = DOMFactory("div", {
        className: "weather-main-and-desc",
      });
      this.weatherMainText = DOMFactory("p", {
        className: "weather-main-text",
        textContent: weatherDataMain.main,
      });
      this.weatherDescText = DOMFactory("p", {
        className: "weather-desc-text",
        textContent: weatherDataMain.desc,
      });
    },
    appendElements() {
      this.locationDiv.append(this.cityAndCountryName);
      this.tempMainDiv.append(
        this.tempMetricText,
        this.tempImperialText,
        this.changeUnitsButton,
      );
      this.mainAndDescDiv.append(this.weatherMainText, this.weatherDescText);
      this.weatherMainDiv.append(
        this.locationDiv,
        this.mainAndDescDiv,
        this.tempMainDiv,
        this.icon,
      );
    },
  };
  renderWeatherMainObject.init();
};

const renderWeatherDetailsCard = (weatherDataDetails) => {
  const renderWeatherDetailsObject = {
    init() {
      this.cacheDOM();
      this.createElements();
      this.appendElements();
    },
    cacheDOM() {
      this.weatherDetailsDiv = document.querySelector(".weather-details-card");
    },
    createElements() {
      this.tempDetailsDiv = DOMFactory("div");
      this.tempFeelsLikeMetricText = DOMFactory("p", {
        className: "units-changeable",
        textContent: `Feels Like: ${weatherDataDetails.tempDetails.metricUnits.feelsLike}° C`,
      });
      this.tempFeelsLikeImperialText = DOMFactory("p", {
        className: "units-changeable hidden",
        textContent: `Feels Like: ${weatherDataDetails.tempDetails.imperialUnits.feelsLike}° F`,
      });
      this.tempMaxMetricText = DOMFactory("p", {
        className: "units-changeable",
        textContent: `Max:  ${weatherDataDetails.tempDetails.metricUnits.tempMax}° C`,
      });
      this.thermostatIcon = DOMFactory("img", { src: thermostatIcon });
      this.tempMaxImperialText = DOMFactory("p", {
        className: "units-changeable hidden",
        textContent: `Max:  ${weatherDataDetails.tempDetails.imperialUnits.tempMax}° F`,
      });
      this.tempMinMetricText = DOMFactory("p", {
        className: "units-changeable",
        textContent: `Min:  ${weatherDataDetails.tempDetails.metricUnits.tempMin}° C`,
      });
      this.tempMinImperialText = DOMFactory("p", {
        className: "units-changeable hidden",
        textContent: `Min:  ${weatherDataDetails.tempDetails.imperialUnits.tempMin}° F`,
      });
      this.cloudinessDiv = DOMFactory("div");
      this.cloudinessText = DOMFactory("div", {
        textContent: `Cloudiness: ${weatherDataDetails.cloudiness}%`,
      });
      this.cloudIcon = DOMFactory("img", { src: cloudIcon });
      this.humidityDiv = DOMFactory("div");
      this.humidityText = DOMFactory("div", {
        textContent: `Humidity: ${weatherDataDetails.humidity}%`,
      });
      this.humidityIcon = DOMFactory("img", { src: waterIcon });
      this.windSpeedDiv = DOMFactory("div");
      this.windIcon = DOMFactory("img", { src: airIcon });
      this.windSpeedMetricDiv = DOMFactory("div", {
        className: "units-changeable",
        textContent: `Wind Speed: ${weatherDataDetails.windSpeed.metricUnits} meter/second`,
      });
      this.windSpeedImperialDiv = DOMFactory("div", {
        className: "units-changeable hidden",
        textContent: `Wind Speed: ${weatherDataDetails.windSpeed.imperialUnits} miles/hour`,
      });
      this.sunriseSunsetDiv = DOMFactory("div");
      this.sunIcon = DOMFactory("img", { src: sunIcon });
      this.sunriseText = DOMFactory("p", {
        textContent: `Sunrise: ${weatherDataDetails.sunrise}`,
      });
      this.sunsetText = DOMFactory("p", {
        textContent: `Sunset: ${weatherDataDetails.sunset}`,
      });
    },
    appendElements() {
      this.tempDetailsDiv.append(
        this.thermostatIcon,
        this.tempFeelsLikeMetricText,
        this.tempFeelsLikeImperialText,
        this.tempMaxMetricText,
        this.tempMaxImperialText,
        this.tempMinMetricText,
        this.tempMinImperialText,
      );
      this.cloudinessDiv.append(this.cloudIcon, this.cloudinessText);
      this.humidityDiv.append(this.humidityIcon, this.humidityText);
      this.windSpeedDiv.append(
        this.windIcon,
        this.windSpeedMetricDiv,
        this.windSpeedImperialDiv,
      );
      this.sunriseSunsetDiv.append(
        this.sunIcon,
        this.sunriseText,
        this.sunsetText,
      );
      this.weatherDetailsDiv.append(
        this.tempDetailsDiv,
        this.cloudinessDiv,
        this.humidityDiv,
        this.windSpeedDiv,
        this.sunriseSunsetDiv,
      );
    },
  };
  renderWeatherDetailsObject.init();
};

const changeUnitsButtonTextContent = (changeUnitsButton) => {
  const { textContent } = changeUnitsButton;
  const button = changeUnitsButton;
  if (textContent === "F°") {
    button.textContent = "C°";
    return;
  }
  button.textContent = "F°";
};

const changeUnits = () => {
  const changeUnitsButton = document.querySelector(".change-units-button");
  const unitsChangeableElements =
    document.querySelectorAll(".units-changeable");
  changeUnitsButton.addEventListener("click", () => {
    changeUnitsButtonTextContent(changeUnitsButton);
    unitsChangeableElements.forEach((el) => el.classList.toggle("hidden"));
  });
};

const renderWeatherData = (weatherData) => {
  clearError();
  clearWeatherData();
  renderBackgroundImage(weatherData.weatherMain);
  renderWeatherMainCard(weatherData.weatherMain);
  renderWeatherDetailsCard(weatherData.weatherDetails);
  changeUnits();
};

const domModule = {
  execute: () => {
    handleForm();
    renderFavicon();
    pubsub.subscribe("loading", renderLoadingComponent);
    pubsub.subscribe("errorWhileFetching", renderError);
    pubsub.subscribe("getWeatherData", renderWeatherData);
  },
};

export default domModule;
