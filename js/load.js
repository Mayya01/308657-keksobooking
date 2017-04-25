'use strict';

(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var parsePin = function (response) {
      var data = JSON.parse(response);
      return data;
    };


    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        var pinsObject = parsePin(xhr.response);
        onSuccess(pinsObject);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();

  };
})();
