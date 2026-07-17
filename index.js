console.log("javascript works")

const getWeather = document.getElementById("getWeather")
const inputCity = document.getElementById("inputCity")
const inputState = document.getElementById("inputState")
const inputCountry = document.getElementById("inputCountry")
const output = document.getElementById("output")
const unitOptions = document.getElementById("unitOptions")

const API_KEY = 'api_gitkey'
let units = ""
let displayUnits = ""
let speedUnits = ""


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

async function outputWeather() {

    const city = inputCity.value
    const state = inputState.value
    const country = inputCountry.value
    console.log(city + ", " + state + ", " + country)

    const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${API_KEY}`
    )

    console.log(geoResponse)

    const geoData = await geoResponse.json()

    console.log(geoData)

    const lat = geoData[0].lat
    const lon = geoData[0].lon

    console.log(lat)
    console.log(lon)


    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    )

    const weatherData = await weatherResponse.json()
    console.log(weatherData)

    output.innerText = `
        City: ${weatherData.name}
        Conditions: ${weatherData.weather[0].description} 
        Temperature: ${weatherData.main.temp}°${displayUnits}
        Feels Like: ${weatherData.main.feels_like}°${displayUnits}
        Wind Speed: ${weatherData.wind.speed} ${speedUnits}
    `


}

