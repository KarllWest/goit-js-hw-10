import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import successicon from '/img/check.svg';
import erroricon from '/img/error.svg';

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      iziToast.success({
        title: "OK",
        titleSize: '16',
        titleWeight: '700',
        message: `Fulfilled promise in ${delay}ms`,
        iconUrl: successicon,
        position: "topRight",
        backgroundColor: '#59a10d',
        messageColor: '#fff',
        messageSize: '16',
        theme: 'dark',
        close: true,
       class: "my-toast",
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "Error",
        titleSize: '16',
        titleWeight: '700',
        message: `Rejected promise in ${delay}ms`,
        iconUrl: erroricon,
        position: "topRight",
        messageColor: '#fff',
        messageSize: '16',
        backgroundColor: '#ef4040',
        progressBarColor: '#b51b1b',
        theme: 'dark',
        close: true, 
        theme: 'dark',
        class: "my-toast",
      });
    });
  
  form.reset();
});