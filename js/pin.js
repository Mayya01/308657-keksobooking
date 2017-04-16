'use strict';
window.renderPins = (function () {


// 1.Рисует пины на карте
  var getRenderPin = function (pins) {
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


  return {
    getRenderPin: getRenderPin
  };


})();

