function detectMoving(video, rW, rH) {
  let then = 0;
  const canvasSource = document.createElement('canvas');
  canvasSource.width = rW;
  canvasSource.height = rH;
  document.body.appendChild(canvasSource);
  const contextSource = canvasSource.getContext('2d');

  const canvasBlended = document.createElement('canvas');
  canvasBlended.width = rW;
  canvasBlended.height = rH;
  document.body.appendChild(canvasBlended);
  const contextBlended = canvasBlended.getContext('2d');

  canvasSource.style.display = 'none';
  canvasBlended.style.display = 'none';

  const indicatorsPerLine = 12;
  const indicatorsPerCol = 12;
  const indicatorWidth = (rW / indicatorsPerLine) - 1;
  const indicatorHeight = (rH / indicatorsPerCol) - 1;
  const indicatorsCount = indicatorsPerLine * indicatorsPerCol;
  const indicatorPanel = document.querySelector('.indicatorPanel');
  indicatorPanel.style.width = `${rW}px`;
  indicatorPanel.style.height = `${rH}px`;
  indicatorPanel.style.left = `${(window.innerWidth - rW) / 2}px`;
  const indicators = [];

  for (let i = 0; i < indicatorsCount; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicatorPanel__indicator');
    indicatorPanel.appendChild(indicator);
    indicator.style.width = `${indicatorWidth}px`;
    indicator.style.height = `${indicatorHeight}px`;
    indicators.push(indicator);
  }

  // const notes = document.querySelectorAll('.notes .note');

  let lastImageData;

  function detect(now) {
    drawVideo();
    if (now - then > 25) {
      blend();
      checkAreas();
      then = now;
    }
    requestAnimationFrame(detect);
  }

  detect();

  function drawVideo() {
    contextSource.drawImage(video, 0, 0, canvasSource.width, canvasSource.height);
  }

  function blend() {
    const { width, height } = canvasSource;
    const sourceData = contextSource.getImageData(0, 0, width, height);

    if (!lastImageData){
      lastImageData = sourceData;
    }
    const blendedData = contextSource.createImageData(width, height);
    differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
    contextBlended.putImageData(blendedData, 0, 0);
    lastImageData = sourceData;
  }

  function differenceAccuracy(target, data1, data2) {
    if (data1.length !== data2.length) return null;
    let i = 0;
    while(i < (data1.length / 4)) {
      let average1 = (data1[4 * i] + data1[4 * i + 1] + data1[4 * i + 2]) / 3;
      let average2 = (data2[4 * i] + data2[4 * i + 1] + data2[4 * i + 2]) / 3;
      let diff = threshold(Math.abs(average1 - average2));
      target[4 * i] = diff;
      target[4 * i + 1] = diff;
      target[4 * i + 2] = diff;
      target[4 * i + 3] = 0xFF;
      i = i + 8;
    }
  }

  function threshold(value) {
    return (value > 0x15) ? 0xFF : 0;
  }

  function checkAreas() {
    for (let r = 0; r < indicatorsCount; ++r) {
      let blendedData = contextBlended.getImageData(
        indicators[r].offsetLeft,
        indicators[r].offsetTop,
        indicators[r].offsetWidth,
        indicators[r].offsetHeight,
      );

      let i = 0;
      let average = 0;
      while (i < (blendedData.data.length / 4)) {
        average += (blendedData.data[i * 4] + blendedData.data[i * 4 + 1] + blendedData.data[i * 4 + 2]) / 3;
        ++i;
      }

      average = Math.round(average / (blendedData.data.length / 4));
      indicators[r].classList.remove('indicatorPanel__indicator_active');
      if (average > 10) {
        indicators[r].classList.add('indicatorPanel__indicator_active');
      }
    }
  }
}

export default detectMoving;
