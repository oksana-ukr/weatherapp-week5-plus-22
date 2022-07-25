function formatDate(date) {
  let dayNames = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let numberDay = date.getDate();
  let currDay = days[dayNames];
  let currMonth = months[date.getMonth()];
  let currYear = date.getFullYear();
  let currHours = date.getHours();
  if (currHours <= 10) {
    currHours = `0${currHours}`;
  }
  let currMinutes = date.getMinutes();
  if (currMinutes <= 10) {
    currMinutes = `0${currMinutes}`;
  }

  return `${numberDay} ${currMonth} (${currDay} ), ${currYear} 🕰 ${currHours}: ${currMinutes}`;
}

let todayDate = new Date();
let currentTime = document.querySelector("#time");
currentTime.innerHTML = formatDate(todayDate);

function searchNamedOfCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#show-city");

  let newtypeCity = document.querySelector("#type-city");
  newtypeCity.innerHTML = `${inputCity.value}`;

  searchCity(inputCity.value);
}
let searchesF = document.querySelector("#search-form");
searchesF.addEventListener("click", searchNamedOfCity);

function searchCity(city) {
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "dde9b965cc7ffe04e803055c1a479def";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "dde9b965cc7ffe04e803055c1a479def";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let descriptionT = response.data.weather[0].main;
  let windS = Math.round(response.data.wind.speed);
  let humidityP = Math.round(response.data.main.humidity);
  let realFeels = Math.round(response.data.main.feels_like);
  let city = response.data.name;
  let country = response.data.sys.country;

  let geolocationC = document.querySelector("#type-city");
  geolocationC.innerHTML = `${city}, ${country}`;

  let h2 = document.querySelector("h2");
  h2.innerHTML = `Temperature at the moment is: ${temperature} °C. ${descriptionT} sky.`;

  let definitionS = document.querySelector(".feels");
  definitionS.innerHTML = `Real feels: ${realFeels} °C; Wind: ${windS} km/h; Precipitation: ${humidityP} %`;
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", getPosition);
