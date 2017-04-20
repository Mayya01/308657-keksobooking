'use strict';


/*
 * Рендет точек на карте
 * https://up.htmlacademy.ru/javascript/9/tasks/9
 */


(function () {
  window.generateMap = function (pins) {

  //  рисуем отметки на карте
    window.renderPins.getRenderPin(pins);


  // рисуем информацию о первом элементе в блоке слева
    window.showCard.getCardInformation(pins[0]);

  // навешиваем события
    window.setPinEvents(pins);
  };
})();
