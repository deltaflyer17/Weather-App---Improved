console.log("javascript works")

const getWeather = document.getElementById("getWeather")
const inputCity = document.getElementById("inputCity")
const inputState = document.getElementById("inputState")
const inputCountry = document.getElementById("inputCountry")
const output = document.getElementById("output")
const unitOptions = document.getElementById("unitOptions")
const getMap = document.getElementById("getMap")


let units = ""
let displayUnits = ""
let speedUnits = ""
let map


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
        `http://localhost:3000/weather?city=${city}&state=${state}&country=${country}&units=${units}`
    )

    const data = await response.json()
    console.log(data)


    output.innerText = `
        City: ${data.city}
        Conditions: ${data.conditions}
        Temperature: ${data.temperature}°${displayUnits}
        Feels Like: ${data.feelsLike}°${displayUnits}
        Wind Speed: ${data.windSpeed} ${speedUnits} @ ${data.windSpeed}° gusting ${data.windGust} ${speedUnits}
    `

    // 'map' is your already instantiated map object
    map.jumpTo({
        center: [data.lon, data.lat],
        zoom: 12
    });


}

