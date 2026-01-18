import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');

form.addEventListener('submit', handleCreatePromise);

function handleCreatePromise(evt) {
  evt.preventDefault();

  const delay = form.delay.value;
  const promiseState = form.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

    promise.then(value => onResolve(value))
        .catch(error => onReject(error));

  form.reset();
}

function onResolve(value) {
  iziToast.success({
    title: 'Ok',
    titleColor: '#ffffff',
    message: value,
    messageColor: '#ffffff',
    backgroundColor: '#59A10D',
    progressBarColor: '#610126',
    position: 'topRight',
    closeOnClick: true,
  });
}

function onReject(error) {
  iziToast.warning({
    message: error,
    messageColor: '#ffffff',
    backgroundColor: '#EF4040',
    progressBarColor: '#093b06',
    position: 'topRight',
    closeOnClick: true,
  });
}