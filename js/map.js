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

  // 4. навешиваем события
  setPinEvents(pins);

}
// 5. Валидация Формы
validateForm();


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
  return similarOffer.appendChild(clonedSimilarLodgeTemplate);
};


function setPinEvents(pins) {


  var tokyoPin = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('#offer-dialog');


  // Закрытие окна .dialog после загрузки страницы: по клику, нажатием на esc и enter
  window.addEventListener('load', function () {
    dialog.querySelector('.dialog__close').addEventListener('click', function () {
      dialog.style.display = 'none';
    });


    dialog.querySelector('.dialog__close').addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        dialog.style.display = 'none';
      }
    });


    dialog.querySelector('.dialog__close').addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        dialog.style.display = 'none';
      }
    });

  });


  // Удаляем у элементов коллеции класс .pin--active
  var deleteClassActive = function () {
    var htmlCollection = tokyoPin.children; // коллекция элементов родительского элемента tokyoPin
    for (var i = 0; i < htmlCollection.length; i++) {
      var child = htmlCollection.item(i);
      if (child.classList.contains('pin--active')) {
        child.classList.remove('pin--active');
        break;
      }
    }
  };

  // Получение индекса элемента с классом .pin--active и передача индекса в функцию renderPinBlock;
  var sendIndexToRenderPinBlock = function () {
    var htmlCollection = tokyoPin.children;
    for (var i = 1; i < htmlCollection.length; i++) {
      var elementCollection = htmlCollection.item(i);
      if (elementCollection.classList.contains('pin--active')) {
        renderPinBlock(pins[i]);
      }
    }
  };

  // Добавляет класс .pin--active к объекту события
  var addClassActive = function (evt) {
    if (evt.target.classList.contains('pin')) {
      evt.target.classList.add('pin--active');
    }
  };

  // Закрытие окна .dialog после клике на один из пинов страницы: по клику, нажатием на esc и enter
  var closeDialog = function (evt) {
    if (evt.target.classList.contains('pin')) {
      evt.target.classList.remove('pin--active');
    }
    dialog.style.display = 'none';
  };


  // Открытие окна dialog при клике на любой из элементов pin
  tokyoPin.addEventListener('click', function (evt) {
    deleteClassActive();

    addClassActive(evt);

    sendIndexToRenderPinBlock();

    dialog.style.display = 'block';


    dialog.querySelector('.dialog__close').addEventListener('click', function () {
      closeDialog(evt);
    });


    dialog.querySelector('.dialog__close').addEventListener('keydown', function () {
      if (evt.keyCode === 27) {
        closeDialog(evt);
      }
    });


    dialog.querySelector('.dialog__close').addEventListener('keydown', function () {
      if (evt.keyCode === 13) {
        closeDialog(evt);
      }
    });
  });


}


function validateForm() {


  var timeCheckIn = document.getElementById('time');
  var timeCheckOut = document.getElementById('timeout');
  var typeOfAccomodation = document.getElementById('type');
  var priceForAccomodation = document.getElementById('price');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var description = document.getElementById('title');
  var button = document.querySelector('.form__submit');
  var address = document.getElementById('address');


// Автоматическая корректировка полей формы: время заезда и выезда.
  timeCheckIn.addEventListener('change', function () {
    if (timeCheckIn.value === '12') {
      timeCheckOut.value = '12';
    }
    if (timeCheckIn.value === '13') {
      timeCheckOut.value = '13';
    }
    if (timeCheckIn.value === '14') {
      timeCheckOut.value = '14';
    }
  });

  // Автоматическая корректировка полей формы: тип жилья синхронизирован с ценой
  typeOfAccomodation.addEventListener('change', function () {
    if (typeOfAccomodation.value === 'flat') {
      priceForAccomodation.value = '1000';
    }
    if (typeOfAccomodation.value === 'shack') {
      priceForAccomodation.value = '0';
    }
    if (typeOfAccomodation.value === 'palace') {
      priceForAccomodation.value = '10000';
    }
  });

  // Автоматическая корректировка полей формы: количество комнат синхронизировано с количеством гостей
  roomNumber.addEventListener('change', function () {
    if (roomNumber.value === '2' || roomNumber.value === '100') {
      capacity.value = 'for 3 guests';
    } else if (roomNumber.value === '1') {
      capacity.value = 'not for guests';
    }
  });

  // Проверка правильности заполнения формы при отправке
  var validateFormHandler = function () {
    if (!description.value && !address.value) {
      description.style.boxShadow = 'none';
      description.style.border = '2px solid red';
      address.style.boxShadow = 'none';
      address.style.border = '2px solid red';
      return false;
    } return true;
  };

  button.addEventListener('click', validateFormHandler);
}


generateMap();
