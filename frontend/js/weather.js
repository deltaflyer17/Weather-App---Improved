console.log("javascript works")

const getWeather = document.getElementById("getWeather")
const inputCity = document.getElementById("inputCity")
const inputState = document.getElementById("inputState")
const inputCountry = document.getElementById("inputCountry")
const unitOptions = document.getElementById("unitOptions")
const getMap = document.getElementById("getMap")
const cityName = document.getElementById("cityName");
const conditions = document.getElementById("conditions");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feels-like");
const winds = document.getElementById("winds");
const home = document.getElementById("home");
const humidity = document.getElementById("humidity");


let units = ""
let displayUnits = ""
let speedUnits = ""
let map

home.addEventListener("click", (e) => {
    window.location.href="/"
})

unitOptions.addEventListener("change", (e) => {
    const unitsSelection = e.target.value;
    if(unitsSelection === "fahrenheit"){
        units = "imperial"
        speedUnits = "mph"
        displayUnits = "F"
    } else {
        units = "metric"
        speedUnits = "m/s"
        displayUnits = "C"
    }
    console.log(unitsSelection);
})

getWeather.addEventListener("click", () => {
    outputWeather()

})

getMap.addEventListener("click", () => {
    map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoiZGVsdGFmbHllcjE3IiwiYSI6ImNtcnBscXBkaDAxM2QyeG9rc2t2Znp0eG8ifQ.kfBe_Fgly6ANs5ESglacBA',
        container: 'map',
        center: [-89.6170, 20.9754],
        zoom: 12
    });
})

async function outputWeather() {

    const city = inputCity.value
    const state = inputState.value
    const country = inputCountry.value


    const response = await fetch(
        `/api/weather?city=${city}&state=${state}&country=${country}&units=${units}`
    )

    const data = await response.json()
    console.log(data)


    cityName.innerText = `Location: ${data.city}`;
    conditions.innerText = `Conditions: ${data.conditions}`;
    temperature.innerText = `Current temperature: ${data.temperature}°${displayUnits}`;
    feelsLike.innerText = `Feels like ${data.feelsLike}°${displayUnits}`;
    winds.innerText = `Current winds: ${data.windSpeed} ${speedUnits} @ ${data.windDir}° gusting ${data.windGust} ${speedUnits}`;
    humidity.innerText = `Current humidity: ${data.humidity}`;

    // update map
    map.jumpTo({
        center: [data.lon, data.lat],
        zoom: 12
    });

    const ratings = calculateRunningRating(data, units)



}

