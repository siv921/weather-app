function searchCity(city) {
  let apiKey = `d102f34aao5ce8t34e64ea7aab7a37d2`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateTemperature);
}
function SearchFormSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-city");
  searchCity(searchInputElement.value);
}

function updateTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#main-degrees-value");
  let cityElement = document.querySelector("#new-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let updateDay = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  let emojiElement = document.querySelector("#emoji");

  updateDay.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = temperature;
  emojiElement.innerHTML = `<img src=
"${response.data.condition.icon_url}" class="main-degrees-emoji"/>`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${currentDay} ${hours}:${minutes}, `;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div =class"weather-forecast-day"> <div class="weather-forecast-weekday"> ${day}</div> <div class="weather-forecast-emoji">☀️</div> <div class="weather-forecast-temperatures"> <span class ="forecast-bold">15°   </span>  9°</div></div>`;
  });

  forecastElement.innerHTML = forecastHtml;
}

let city = document.querySelector("#update-city");
city.addEventListener("submit", SearchFormSubmit);

searchCity("Lisbon");

displayForecast();
