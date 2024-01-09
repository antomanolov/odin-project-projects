import "../css/weather-app.css";

const h1 = document.querySelector('h1')

async function getWeather(city) {
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=9121f056114546a5bb6120702240401&q=${city}&aqi=no`;
        const response = await fetch(url);
        const info = await response.json();
        
        

    } catch (error){
        alert('Please enter valid name')
    }
}

getWeather('london')