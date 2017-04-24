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
      for (var i = 0; i < htmlCollection.length; i++) {
        var elementCollection = htmlCollection.item(i);
        if (elementCollection.classList.contains('pin--active')) {
          window.showCard.getCardInformation(pins[i]);
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


    var address = document.querySelector('#address');
    var pinMain = document.querySelector('.pin__main');


    pinMain.addEventListener('mousedown', function (evt) {

      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      address.setAttribute('value', 'X: ' + startCoords.x + 'Y: ' + startCoords.y);

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

        address.setAttribute('value', 'X: ' + startCoords.x + 'Y: ' + startCoords.y);


        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      };


      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        var endCoords = {
          x: upEvt.clientX,
          y: upEvt.clientY
        };

        address.setAttribute('value', 'X: ' + endCoords.x + ',Y: ' + endCoords.y);


        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);


    });
  };
})();

