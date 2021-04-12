function displayTemperature(response) {
    console.log(response.data);
}

let apiKey = "3fdbb0c1f67069bd33e76ea8a1295d83";
let cityName = "Morgantown";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);