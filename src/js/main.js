import '../styles/main.scss';

import video from './video';
import audioViz from './audioVisualizer';

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

let copyVideo = false;

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      video(stream, webgl);
      audioViz(stream, rW, rH);
    })
    .catch(e => console.log(e));
}
