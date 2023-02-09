import * as model from './model.js';
import view from './view.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const getCoords = async function () {
  try {
    navigator.geolocation.getCurrentPosition(
      model.getWeatherInfo.bind(this),
      () => console.log('error!!!!!!!!!!!')
    );
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  view.renderTime();
  getCoords();

  // temp
  // console.log(model.weatherInfo.state);
};
init();
