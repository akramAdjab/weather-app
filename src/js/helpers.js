import { API_KEY, TIMEOUT_REQUEST_AJAX } from './config.js';

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request too long. Please try again!`));
    }, sec * 1000);
  });
};

export const getUserCoords = async function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, () =>
      reject(
        new Error(
          'Location not found. Please enable your location and try again!'
        )
      )
    );
  });
};

export const AJAX = async function (url, errMsg) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    };

    const res = await Promise.race([
      fetch(url, options),
      timeout(TIMEOUT_REQUEST_AJAX),
    ]);
    if (!res.ok) throw new Error(errMsg);
    return res.json();
  } catch (err) {
    throw err;
  }
};

export const queryCorrected = function (string) {
  return string
    .toLowerCase()
    .replace(string[0].toLowerCase(), string[0].toUpperCase());
};
