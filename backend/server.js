require("dotenv").config()

// gives app access to express, like importing a library
const express = require('express');

// create server
const app = express();
const API_KEY = process.env.OPENWEATHER_API_KEY

const cors = require("cors");

app.use(cors());

// creating a route
// when a GET request is sent to /, send this message
app.get("/", (req, res) => {
    res.send("Backend")
})

app.get("/test", (req, res) => {
    res.send("Test route")
})

app.get("/hello", (req, res) => {
    const name = req.query.name;

    res.json({
        message: `Hello ${name}`,
        time: new Date()
    });
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const state = req.query.state;
    const country = req.query.country;
    const units = req.query.units;

    const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${API_KEY}`
    )

    const geoData = await geoResponse.json()

    if(geoData.length > 0){
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


        const response = {
            city: weatherData.name,
            conditions: weatherData.weather[0].description,
            temperature: weatherData.main.temp,
            feelsLike: weatherData.main.feels_like,
            windSpeed: weatherData.wind.speed,
            windDir: weatherData.wind.deg,
            windGust: weatherData.wind.gust || "N/A",
            lat: lat,
            lon: lon
        }

        res.json(response)

    } else {
        output.innerText = `City not found. Please try again.`
    }

})


// listens to requests on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000");
})