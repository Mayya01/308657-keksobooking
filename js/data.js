'use strict';

window.getPins = (function () {
  var successHandler = function (pins) {
    window.generateMap(pins);

  };


  var errorHundler = function (errorMessage) {
    var element = document.createElement('div');
    element.style = 'z-index: 100; margin:0 auto; text-align: center; background-color:#C6F2F9; width:1200px';
    element.style.fontFamily = 'Roboto, Arial, sans-serif';
    element.style.porisition = 'absolute';
    element.style.border = '1px solid white';
    element.style.fontSize = '18px';
    element.textContent = errorMessage;
    document.querySelector('.tokyo').insertAdjacentElement('afterbegin', element);
  };
  window.load(successHandler, errorHundler);
})();
