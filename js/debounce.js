'use strict';

window.debounce = (function () {
  var INTERVAL = 500;

  var timeout;
  return function (func) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, INTERVAL);
  };
})();
