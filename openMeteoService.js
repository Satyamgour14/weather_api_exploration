import axios from "axios";

const getWeatherForcastFromOpenMeteo = async (latitude, longitude) => {
    try {
        const params = {
            latitude,
            longitude,

            // Current weather
            current: [
                'temperature_2m',
                'relative_humidity_2m',
                'wind_speed_10m',
                'weather_code'
            ].join(','),

            // Daily forecast
            daily: [
                'weather_code',
                'temperature_2m_max',
                'temperature_2m_min',
                'precipitation_probability_max',
                'wind_speed_10m_max',
                'wind_gusts_10m_max',
                'wind_direction_10m_dominant'
            ].join(','),

            timezone: 'auto',
            forecast_days: 7
        }

        const url = 'https://api.open-meteo.com/v1/forecast';

        const result = await axios.get(url, { params });

        const data = result.data;

        const response = {
            current_weather: {
                temperature: data.current.temperature_2m,
                humidity: data.current.relative_humidity_2m,
                wind_speed: data.current.wind_speed_10m
            },

            next_7_days: data.daily.time.map((date, index) => ({
                date,
                max_temperature: data.daily.temperature_2m_max[index],
                min_temperature: data.daily.temperature_2m_min[index],
                rain_probability: data.daily.precipitation_probability_max[index],
                maxWindSpeed: data.daily.wind_speed_10m_max[index],
                maxWindGust: data.daily.wind_gusts_10m_max[index],
                dominantDirection: data.daily.wind_direction_10m_dominant[index]
            }))
        };

        return {
            success: true,
            message: `Forcast details fetched successfully from openMeteo!`,
            data: response
        }


    } catch (error) {
        console.error("API Failed - getWeatherForcastFromOpenMeteo - Error - ", error);
        return {
            success: false,
            message: error.message,
            data: error.response?.data
        }

    }
}

export {
    getWeatherForcastFromOpenMeteo
}