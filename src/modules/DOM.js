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

const DOMFactory = (element, attributes) => {
  const newElement = document.createElement(element);
  for (const attribute in attributes) {
    if (!newElement[attribute]) {
      newElement[attribute] = attributes[attribute];
    }
  }
  return newElement;
};

const renderWeatherMainCard = (weatherDataMain) => {
  const renderMainObject = {
    init() {
      this.cacheDOM();
      this.createElements();
      this.appendElements();
      this.bindEvents();
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
    bindEvents() {
      this.changeUnitsButton.addEventListener("click", () => {
        document
          .querySelectorAll(".units-changeable")
          .forEach((item) => item.classList.toggle("hidden"));
      });
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
      this.tempFeelsLikeText = DOMFactory("p", {
        textContent: `Feels Like:${weatherDataDetails.tempDetails.metricUnits.feelsLike}° C`,
      });
      this.tempMaxText = DOMFactory("p", {
        textContent: `Max: ${weatherDataDetails.tempDetails.metricUnits.tempMax}° C`,
      });
      this.tempMinText = DOMFactory("p", {
        textContent: `Min:${weatherDataDetails.tempDetails.metricUnits.tempMin}° C`,
      });
      this.cloudinessDiv = DOMFactory("div", {
        textContent: `Cloudiness: ${weatherDataDetails.cloudiness}%`,
      });
      this.humidityDiv = DOMFactory("div", {
        textContent: `Humidity: ${weatherDataDetails.humidity}%`,
      });
      this.windSpeedDiv = DOMFactory("div", {
        textContent: `Wind Speed: ${weatherDataDetails.windSpeed.metricUnits} m/s`,
      });
    },
    appendElements() {
      this.tempDetailsDiv.append(
        this.tempFeelsLikeText,
        this.tempMaxText,
        this.tempMinText,
      );
      this.weatherDetailsDiv.append(
        this.tempDetailsDiv,
        this.cloudinessDiv,
        this.humidityDiv,
        this.windSpeedDiv,
      );
    },
  };
  renderDetailsObject.init();
};

const renderWeatherData = (weatherData) => {
  renderWeatherMainCard(weatherData.weatherMain);
  renderWeatherDetailsCard(weatherData.weatherDetails);
};

const domModule = {
  execute: () => {
    formFunction();
    pubsub.subscribe("getWeatherData", renderWeatherData);
  },
};

export default domModule;
