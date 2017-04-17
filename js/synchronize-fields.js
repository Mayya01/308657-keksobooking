'use strict';

window.synchronizeFields = function (element, changeElement, paramOject, callback) {
  element.addEventListener('change', function () {
    callback(changeElement, paramOject, element);
  });
};

