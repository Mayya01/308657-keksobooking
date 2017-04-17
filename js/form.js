'use strict';

window.validateForm = (function () {


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

  var time = {'12': 12, '13': 13, '14': 14};
  var fixTimeOfCheckOut = function (timeCheckOut, time, timeCheckIn) {
    timeCheckOut.value = time[timeCheckIn.value];
  };
  window.synchronizeFields(timeCheckIn, timeCheckOut, time, fixTimeOfCheckOut);


  // Автоматическая корректировка полей формы: тип жилья синхронизирован с ценой

  var accomodations = {'flat': 1000, 'shack': 0, 'palace': 10000};
  var fixAccomodationPrice = function (priceFoAccomodation, accomodations, typeOfAccomodation) {
    priceFoAccomodation.value = accomodations[typeOfAccomodation.value];
  };
  window.synchronizeFields(typeOfAccomodation, priceForAccomodation, accomodations, fixAccomodationPrice);


  // Автоматическая корректировка полей формы: количество комнат синхронизировано с количеством гостей

  var room = {'1': 'not for guests', '2': 'for 3 guests', '100': 'for 3 guests'};
  var fixNumberOfGuests = function (capacity, room, roomNumber) {
    capacity.value = room[roomNumber.value];
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
    } return true;
  };

  button.addEventListener('click', validateFormHandler);


})();
