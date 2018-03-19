function delayCallFrequency(func, frequency = 1, timeout = 1000) {

  if (typeof func !== 'function') {
    throw new Error(`${func} is not a Function`);
  }

  let timer = null;
  let callsCount = 0;
  let isCallable = true;

  return function () {
    if (isCallable) {
      if (callsCount < frequency) {
        func.apply(this, arguments);
        callsCount++;
      } else {
        isCallable = false;
        callsCount = 0;
        timer = setTimeout(function () {
          isCallable = true;
        }, timeout);
      }
    }
  };
}

export default delayCallFrequency;
