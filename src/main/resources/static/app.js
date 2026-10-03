// View City Listener
const viewButton = document.getElementById("viewButton");
const citySelect = document.getElementById("citySelect");

viewButton.addEventListener("click", () => {
    const city = citySelect.value
    if (!city) return;
    getWeather(city)
});

async function getWeather(city) {
    // grab the coordinates
    const location_url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&countryCode=CA`;
    const location_url_response = await fetch(location_url);
    const location_data = await location_url_response.json();
    const coordinates = location_data.results[0];
    // get the weather
    const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`;
    const weather_url_response = await fetch(weather_url);
    const weather_data = await weather_url_response.json();

    renderWeather(city, weather_data.current);
}

function renderWeather(name, current){
    document.getElementById("weather").textContent = `
    City: ${name}
    Temperature: ${current.temperature_2m}°C
    Wind Speed: ${current.wind_speed_10m}km/h
    Humidity: ${current.relative_humidity_2m}%
    `;

}