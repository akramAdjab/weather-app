import { TIME_PER_SECOND } from './config.js';

class View {
  timeEl = document.querySelector('.time');
  dayEl = document.querySelector('.day');
  dateEl = document.querySelector('.date');

  // Render real-time clock
  renderTime() {
    this.#generateTime();

    setInterval(() => {
      this.#generateTime();
    }, TIME_PER_SECOND * 1000);
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
}

export default new View();
