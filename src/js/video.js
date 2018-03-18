function render(canvasElement, videoElement) {
  const gl = canvasElement.getContext('webgl');
  if (!gl) {
    return;
  }
  const { width, height } = canvasElement;
  const vertexShaderSource = document.getElementById('2d-vertex-shader').text;
  const fragmentShaderSource = document.getElementById('2d-fragment-shader').text;
  const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
  const program = createProgram(gl, vertexShader, fragmentShader);
  const programInfo = {
    program,
    attribLocations: {
      positionLocation: gl.getAttribLocation(program, 'a_position'),
      texcoordLocation: gl.getAttribLocation(program, 'a_texCoord'),
    },
    uniformLocations: {
      resolutionLocation: gl.getUniformLocation(program, 'u_resolution'),
      textureSizeLocation: gl.getUniformLocation(program, 'u_textureSize'),
      rnd: gl.getUniformLocation(program, 'u_rnd'),
    },
  };

  const buffers = initBuffers(gl, width, height);
  const texture = initTexture(gl);

  function renderVideo() {
    updateTexture(gl, texture, videoElement);
    drawScene(gl, programInfo, buffers, texture, width, height);
    requestAnimationFrame(renderVideo);
  }
  requestAnimationFrame(renderVideo);
}

function initBuffers(gl, width, height) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  setRectangle(gl, 0, 0, width, height);

  const texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0,
  ]), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: texcoordBuffer,
  };
}

function initTexture(gl) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([255, 0, 0, 0]);
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  return texture;
}

function updateTexture(gl, texture, videoElement) {
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, videoElement);
}

function drawScene(gl, programInfo, buffers, texture, tWidth, tHeight) {
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(programInfo.program);
  gl.enableVertexAttribArray(programInfo.attribLocations.positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);


  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.vertexAttribPointer( programInfo.attribLocations.positionLocation, size, type, normalize, stride, offset);

  gl.enableVertexAttribArray(programInfo.attribLocations.texcoordLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);

  gl.vertexAttribPointer( programInfo.attribLocations.texcoordLocation, size, type, normalize, stride, offset);

  gl.uniform2f(programInfo.uniformLocations.resolutionLocation, tWidth, tHeight);
  gl.uniform1f(programInfo.uniformLocations.rnd, Math.random());

  gl.uniform2f(programInfo.uniformLocations.textureSizeLocation, tWidth, tHeight);

  const primitiveType = gl.TRIANGLES;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  gl.deleteProgram(program);
  throw new Error('Can\'t create program. \n\n');
}

function createShader(gl, sourceCode, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    throw new Error(`Could not compile WebGL program. \n\n ${info}`);
  }
  return shader;
}

function setRectangle(gl, x, y, width, height) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ]), gl.STATIC_DRAW);
}

export default render;
