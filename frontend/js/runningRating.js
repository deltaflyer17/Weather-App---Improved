
function calculateRunningRating(data, units){

    let temperature = data.temperature
    let fl = data.feelsLike
    let humidity = data.humidity
    let wind = data.windSpeed
    let temperatureRating
    let flRating
    let humidityRating
    let windRating
    let paceAdjustment
    let overallRating

    if(units === "metric"){
        temperature = (temperature * (9/5)) + 32
        fl = (fl * (9/5)) + 32
        paceAdjustment = temperature + humidity
        wind *= 2.237
    } else {
        paceAdjustment = humidity + temperature
    }

    if(temperature < 0){
        temperatureRating = 0
    } else if (temperature < 20){
        temperatureRating = 2
    } else if (temperature <= 32){
        temperatureRating = 4
    } else if (temperature < 45){
        temperatureRating = 7
    } else if (temperature < 60){
        temperatureRating = 10
    } else if (temperature < 75){
        temperatureRating = 7
    } else if (temperature < 90){
        temperatureRating = 5
    } else if (temperature < 95){
        temperatureRating = 3
    } else if (temperature <= 100){
        temperatureRating = 2
    } else {
        temperatureRating = 0
    }


    if(fl < -10){
        flRating = 0
    } else if (fl < 0){
        flRating = 1
    } else if (fl < 20){
        flRating = 2
    } else if (fl < 32){
        flRating = 4
    } else if (fl < 45){
        flRating = 7
    } else if (fl < 60){
        flRating = 10
    } else if (fl < 75){
        flRating = 7
    } else if (fl < 90){
        flRating = 5
    } else if (fl < 95){
        flRating = 3
    } else if (fl <= 100){
        flRating = 2
    } else {
        flRating= 0
    }

    if(paceAdjustment <= 130){
        humidityRating = 10
    } else if (paceAdjustment <= 150){
        humidityRating = 7
    } else if (paceAdjustment <= 180) {
        humidityRating = 5
    } else {
        humidityRating = 2
    }

    if(wind <= 5){
        windRating = 10
    } else if (wind <= 11){
        windRating = 7
    } else if (wind <= 19){
        windRating = 5
    } else if (wind <= 28){
        windRating = 3
    } else {
        windRating = 1
    }

    overallRating = (temperatureRating + flRating + humidityRating + windRating) / 4

    return {
        temperature: temperatureRating,
        feelsLike: flRating,
        humidity: humidityRating,
        wind: windRating,
        overall: overallRating,
    }

}

