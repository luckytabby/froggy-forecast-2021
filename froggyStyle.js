function displayWeather(response) {
    let locationToUser = document.querySelector("#currentLocation");
    locationToUser.innerHTML = response.data.name;

    let weatherDescriptionToUser = document.querySelector("#weatherDescription");
    weatherDescriptionToUser.innerHTML = response.data.weather[0].description;
    
    let tempToUser = document.querySelector("#currentTemp");
    tempToUser.innerHTML = Math.round(response.data.main.feels_like);

    let humidityToUser = document.querySelector("#humidity");
    humidityToUser.innerHTML = Math.round(response.data.main.humidity);

    let windSpeedToUser = document.querySelector("#windSpeed");
    windSpeedToUser.innerHTML = Math.round(response.data.main.wind.speed);

}

let apiKey = "3fdbb0c1f67069bd33e76ea8a1295d83";
let cityName = "Morgantown";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

console.log(apiUrl);

axios.get(apiUrl).then(displayWeather);