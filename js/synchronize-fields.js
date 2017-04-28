'use strict';

window.synchronizeFields = function (element, changeElement, paramObject, callback) {
  element.addEventListener('change', function () {
    callback(changeElement, paramObject, element);
  });
};

