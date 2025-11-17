import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/1-timer.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  btn: document.querySelector('[data-start]'),
  date: document.querySelector('#datetime-picker'),
  hrs: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
  sec: document.querySelector('[data-seconds]'),
  min: document.querySelector('[data-minutes]'),
};


const pad = num => num.toString().padStart(2, '0');


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


let userSelectedDate;

const datePick = flatpickr(refs.date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    
    if (userSelectedDate < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        class: 'toast',
        position: 'topRight',
      });
      refs.btn.setAttribute('disabled', '');
      return;
    }
    refs.btn.removeAttribute('disabled', '');
  },
});


const timer = date => {
  const interval = setInterval(() => {
    const timeDiff = date - new Date();
    const time = convertMs(timeDiff);

    const { days, hours, minutes, seconds } = time;
    refs.days.textContent = pad(days);
    refs.hrs.textContent = pad(hours);
    refs.min.textContent = pad(minutes);
    refs.sec.textContent = pad(seconds);

  
    if (timeDiff < 1000) {
      clearInterval(interval);
      refs.date.removeAttribute('disabled', '');
    }
  }, 1000);
};


refs.btn.setAttribute('disabled', '');

refs.btn.addEventListener('click', () => {
  timer(userSelectedDate);
  refs.btn.setAttribute('disabled', '');
  refs.date.setAttribute('disabled', '');
});
