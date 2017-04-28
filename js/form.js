'use strict';

window.validateForm = (function () {


  var timeCheckIn = document.getElementById('time');
  var timeCheckOut = document.getElementById('timeout');
  var typeOfAccommodation = document.getElementById('type');
  var priceForAccommodation = document.getElementById('price');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var description = document.getElementById('title');
  var button = document.querySelector('.form__submit');
  var address = document.getElementById('address');


// Автоматическая корректировка полей формы: время заезда и выезда.

  var time = {'12': 12, '13': 13, '14': 14};
  var fixTimeOfCheckOut = function (checkOutTime, timeAccommodation, checkInTime) {
    checkOutTime.value = timeAccommodation[checkInTime.value];
  };
  window.synchronizeFields(timeCheckIn, timeCheckOut, time, fixTimeOfCheckOut);


  // Автоматическая корректировка полей формы: тип жилья синхронизирован с ценой

  var accommodations = {'flat': 1000, 'shack': 0, 'palace': 10000};
  var fixAccommodationPrice = function (price, accommodationsArray, accommodationType) {
    price.value = accommodationsArray[accommodationType.value];
  };
  window.synchronizeFields(typeOfAccommodation, priceForAccommodation, accommodations, fixAccommodationPrice);


  // Автоматическая корректировка полей формы: количество комнат синхронизировано с количеством гостей

  var room = {'1': 'not for guests', '2': 'for 3 guests', '100': 'for 3 guests'};
  var fixNumberOfGuests = function (capacityRoom, roomArray, numberOfRooms) {
    capacityRoom.value = roomArray[numberOfRooms.value];
  };

  window.synchronizeFields(roomNumber, capacity, room, fixNumberOfGuests);

  // Проверка правильности заполнения формы при отправке
  var validateFormHandler = function () {
    if (!description.value && !address.value) {
      description.style.boxShadow = 'none';
      description.style.border = '2px solid red';
      address.style.boxShadow = 'none';
      address.style.border = '2px solid red';
      return false;
    }
    return true;
  };

  button.addEventListener('click', validateFormHandler);


})();
