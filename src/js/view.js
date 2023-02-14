import { TIME_PER_SECOND } from './config.js';

class View {
  titleContainer = document.querySelector('.weather__title-container');
  infoContainer = document.querySelector('.weather__info--container');

  searchInput = document.querySelector('.input-box');
  searchBtn = document.querySelector('.btn');

  timeEl = document.querySelector('.time');
  dayEl = document.querySelector('.day');
  dateEl = document.querySelector('.date');

  spin = document.querySelector('.spin');

  // Render real-time clock
  renderTime() {
    this.#generateTime();

    setInterval(() => {
      this.#generateTime();
    }, TIME_PER_SECOND * 1000);
  }

  // Render spinner
  toggleSpinner() {
    this.spin.classList.toggle('hidden');
  }

  // Get current time and display it to user
  #generateTime() {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
    };

    const [day, date, time] = new Intl.DateTimeFormat(
      navigator.language,
      options
    )
      .format(new Date())
      .split(', ');

    this.timeEl.textContent = time;
    this.dayEl.textContent = day;
    this.dateEl.textContent = date;
  }

  // Render Today's weather
  renderWeather(data) {
    this.#generateWeatherTitle(data);
    this.#generateWeatherInfo(data);
  }

  // Generate title markup
  #generateWeatherTitle(data) {
    const markup = `
      <h1 class="weather__title">
        <span class="weather__temp temp">${data.temp}&deg;</span>
        <span class="weather__location location">${data.city}</span>
      </h1>
      `;

    this.titleContainer.innerHTML = '';
    this.titleContainer.classList.remove('weather__title-error');
    return this.titleContainer.insertAdjacentHTML('beforeend', markup);
  }

  // Generate Info markup
  #generateWeatherInfo(data) {
    const markup = `
    <div class="weather__details">
      <h3 class="weather__sub-title">Weather details</h3> 

      <div class="weather__detail--container">
        <p class="weather__detail">
          <span>Cloud</span>
          <span class="weather__cloudy--percentage">${data.cloud}%</span>
        </p>

        <p class="weather__detail">
          <span>Humidity</span>
          <span class="weather__cloudy--percentage">${data.humidity}%</span>
        </p>

      
        <p class="weather__detail">
          <span>Wind</span>
          <span class="weather__cloudy--percentage">${data.wind}km/h</span>
        </p>
      </div>
    </div>
    `;

    this.infoContainer.innerHTML = '';
    return this.infoContainer.insertAdjacentHTML('beforeend', markup);
  }

  // Render error
  renderError(errMsg) {
    this.#generateError(errMsg);
  }

  #generateError(errMsg) {
    const markup = `
    <h1 class="weather__error">${errMsg}</h1>
    `;

    this.titleContainer.innerHTML = '';
    this.titleContainer.classList.add('weather__title-error');
    return this.titleContainer.insertAdjacentHTML('beforeend', markup);
  }

  // Render weather on user search
  renderSearch() {}

  // Get user search value
  createQuery() {
    const query = this.searchInput.value;
    this.#clearInput();
    return query;
  }

  // Clear input search box
  #clearInput() {
    this.searchInput.value = '';
  }

  // Handling search btn
  addHanlderSearch(handler) {
    this.searchBtn.addEventListener('click', function () {
      handler();
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handler();
    });
  }
}

export default new View();
