if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
const cityHtml = document.getElementById('city')
const icon = document.getElementById('icon')
const tempF = document.getElementById('temp-f')
const localtime = document.getElementById('local-time')
const condition = document.getElementById('conditions')
const windSpeed = document.getElementById('wind-speed')

async function getData(city) {
    // fetch api
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=49e14a20272740269fe02834231606&q=${city}`, {mode: 'cors'});
    let weatherData = await response.json();
    if (getName(weatherData) == getRegion(weatherData)) {
        cityHtml.innerHTML = getName(weatherData) + ', ' + getCountry(weatherData)
    }
    else {
        cityHtml.innerHTML = getName(weatherData) + ', ' + getRegion(weatherData)
    }
    icon.src = 'https:' + weatherData.current.condition.icon
    tempF.innerHTML = getTempF(weatherData) + 'ºF'
    localtime.innerHTML = getLocalTime(weatherData)
    condition.innerHTML = getCondition(weatherData)
    windSpeed.innerHTML = getWindSpeed(weatherData) + 'mph'
}

// city country
function getCountry(weatherData) {
    return weatherData.location.country
}
// city name
function getName(weatherData) {
    return weatherData.location.name;
}
// city region
function getRegion(weatherData) {
    return weatherData.location.region
}
// city localtime
function getLocalTime(weatherData) {
    return weatherData.location.localtime
}
// city temp_f
function getTempF(weatherData) {
    return weatherData.current.temp_f
}
// city conditinon
function getCondition(weatherData) {
    return weatherData.current.condition.text
}
// city wind_mph
function getWindSpeed(weatherData) {
    return weatherData.current.wind_mph;
}

const inputBox = document.getElementById('city-input')
const searchBtn = document.getElementById('submit-btn')
// submit button
searchBtn.addEventListener("click", () => {
    getData(inputBox.value)
})

getData('Jonesboro')