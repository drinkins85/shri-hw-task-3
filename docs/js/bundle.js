!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./",r(r.s=0)}([function(e,t,r){"use strict";r(1);var n=c(r(2)),o=c(r(3)),a=c(r(4)),i=c(r(5));function c(e){return e&&e.__esModule?e:{default:e}}var u=window.innerWidth,d=window.innerHeight,f=u,l=.75*u;d<l&&(f=1.333333333333333*d,l=d);var s=document.querySelector(".webgl");s.width=f,s.height=l;var m=document.querySelector(".error");function h(e,t){m.classList.add("error_visible"),m.querySelector(".error__message").innerHTML=t,console.log(e)}navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then(function(e){(function(e,t,r){return new Promise(function(n,o){var a=document.createElement("video");a.style.display="none",a.width=t,a.height=r,a.srcObject=e,a.autoplay=!0,a.muted=!0,a.onplay=function(){return n(a)},a.onerror=function(e){return o(e)}})})(e,f,l).then(function(t){(0,n.default)(s,t),(0,a.default)(t,f,l),(0,o.default)(e,f,l)}).catch(function(e){return h(e,"При попытке обработать видеопоток произошла ошибка!")})}).catch(function(e){return h(e,"При попытке получить видеопоток произошла ошибка!")});var v=(0,i.default)(function(){return window.location.reload()},1,1e3);window.addEventListener("load",function(){window.addEventListener("resize",v)})},function(e,t){},function(e,t,r){"use strict";function n(e,t,r){var n=e.createShader(r);if(e.shaderSource(n,t),e.compileShader(n),!e.getShaderParameter(n,e.COMPILE_STATUS)){var o=e.getShaderInfoLog(n);throw new Error("Could not compile WebGL program. \n\n "+o)}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=e.getContext("webgl");if(r){var o=e.width,a=e.height,i=document.getElementById("2d-vertex-shader").text,c=document.getElementById("2d-fragment-shader").text,u=n(r,i,r.VERTEX_SHADER),d=n(r,c,r.FRAGMENT_SHADER),f=function(e,t,r){var n=e.createProgram();if(e.attachShader(n,t),e.attachShader(n,r),e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS))return n;throw e.deleteProgram(n),new Error("Can't create program. \n\n")}(r,u,d),l={program:f,attribLocations:{positionLocation:r.getAttribLocation(f,"a_position"),texcoordLocation:r.getAttribLocation(f,"a_texCoord")},uniformLocations:{resolutionLocation:r.getUniformLocation(f,"u_resolution"),textureSizeLocation:r.getUniformLocation(f,"u_textureSize"),rnd:r.getUniformLocation(f,"u_rnd")}},s=function(e,t,r){var n=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,n),function(e,t,r,n,o){var a=t,i=t+n,c=r,u=r+o;e.bufferData(e.ARRAY_BUFFER,new Float32Array([a,c,i,c,a,u,a,u,i,c,i,u]),e.STATIC_DRAW)}(e,0,0,t,r);var o=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),e.STATIC_DRAW),{position:n,textureCoord:o}}(r,o,a),m=function(e){var t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);var r=e.RGBA,n=e.RGBA,o=e.UNSIGNED_BYTE,a=new Uint8Array([255,0,0,0]);return e.texImage2D(e.TEXTURE_2D,0,r,1,1,0,n,o,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),t}(r);requestAnimationFrame(function e(){!function(e,t,r){var n=e.RGBA,o=e.RGBA,a=e.UNSIGNED_BYTE;e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,n,o,a,r)}(r,m,t),function(e,t,r,n,o,a){e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(t.program),e.enableVertexAttribArray(t.attribLocations.positionLocation),e.bindBuffer(e.ARRAY_BUFFER,r.position);var i=e.FLOAT;e.vertexAttribPointer(t.attribLocations.positionLocation,2,i,!1,0,0),e.enableVertexAttribArray(t.attribLocations.texcoordLocation),e.bindBuffer(e.ARRAY_BUFFER,r.textureCoord),e.vertexAttribPointer(t.attribLocations.texcoordLocation,2,i,!1,0,0),e.uniform2f(t.uniformLocations.resolutionLocation,o,a),e.uniform1f(t.uniformLocations.rnd,Math.random()),e.uniform2f(t.uniformLocations.textureSizeLocation,o,a);var c=e.TRIANGLES;e.drawArrays(c,0,6)}(r,l,s,0,o,a),requestAnimationFrame(e)})}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){var n=new(window.AudioContext||window.webkitAudioContext),o=n.createAnalyser();o.minDecibels=-90,o.maxDecibels=-10,o.smoothingTimeConstant=.85;var a=n.createWaveShaper(),i=n.createGain(),c=n.createBiquadFilter(),u=n.createConvolver(),d=document.querySelector(".viz");d.style.width=t+"px",d.style.top=r-100+"px",d.style.left=(window.innerWidth-t)/2+"px";var f=d.getContext("2d");n.createMediaStreamSource(e).connect(o),o.connect(a),a.connect(c),c.connect(u),u.connect(i),i.connect(n.destination),function(){var e=d.width,r=d.height;o.fftSize=2048;var n=o.fftSize,a=new Uint8Array(n);f.clearRect(0,0,t,r),function t(){requestAnimationFrame(t),o.getByteTimeDomainData(a),f.clearRect(0,0,e,r),f.lineWidth=2,f.strokeStyle="rgb(255, 255, 255)",f.beginPath();for(var i=1*e/n,c=0,u=0;u<n;u++){var l=a[u]/128,s=l*r/2;0===u?f.moveTo(c,s):f.lineTo(c,s),c+=i}f.lineTo(d.width,d.height/2),f.stroke()}()}()}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.width,r=e.height,n=0,o=document.createElement("canvas");o.width=t,o.height=r,document.body.appendChild(o);var a=o.getContext("2d"),i=document.createElement("canvas");i.width=t,i.height=r,document.body.appendChild(i);var c=i.getContext("2d");o.style.display="none",i.style.display="none";var u=t/12-1,d=r/12-1,f=144,l=document.querySelector(".indicatorPanel");l.style.width=t+"px",l.style.height=r+"px",l.style.left=(window.innerWidth-t)/2+"px";for(var s=[],m=0;m<f;m++){var h=document.createElement("div");h.classList.add("indicatorPanel__indicator"),l.appendChild(h),h.style.width=u+"px",h.style.height=d+"px",s.push(h)}var v=void 0;!function o(i){a.drawImage(e,0,0,t,r),i-n>25&&(function(){var e=a.getImageData(0,0,t,r);v||(v=e);var n=a.createImageData(t,r);(function(e,t,r){if(t.length!==r.length)return null;for(var n=0;n<t.length/4;){var o=(t[4*n]+t[4*n+1]+t[4*n+2])/3,a=(r[4*n]+r[4*n+1]+r[4*n+2])/3,i=Math.abs(o-a)>21?255:0;e[4*n]=i,e[4*n+1]=i,e[4*n+2]=i,e[4*n+3]=255,n+=8}})(n.data,e.data,v.data),c.putImageData(n,0,0),v=e}(),function(){for(var e=0;e<f;e++){for(var t=c.getImageData(s[e].offsetLeft,s[e].offsetTop,s[e].offsetWidth,s[e].offsetHeight),r=0,n=0;r<t.data.length/4;)n+=(t.data[4*r]+t.data[4*r+1]+t.data[4*r+2])/3,r++;n=Math.round(n/(t.data.length/4)),s[e].classList.remove("indicatorPanel__indicator_active"),n>10&&s[e].classList.add("indicatorPanel__indicator_active")}}(),n=i),requestAnimationFrame(o)}()}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;if("function"!=typeof e)throw new Error(e+" is not a Function");var n=0,o=!0;return function(){o&&(n<t?(e.apply(this,arguments),n++):(o=!1,n=0,setTimeout(function(){o=!0},r)))}}}]);