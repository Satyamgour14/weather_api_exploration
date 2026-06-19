# Weather API Exploration

A Node.js Express server that integrates with multiple weather APIs to provide current weather data and forecasts. This project explores and compares two popular weather services: OpenWeather and Open-Meteo.

## Overview

This application provides REST API endpoints to fetch weather information based on geographic coordinates (latitude and longitude). It supports integration with two different weather data providers, allowing you to explore and compare their capabilities and data formats.

## Features

- **Current Weather Data**: Fetch real-time weather conditions for any location
- **Weather Forecasts**: Get weather predictions for multiple days ahead
- **Multiple API Providers**: Support for both OpenWeather and Open-Meteo APIs
- **Error Handling**: Comprehensive error handling and validation
- **Environment Configuration**: Secure API key management using environment variables

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **HTTP Client**: Axios 1.18.0
- **Environment Management**: Dotenv 17.4.2
- **Development**: Nodemon 3.1.14

## Prerequisites

- Node.js (v14 or higher)
- Yarn or npm package manager
- OpenWeather API key (get one at https://openweathermap.org/api)

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Create a `.env` file in the root directory and add your API keys:

```env
OPEN_WEATHER_APP_ID=your_openweather_api_key_here
```

## Usage

### Start the Development Server

```bash
npm start
```

The server will run on `http://localhost:3000` and will automatically reload when you make changes (thanks to Nodemon).

### Available Endpoints

#### 1. Get Current Weather (OpenWeather API)

**Endpoint**: `GET /openweather/weather`

**Query Parameters**:
- `lat` (required): Latitude of the location
- `lon` (required): Longitude of the location

**Example Request**:
```bash
curl "http://localhost:3000/openweather/weather?lat=40.7128&lon=-74.0060"
```

**Response**:
```json
{
  "success": true,
  "message": "Current Weather Status fetched successfully for New York",
  "data": {
    "base": "stations",
    "weather_main": "Cloudy",
    "weather_description": "overcast clouds",
    "temp": 15.5,
    "temp_feels_like": 14.8,
    "temp_min": 13.2,
    "temp_max": 17.1,
    "pressure": 1013,
    "humidity": 65,
    "wind_speed": 5.2,
    "wind_deg": 200,
    "visibility": 10000,
    "country": "US",
    "area": "New York",
    "sunrise": 1640000000,
    "sunset": 1640040000
  }
}
```

#### 2. Get Weather Forecast (OpenWeather API - 4 Days)

**Endpoint**: `GET /openweather/weather/forecast`

**Query Parameters**:
- `lat` (required): Latitude of the location
- `lon` (required): Longitude of the location

**Example Request**:
```bash
curl "http://localhost:3000/openweather/weather/forecast?lat=40.7128&lon=-74.0060"
```

**Response**:
```json
{
  "success": true,
  "message": "Get-weather-forcast-details API run successfully for New York!",
  "data": [
    {
      "dateTime": "2024-06-19 12:00:00",
      "temp": 18.5,
      "humidity": 60,
      "weather": "Clear",
      "description": "clear sky",
      "rainChance": 10
    }
  ]
}
```

#### 3. Get Weather Forecast with Current Data (Open-Meteo API - 7 Days)

**Endpoint**: `GET /openmeteo/weather/forecast`

**Query Parameters**:
- `lat` (required): Latitude of the location
- `lon` (required): Longitude of the location

**Example Request**:
```bash
curl "http://localhost:3000/openmeteo/weather/forecast?lat=40.7128&lon=-74.0060"
```

**Response**:
```json
{
  "success": true,
  "message": "Forcast details fetched successfully from openMeteo!",
  "data": {
    "current_weather": {
      "temperature": 18.5,
      "humidity": 65,
      "wind_speed": 5.2
    },
    "next_7_days": [
      {
        "date": "2024-06-19",
        "max_temperature": 22.5,
        "min_temperature": 15.3,
        "rain_probability": 20,
        "maxWindSpeed": 6.5,
        "maxWindGust": 10.2,
        "dominantDirection": 200
      }
    ]
  }
}
```

## Project Structure

```
├── index.js                    # Main Express server and route definitions
├── openWeatherService.js       # OpenWeather API integration functions
├── openMeteoService.js         # Open-Meteo API integration functions
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

## API Services

### OpenWeather Service
- **File**: [openWeatherService.js](openWeatherService.js)
- **Functions**:
  - `getCurrentWeather(lat, lon)`: Fetches current weather data
  - `getWeatherForcast(lat, lon)`: Fetches 5 forecast periods
- **API**: https://api.openweathermap.org/data/2.5
- **Authentication**: Requires API key (paid service)
- **Units**: Metric (Celsius, m/s, etc.)

### Open-Meteo Service
- **File**: [openMeteoService.js](openMeteoService.js)
- **Functions**:
  - `getWeatherForcastFromOpenMeteo(lat, lon)`: Fetches current weather + 7-day forecast
- **API**: https://api.open-meteo.com/v1/forecast
- **Authentication**: No API key required (free service)
- **Features**: Automatic timezone detection

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

**Common Error Cases**:
- Missing required query parameters (lat/lon) → HTTP 400
- API service failures → HTTP 400
- Internal server errors → HTTP 500

## Development Notes

### Environment Variables
- `OPEN_WEATHER_APP_ID`: Your OpenWeather API key (required for OpenWeather endpoints)

### Code Observations
- The project uses a mix of `import` and `require` statements (consider standardizing)
- Error handling is comprehensive with try-catch blocks
- All endpoints validate required parameters before making API calls
- Response formatting is consistent across services

## Comparison: OpenWeather vs Open-Meteo

| Feature | OpenWeather | Open-Meteo |
|---------|-------------|-----------|
| API Key Required | Yes (Paid) | No (Free) |
| Forecast Days | 4 days | 7 days |
| Current Weather | Yes | Yes |
| Temperature Units | Configurable (metric) | Fixed |
| Timezone Handling | Manual | Automatic |
| Wind Gust Data | Yes | Yes |

## Future Enhancements

- Add more weather parameters (UV index, air quality, etc.)
- Implement caching to reduce API calls
- Add unit conversion utilities
- Create a web UI dashboard
- Add rate limiting and request logging
- Support for additional weather providers
- Unit tests and integration tests

## License

ISC

## Author

Created for weather API exploration and comparison purposes.
