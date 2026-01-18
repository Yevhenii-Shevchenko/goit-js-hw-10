import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputT = document.querySelector('#datetime-picker');
const startBtnT = document.querySelector('[data-start]');
const daysT = document.querySelector('[data-days]');
const hoursT = document.querySelector('[data-hours]');
const minutesT = document.querySelector('[data-minutes]');
const secondsT = document.querySelector('[data-seconds]');

let userSelectedDate;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      iziToast.warning({
        title: 'Error',
        titleColor: '#ffffff',
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        position: 'center',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        closeOnClick: true,
      });
      return;
    }

    userSelectedDate = selectedDates[0];
    startBtnT.disabled = false;
    startBtnT.classList.add('start-btn-abled');
   
  },
};

flatpickr(inputT, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  const timeMs = userSelectedDate - new Date();

  if (timeMs <= 0) {
    clearInterval(timerId);
    inputT.disabled = false;
    startBtnT.disabled = false;
    daysT.textContent = '00';
    hoursT.textContent = '00';
    minutesT.textContent = '00';
    secondsT.textContent = '00';
    return;
  }

  const time = convertMs(timeMs);
  daysT.textContent = addLeadingZero(time.days);
  hoursT.textContent = addLeadingZero(time.hours);
  minutesT.textContent = addLeadingZero(time.minutes);
  secondsT.textContent = addLeadingZero(time.seconds);
}

startBtnT.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startBtnT.disabled = true;
  inputT.disabled = true;
  startBtnT.classList.remove('start-btn-abled');

  updateTimer();
  timerId = setInterval(updateTimer, 1000);
});