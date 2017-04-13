'use strict';
window.getPins = (function () {

// генерирует информацию для пина,генерирует объекты для массива
  var getPin = function (index) {
    var titleArray = ['Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'];

    var getFeatures = function () {
      return ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'].splice(0, randomInteger(0, 5));
    };

    var randomData = {
      'author': {
        'avatar': 'img/avatars/user0' + (index + 1) + '.png'
      },

      'offer': {
        'title': titleArray[index],
        'address': '',
        'price': randomInteger(1000, 1000000),
        'features': getFeatures(),
        'type': randomArrItem(['flat', 'house', 'bungalo']),
        'rooms': randomInteger(1, 5),
        'guests': randomInteger(1, 15),

        'checkin': randomArrItem(['12:00', '13:00', '14:00']),
        'checkout': randomInteger(12, 14) + ':00',

        'description': '',
        'photos': []
      },
      'location': {
        'x': randomInteger(300, 900),
        'y': randomInteger(100, 500)
      }
    };

    randomData.address = randomData.location.x + ', ' + randomData.location.y;
    return randomData;
  };

  var pins = [];
  for (var i = 0; i < 8; i++) {
    pins[i] = getPin(i);
  }

  return pins;
})();
