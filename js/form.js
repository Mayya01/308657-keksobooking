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


})();
