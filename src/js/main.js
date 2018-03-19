import '../styles/main.scss';

import video from './video';
import audioViz from './audioVisualizer';
import detectMoving from './moveDetector';
import delayCallFrequency from './delayCallFrequency';

// global
const width = window.innerWidth;
const height = window.innerHeight;

let rW = width;
let rH = width * 0.75;

if (height < rH) {
  rW = height * 1.333333333333333;
  rH = height;
}

const webgl = document.querySelector('.webgl');
webgl.width = rW;
webgl.height = rH;

const errorElement = document.querySelector('.error');

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      setupVideo(stream, rW, rH)
        .then((videoElement) => {
          video(webgl, videoElement);
          detectMoving(videoElement, rW, rH);
          audioViz(stream, rW, rH);
        })
        .catch(e => showError(e, 'При попытке обработать видеопоток произошла ошибка!'));
    })
    .catch(e => showError(e, 'При попытке получить видеопоток произошла ошибка!'));
}

function setupVideo(stream, videoWidth, videoHeight) {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement('video');
    videoElement.style.display = 'none';
    videoElement.width = videoWidth;
    videoElement.height = videoHeight;
    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.onplay = () => resolve(videoElement);
    videoElement.onerror = e => reject(e);
  });
}

function showError(e, message) {
  errorElement.classList.add('error_visible');
  errorElement.querySelector('.error__message').innerHTML = message;
  console.log(e);
}

let reload = delayCallFrequency(() => window.location.reload(), 1, 1000);

window.addEventListener('load', function () {
  window.addEventListener('resize', reload);
});
