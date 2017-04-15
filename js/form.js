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
  timeCheckIn.addEventListener('change', function () {
    var time = {'12': 12, '13': 13, '14': 14};
    timeCheckOut.value = time[timeCheckIn.value];
  });


  // Автоматическая корректировка полей формы: тип жилья синхронизирован с ценой
  typeOfAccomodation.addEventListener('change', function () {
    var accomodations = {'flat': 1000, 'shack': 0, 'palace': 10000};
    priceForAccomodation.value = accomodations[typeOfAccomodation.value] || 0;
  });


  // Автоматическая корректировка полей формы: количество комнат синхронизировано с количеством гостей
  roomNumber.addEventListener('change', function () {
    var room = {'1': 'not for guests', '2': 'for 3 guests', '100': 'for 3 guests'};
    capacity.value = room[roomNumber.value];
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


})();
