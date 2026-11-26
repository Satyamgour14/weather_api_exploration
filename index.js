const express = require("express");
require('dotenv').config()


const { getCurrentWeather, getWeatherForcast } = require("./openWeatherService");
const { getWeatherForcastFromOpenMeteo } = require("./openMeteoService");

// create express app instance
const app = express();
app.use(express.json());


/**
 * Fetch Current Weather Status Based on Lat Long
 * API URL: 
 * http://localhost:3000/openweather/weather?lat={lat}&lon={lon}
 */

app.get('/openweather/weather', async (req, res) => {
    try {

        const { lat, lon } = req.query;
        if (!lat || !lon) {
            res.status(400).json({ success: false, message: "lat and lon are required" });
        }

        const result = await getCurrentWeather(lat, lon);

        if (!result.success) {
            res.status(400).json(result);
        }

        res.status(200).json(result);

    } catch (error) {
        console.error("API Failed - get-weather-details - Error: ", error);
        res.status(500).json(error.message || "Internal Server Error");
    }
});



/**
 * Fetch Hourly Forecast For 4 Days
 * API URL: 
 * http://localhost:3000/openweather/weather/forecast?lat={lat}&lon={lon}
 */

app.get('/openweather/weather/forecast', async (req, res) => {
    try {

        const { lat, lon } = req.query;
        if (!lat || !lon) {
            res.status(400).json({ success: false, message: "lat and lon are required" });
        }

        const result = await getWeatherForcast(lat, lon);

        if (!result.success) {
            res.status(400).json(result);
        }

        res.status(200).json(result);

    } catch (error) {
        console.error("API Failed - get-weather-forcast-details - Error: ", error);
        res.status(500).json(error.message || "Internal Server Error");
    }
});


/**
 * Fetch Current Weather Data And Next 7 Days Forecast
 * API URL: 
 * http://localhost:3000/openmeteo/weather/forecast?lat={lat}&lon={lon}
 */
app.get('/openmeteo/weather/forecast', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            res.status(400).json({ success: false, message: "lat and lon are required" });
        }

        const result = await getWeatherForcastFromOpenMeteo(lat, lon)

        if (!result.success) {
            res.status(400).json(result);
        }

        res.status(200).json(result);

    } catch (error) {
        console.error("API Failed - /openmeteo/weather/forecast - Error: ", error);
        res.status(500).json(error.message || "Internal Server Error");
    }
})


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});