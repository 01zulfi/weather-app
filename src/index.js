async function getWeatherData(cityName) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=449b05371154016e4225fe1f885a634e`,
    );
    const weatherData = await response.json();
    console.log(weatherData);
  } catch (err) {
    console.log(err);
  }
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData(document.getElementById("cityNameInput").value);
});
