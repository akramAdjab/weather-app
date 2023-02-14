import { API_URL } from './config.js';
import { AJAX, getUserCoords, queryCorrected } from './helpers.js';

// `${GEOCODING_API_URL}geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOCODING_API_KEY}`
// `${WEATHER_API_URL}/forecast?latitude=${lat}&longitude=${lon}&${WEATHER_API_PARAMETERS}`

// https://geocode.xyz/${lat},${lng}?geoit=json

const createObj = function (city, obj) {
  return {
    city,
    temp: obj.temp,
    humidity: obj.humidity,
    wind: obj.wind_speed,
    cloud: obj.cloud_pct,
    // sunrise: obj.sunrise,
    // sunset: obj.sunset,
  };
};

export const weatherInfo = async function () {
  try {
    // 1. Get User Coords: {latitude and longitude}
    const userPos = await getUserCoords();
    const { latitude: lat, longitude: lon } = userPos.coords;

    // 2. Get user's city
    const dataGeo = await AJAX(
      `${API_URL}reversegeocoding?lat=${lat}&lon=${lon}`,
      `Something went wrong. We didn't get your current city!`
    );
    const { state: city } = dataGeo[0];

    // 3. Get current weather based on user's city
    const dataWea = await AJAX(
      `${API_URL}weather?lat=${lat}&lon=${lon}`,
      `Something went wrong. We didn't get your current weather!`
    );

    // 4. Send weather data to controller to render it to UI
    return createObj(city, dataWea);
  } catch (err) {
    throw err;
  }
};

export const searchWeather = async function (query) {
  try {
    const city = queryCorrected(query);

    const data = await AJAX(`${API_URL}weather?city=${city}`);
    return createObj(city, data);
  } catch (err) {
    throw err;
  }
};
