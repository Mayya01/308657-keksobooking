'use strict';
window.pins = [];
window.getPins = (function () {
  var successHandler = function (pins) {
    window.pins = pins;

    var MAX_COUNT_PIN_ON_FIRST_LOAD = 3;
    window.generateMap(pins.slice(0, MAX_COUNT_PIN_ON_FIRST_LOAD));
  };


  var errorHandler = function (errorMessage) {
    var element = document.createElement('div');
    element.style = 'z-index: 100; margin:0 auto; text-align: center; background-color:#C6F2F9; width:1200px';
    element.style.fontFamily = 'Roboto, Arial, sans-serif';
    element.style.porisition = 'absolute';
    element.style.border = '1px solid white';
    element.style.fontSize = '18px';
    element.textContent = errorMessage;
    document.querySelector('.tokyo').insertAdjacentElement('afterbegin', element);
  };

  window.load(successHandler, errorHandler);

})();


