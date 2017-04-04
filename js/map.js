'use strict';

/* global randomInteger */
/* global randomArrItem */


/*
 * Рендет точек на карте
 * https://up.htmlacademy.ru/javascript/9/tasks/9
 */
function generateMap() {
  // 1. получаем данные о точках на карте
  var pins = getPins();

  // 2. рисуем отметки на карте
  renderPins(pins);

  // 3. рисуем информацию о первом элементе в блоке слева
  renderPinBlock(pins[0]);
}


// Возвращет массив из 8 объектов

var getPins = function () {
  var pins = [];
  for (var i = 0; i < 8; i++) {
    pins[i] = getPin(i);
  }

  return pins;
};

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

// 1.Рисует пины на карте
var renderPins = function (pins) {
  document.querySelector('.tokyo__pin-map').innerHTML = getPinsHtml(pins);
};
// 2 . Генерирует html пинов
var getPinsHtml = function (pinData) {
  var pinMapHtml = '';

  for (var i = 0; i < pinData.length; i++) {
    pinMapHtml += generetPinData(pinData[i]);
  }
  return pinMapHtml;
};

// 3. Генерирует html одного пина на основе информации о пине
var generetPinData = function (pinData) {
  return '<div title="' + pinData.offer.title + '" class="pin  pin__main" style="top:' + pinData.location.y + 'px;left:' + pinData.location.x + 'px" ><img src="' + pinData.author.avatar + '" alt="Main Pin" class="rounded" width="40" height="44"></div>';
};


function getOfferType(type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'house') {
    return 'Дом';
  } else {
    return 'Бунгало';
  }
}


var renderPinBlock = function (pinFirst) {
  var similarOffer = document.querySelector('#offer-dialog').querySelector('.dialog__panel');

  var clonedSimilarLodgeTemplate = document.querySelector('#lodge-template').content.cloneNode(true);


  clonedSimilarLodgeTemplate.querySelector('.lodge__title').textContent = pinFirst.offer.title;

  clonedSimilarLodgeTemplate.querySelector('.lodge__address').textContent = pinFirst.address;

  clonedSimilarLodgeTemplate.querySelector('.lodge__price').innerHTML = pinFirst.offer.price + '&#x20bd;/ночь';

  clonedSimilarLodgeTemplate.querySelector('.lodge__type').textContent = getOfferType(pinFirst.offer.type);

  clonedSimilarLodgeTemplate.querySelector('.lodge__rooms-and-guests').textContent = ' Для ' + pinFirst.offer.guests + ' гостей в ' + pinFirst.offer.rooms + ' комнатах ';

  clonedSimilarLodgeTemplate.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + pinFirst.offer.checkin + ' , выезд до ' + pinFirst.offer.checkout;

  var html = '';
  for (var i = 0; i < pinFirst.offer.features.length; i++) {
    html += '<span class=feature__image feature__image' + pinFirst.offer.features[i] + '></span>';
  }
  clonedSimilarLodgeTemplate.querySelector('.lodge__features').insertAdjacentHTML('beforeend', html);

  clonedSimilarLodgeTemplate.querySelector('.lodge__description').textContent = pinFirst.offer.description;

  similarOffer.innerHTML = '';
  similarOffer.appendChild(clonedSimilarLodgeTemplate);
};


generateMap();
