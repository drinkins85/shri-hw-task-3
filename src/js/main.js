import '../styles/main.scss';

import video from './video';
import audioViz from './audioVisualizer';
import detectMoving from './moveDetector';

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

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      setupVideo(stream, rW, rH)
        .then((videoElement) => {
          video(webgl, videoElement);
          detectMoving(videoElement, rW, rH);
          audioViz(stream, rW, rH);
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
}

function setupVideo(stream, videoWidth, videoHeight) {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement('video');
    // document.body.appendChild(videoElement);
    videoElement.width = videoWidth;
    videoElement.height = videoHeight;
    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.onplay = () => resolve(videoElement);
    videoElement.onerror = e => reject(e);
  });
}
