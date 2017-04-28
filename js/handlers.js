'use strict';
(function () {

  window.setPinEvents = function (pins) {
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
      Array.from(tokyoPin.children).forEach(function (element) {
        var child = element;
        if (child.classList.contains('pin--active')) {
          child.classList.remove('pin--active');
        }

      });
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


      // Добавляет класс .pin--active к объекту события
      var element = evt.target;
      if (!element.classList.contains('pin')) {
        element = element.parentNode;
      }
      element.classList.add('pin--active');

      // показываем карточку
      if (element.dataset.index) {
        window.showCard.getCardInformation(pins[element.dataset.index]);
      }

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


    var address = document.querySelector('#address');
    var pinMain = document.querySelector('.pin__main');


    pinMain.addEventListener('mousedown', function (evt) {

      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

       // Расстояние, которое успела преодолеть мышка между соседними событиями mousemove(Смещение)
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
       // Перезатирает объет со стартовыми координатами
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };


        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

        var ICON_WIDTH = 75;// Ширина div контейнера
        var ICON_HEIGHT = 94;// Высота div контейнера

        var newPinCoordinateY = parseInt(pinMain.style.top, 10) + ICON_HEIGHT;
        var newPinCoordinateX = parseInt(pinMain.style.left, 10) + ICON_WIDTH / 2;

        address.value = 'X: ' + newPinCoordinateX + ' px, Y: ' + newPinCoordinateY + ' px';

      };


      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();


        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);


    });
  };
})();


