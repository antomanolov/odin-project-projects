import "../css/weather-app.css";

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const cityName = document.querySelector(".city-name");
const weatherType = document.querySelector(".weather-type");
const curretnTime = document.querySelector(".current-time");
const realTemp = document.querySelector(".real-temp");
const feelsLike = document.querySelector(".feels-like");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const forecastContainer = document.querySelector(".forecast-container");
const mainWeatherImg = document.querySelector(".main-weather-img");
const mainDay = document.querySelector(".main-day");
const errorMsg = document.querySelector(".error");
const visibleDiv = document.querySelector(".visible");
const searchForm = document.querySelector(".search-bar");
const inputField = document.querySelector("input");

async function getWeather(city) {
    try {
        errorMsg.innerHTML = "";
        visibleDiv.style.display = "block";
        const url = `http://api.weatherapi.com/v1/forecast.json?key=9121f056114546a5bb6120702240401&q=${city}&days=3&aqi=no&alerts=no`;
        const response = await fetch(url);
        const info = await response.json();

        if (response.status !== 200) {
            throw Error(`Request failed with status: ${response.status}`);
        }
        const currentDay = new Date(info.location.localtime.split(" ")[0]);
        mainDay.textContent = days[currentDay.getDay()];
        cityName.textContent = info.location.name;
        weatherType.textContent = info.current.condition.text;
        curretnTime.textContent = `Current time: ${
            info.location.localtime.split(" ")[1]
        }`;
        realTemp.textContent = `Real temperature: ${info.current.temp_c}\u00B0C`;
        feelsLike.textContent = `Feels like: ${info.current.feelslike_c}\u00B0C`;
        windSpeed.textContent = `Wind speed: ${info.current.wind_kph} km/h`;
        humidity.textContent = `Humidity: ${info.current.humidity}%`;
        mainWeatherImg.src = makeIcon(info.current.condition.icon);
        makeForecast(info.forecast.forecastday);
    } catch (error) {
        if (city) {
            errorMsg.innerHTML = "*Please enter valid city name";
        }
        visibleDiv.style.display = "none";
    }
}

function makeIcon(url) {
    const iconUrl = url.split("/").slice(-2);
    const newIconUrl = iconUrl.join("/");
    const src = `../img/icons/${newIconUrl}`;
    return src;
}

function makeForecast(forecastInfo) {
    forecastContainer.innerHTML = "";
    forecastInfo.forEach((day) => {
        const forecastDiv = document.createElement("div");
        const weatherIconDiv = document.createElement("div");
        const minMaxTempDiv = document.createElement("div");
        const dateP = document.createElement("p");
        // first must to get the actual date then we can get the day of the week
        const date = new Date(day.date);
        const moonPhase = document.createElement("p");
        const weatherTypeP = document.createElement("p");
        const minTemp = document.createElement("p");
        const maxTemp = document.createElement("p");
        const img = document.createElement("img");
        dateP.className = "day-of-the-week";
        dateP.textContent = days[date.getDay()];
        moonPhase.textContent = `Moon phase: ${day.astro.moon_phase}`;
        weatherTypeP.textContent = day.day.condition.text;
        img.src = makeIcon(day.day.condition.icon);
        minTemp.textContent = `Min temperature: ${day.day.mintemp_c}\u00B0C`;
        maxTemp.textContent = `Max temperature: ${day.day.maxtemp_c}\u00B0C`;
        weatherIconDiv.className = "weather-icon";
        weatherIconDiv.appendChild(weatherTypeP);
        weatherIconDiv.appendChild(img);
        minMaxTempDiv.appendChild(minTemp);
        minMaxTempDiv.appendChild(maxTemp);

        forecastDiv.appendChild(dateP);
        forecastDiv.appendChild(moonPhase);
        forecastDiv.appendChild(weatherIconDiv);
        forecastDiv.appendChild(minMaxTempDiv);
        forecastContainer.appendChild(forecastDiv);
    });
}

searchForm.addEventListener("input", (e) => {
    e.preventDefault();
    getWeather(inputField.value);
});
