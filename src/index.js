let current = new Date();

function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

let date = document.querySelector("#date");
date.innerHTML = formatDate(current);

function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature-measure");
  temp.innerHTML = `${temperature}`;
  let narration = document.querySelector("#description");
  narration.innerHTML = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#temp-wind");
  wind.innerHTML = `${windSpeed}`;
  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#temp-humidity");
  humidity.innerHTML = `${humid}`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML =
    `${searchInput.value}`.charAt(0).toUpperCase() + searchInput.value.slice(1);
  let apiKey = "e97ae5d675e4c0ea5fe7521c6da29471";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let searchBox = document.querySelector("#city-search");
searchBox.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature-measure");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let narration = document.querySelector("#description");
  narration.innerHTML = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#temp-wind");
  wind.innerHTML = `${windSpeed}`;
  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#temp-humidity");
  humidity.innerHTML = `${humid}`;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e97ae5d675e4c0ea5fe7521c6da29471";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);
