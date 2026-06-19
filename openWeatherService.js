import axios from "axios";
import { configDotenv } from "dotenv";

const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_APP_ID;

const getCurrentWeather = async (lat, lon) => {
    try {
        const openWeatherUrl = `${OPEN_WEATHER_BASE_URL}/weather`;

        const params = {
            lat,
            lon,
            appid: OPEN_WEATHER_API_KEY,
            units: "metric" // standard, metric and imperial
        }
        
        const { data } = await axios.get(
            openWeatherUrl,
            { params }
        );

        const filteredResponse = {
            base: data.base,
            weather_main: data.weather[0].main,
            weather_description: data.weather[0].description,
            temp: data.main.temp,
            temp_feels_like: data.main.feels_like,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            sea_level: data.main.sea_level,
            grnd_level: data.main.grnd_level,
            visibility: data.visibility,
            wind_speed: data.wind.speed,
            wind_deg: data.wind.deg,
            wind_gust: data.wind.gust,
            datetime: data.dt,
            country: data.sys.country,
            area: data.name,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            sunset: data.sys.sunset,
        }

        return {
            success: true,
            message: `Current Weather Status fetched successfully for ${data.name}`,
            data : filteredResponse
        }
    } catch (error) {
        console.error("API Failed - getCurrentWeather - Error: ", error);
        return {
            success: false,
            message: error.message,
            data: error.response?.data
        }
    }
};


const getWeatherForcast = async (lat, lon) => {
    try {
        const openWeatherUrl = `${OPEN_WEATHER_BASE_URL}/forecast`;

        const params = {
            lat,
            lon,
            appid: OPEN_WEATHER_API_KEY,
            units: "metric", // standard, metric and imperial
            cnt: 5
        }

        const { data } = await axios.get(
            openWeatherUrl,
            { params }
        );

        const forecast = data.list.map(item => ({
            dateTime: item.dt_txt,
            temp: item.main.temp,
            humidity: item.main.humidity,
            weather: item.weather[0].main,
            description: item.weather[0].description,
            rainChance: Math.round((item.pop || 0) * 100)
        }));

        return {
            success: true,
            message: `Get-weather-forcast-details API run successfully for ${data.city.name}!`,
            data: forecast
        }

    } catch (error) {
        console.error("API Failed - getWeatherForcast - Error: ", error);
        return {
            success: false,
            message: error.message,
            data: error.response?.data
        }
    }
};

// export the functions
export {
    getCurrentWeather,
    getWeatherForcast
}