import {
  WEATHER_API_PARAMETERS,
  WEATHER_API_URL,
  GEOCODING_API_URL,
  GEOCODING_API_KEY,
} from './config.js';
import { AJAX } from './helpers.js';

export const weatherInfo = {};

export const getWeatherInfo = async function (position) {
  try {
    // Latitude and Longitude of the user
    const { latitude: lat, longitude: lon } = position.coords;

    // API call to get the current user state based on latitude and longitude
    const dataGeo = await AJAX(
      `${GEOCODING_API_URL}geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOCODING_API_KEY}`
    );
    const { state } = dataGeo.features[0].properties;

    // API CALL to the current weather
    const dataWea = await AJAX(
      `${WEATHER_API_URL}/forecast?latitude=${lat}&longitude=${lon}&${WEATHER_API_PARAMETERS}`
    );
    weatherInfo.state = state;
    weatherInfo.time = dataWea.hourly.time;
    weatherInfo.temperature = dataWea.hourly.temperature_2m;
    weatherInfo.humidity = dataWea.hourly.relativehumidity_2m;
    weatherInfo.rain = dataWea.hourly.rain;
    weatherInfo.wind = dataWea.hourly.windspeed_10m;
  } catch (err) {
    throw err;
  }
};
