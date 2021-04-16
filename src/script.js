function formatDate(timestamp) {

    let date = new Date(timestamp);

    let hours = date.getHours();
    
    if (hours < 10) {
        hours = `0${hours}`;
    };

    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`
    };

    let day = date.getDay();

      let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

  let formattedDay = days[(day)]

    return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {

    let date = new Date(timestamp * 1000);

    let day = date.getDay();

      let days = [
      "Sun",
      "Mon",
      "Tues",
      "Weds",
      "Thursday",
      "Fri",
      "Sat",
    ];

    let formattedDay = days[(day)];

    return formattedDay;

};

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector(".weekdayContainer");

    let forecastHTML = "";

    forecast.forEach(function(forecastDay, index) {

        if (index > 0 && index < 7) {

            forecastHTML = forecastHTML + `
            <div class="weekday">

                <p id="tomorrow">${formatDay(forecastDay.dt)}</p>
                <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="forecastIcon">
                <p><span id="tomorrowMinTemp">${
                    Math.round(forecastDay.temp.min)}</span>° 
                    / <span id="tomorrowMaxTemp">${Math.round(forecastDay.temp.max)}</span>°</p>

            </div>
    `;

    };
        
    });

    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "3fdbb0c1f67069bd33e76ea8a1295d83";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`
    
    axios.get(apiUrl).then(displayForecast);
};

function displayWeather(response) {
    let locationToUser = document.querySelector("#currentLocation");
    locationToUser.innerHTML = `  ${response.data.name}`;

    let weatherDescriptionToUser = document.querySelector("#weatherDescription");
    weatherDescriptionToUser.innerHTML = response.data.weather[0].description;

    celsiusTemperature = response.data.main.feels_like;
    
    let tempToUser = document.querySelector("#currentTemp");
    tempToUser.innerHTML = Math.round(celsiusTemperature);

    let humidityToUser = document.querySelector("#humidity");
    humidityToUser.innerHTML = Math.round(response.data.main.humidity);

    let windSpeedToUser = document.querySelector("#windSpeed");
    windSpeedToUser.innerHTML = Math.round(response.data.wind.speed);

    let dateAndTimeToUser = document.querySelector("#dayAndTime");
    dateAndTimeToUser.innerHTML = formatDate(response.data.dt * 1000);

    let weatherID = response.data.weather[0].id;

    let weatherIconID = response.data.weather[0].icon;

    let weatherIcon = document.querySelector("#weatherIcon");
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIconID}@2x.png`);

    if (weatherID === 800) {
        //** Summer froggy */
        let frogImage = document.querySelector("#frog");
        frogImage.setAttribute("src", `src/froggysummer.png`);
    }

    if (weatherID >= 801) {
        //** Standard froggy */
        let frogImage = document.querySelector("#frog");
        frogImage.setAttribute("src", `src/froggy.png`);
    }

    if (weatherID >= 700 && weatherID <= 781 ) {
        //** Froggy taking shelter */
    }

    if (weatherID >= 600 && weatherID <= 622) {
        //** Snow froggy */
        let frogImage = document.querySelector("#frog");
        frogImage.setAttribute("src", `src/froggywinter.png`);
    }

    if (weatherID >= 200 && weatherID <= 531) {
        //** Rain froggy */
        let frogImage = document.querySelector("#frog");
        frogImage.setAttribute("src", `src/froggyrain.png`);
    }

    getForecast(response.data.coord);
}

//** Search engine */

function search (city) {

let apiKey = "3fdbb0c1f67069bd33e76ea8a1295d83";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayWeather);

};

function handleSubmit(event) {
    event.preventDefault();
    let userLocation = document.querySelector("#userLocationInput");
    search(userLocation.value);
};

let searchForm = document.querySelector("#submitLocation");
searchForm.addEventListener("submit", handleSubmit);

//** Geolocation */

function geolocate(position) {

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "3fdbb0c1f67069bd33e76ea8a1295d83";
  let units = "imperial"; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
    
  axios.get(apiUrl).then(displayWeather);
}

function useNavigator(event) {

event.preventDefault();

navigator.geolocation.getCurrentPosition(geolocate);

};

let geolocateUser = document.querySelector("#geolocateUser");
geolocateUser.addEventListener("click", useNavigator);

//** Night mode */

function nightModeOn() {

    let body = document.querySelector("body");
    body.classList.add("nightModeOn");
    body.classList.remove("dayModeOn");

    let container = document.querySelector(".container");
    container.classList.add("nightModeOn");
    container.classList.remove("dayModeOn");

    let header = document.querySelector(".header");
    header.classList.add("nightModeOn");
    header.classList.remove("dayModeOn");

    let footer = document.querySelector("#footer");
    footer.classList.add("nightModeOn");
    footer.classList.remove("dayModeOn");

}

let nightModeButton = document.querySelector("#nightMode");
nightModeButton.addEventListener("click", nightModeOn)