import * as model from './model.js';
import view from './view.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const weatherData = async function () {
  try {
    // Render Spinner
    view.toggleSpinner();

    const data = await model.weatherInfo();
    if (data) view.toggleSpinner();
    view.renderWeather(data);
  } catch (err) {
    view.renderError(err.message);
  }
};

const searchData = async function () {
  try {
    // Render Spinner
    view.toggleSpinner();

    const query = view.createQuery();
    if (!query) return;
    const data = await model.searchWeather(query);
    if (data) view.toggleSpinner();
    view.renderWeather(data);
  } catch (err) {
    view.renderError(err.message);
  }
};

const init = function () {
  view.renderTime();
  weatherData();
  view.addHanlderSearch(searchData);
};
init();
