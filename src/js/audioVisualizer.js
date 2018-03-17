function audioViz(stream, rW, rH) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const analyser = audioCtx.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  const distortion = audioCtx.createWaveShaper();
  const gainNode = audioCtx.createGain();
  const biquadFilter = audioCtx.createBiquadFilter();
  const convolver = audioCtx.createConvolver();

  function makeDistortionCurve(amount) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;

    for (let i=0; i < n_samples; ++i){
      const x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  const canvas = document.querySelector('.viz');
  canvas.style.width = rW + 'px';
  canvas.style.top = (rH - 100) + 'px';
  canvas.style.left = ((window.innerWidth - rW)/2) + 'px';
  const canvasCtx = canvas.getContext("2d");


  let drawVisual;

  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);
  analyser.connect(distortion);
  distortion.connect(biquadFilter);
  biquadFilter.connect(convolver);
  convolver.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  visualize();

  function visualize() {
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    analyser.fftSize = 2048;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    canvasCtx.clearRect(0, 0, rW, HEIGHT);

    const draw = function() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
      canvasCtx.beginPath();

      const sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;

      for(let i = 0; i < bufferLength; i++) {

        let v = dataArray[i] / 128.0;
        let y = v * HEIGHT/2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
    };

    draw();
  }
}

export default audioViz;
