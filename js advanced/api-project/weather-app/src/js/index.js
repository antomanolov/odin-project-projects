import "../css/weather-app.css";

const cityName = document.querySelector(".city-name");
const weatherIcon = document.querySelector(".main-weather-img");
const weatherType = document.querySelector(".weather-type");
const curretnTime = document.querySelector(".current-time");
const realTemp = document.querySelector(".real-temp");
const feelsLike = document.querySelector(".feels-like");
const windSpeed = document.querySelector(".wind-speed");
const himidity = document.querySelector(".humidity");

async function getWeather(city) {
    try {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=9121f056114546a5bb6120702240401&q=${city}&days=3&aqi=no&alerts=no`;
        const response = await fetch(url);
        const info = await response.json();

        if (response.status !== 200) {
            throw Error(`Request failed with status: ${response.status}`);
        }
        cityName.textContent = info.location.name;
        weatherType.textContent = info.current.condition.text;
        curretnTime.textContent = `Current time: ${info.location.localtime.split(' ')[1]}`
        makeIcon(info.current.condition.icon, weatherIcon);
    } catch (error) {
        console.log("kur");
    }
}

function makeIcon(url, img) {
    const iconUrl = url.split("/").slice(-2);
    const newIconUrl = iconUrl.join("/");
    img.src = `../img/icons/${newIconUrl}`;
}



getWeather("Zanzibar");
