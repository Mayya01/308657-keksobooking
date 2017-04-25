'use strict';
window.renderPins = (function () {


// 1.Рисует пины на карте
  var getRenderPin = function (pins) {
    document.querySelector('.tokyo__pin-map').innerHTML += getPinsHtml(pins);
  };

  // 2 . Генерирует html пинов
  var getPinsHtml = function (pinData) {
    var pinMapHtml = '';

    for (var i = 0; i < pinData.length; i++) {

      pinMapHtml += generetPinData(i, pinData[i]);
    }
    return pinMapHtml;
  };

    // Переопределет расположение пин, если он находится за пределами карты
  var editPinLocation = function (pinData) {
    var mainImageWidth = 1200;// Ширина Карты
    var mainImageHeight = 700;// Высота Карты
    var ICON_WIDTH = 75;// Ширина div контейнера
    var ICON_HEIGHT = 94;// Высота div контейнера
    var pinLocationX = pinData.location.x; // Расположение пина по оси х
    var pinLocationY = pinData.location.y;// Расположение пина по оси у

    var intendY = 46;

    var maxXLocation = mainImageWidth - ICON_WIDTH;// Максимально допустимое значение по оси х

    var borderY = mainImageHeight - intendY;// Граница

    var maxYLocation = borderY - ICON_HEIGHT;// Максимально допустимое значение по оси y

    if (pinLocationX > maxXLocation) {
      var pxCountInMainImageX = mainImageWidth - pinLocationX;
      var locationIntendX = ICON_WIDTH - pxCountInMainImageX;
      var optimalLocationX = pinLocationX - locationIntendX;
      pinData.location.x = optimalLocationX;
    } else if (pinLocationY > maxYLocation) {
      var pxCountInMainImageY = borderY - pinLocationY;
      var locationIntendY = ICON_HEIGHT - pxCountInMainImageY;
      var optimalLocationY = pinLocationY - locationIntendY;
      pinData.location.y = optimalLocationY;

    }
    return pinData;

  };

// 3. Генерирует html одного пина на основе информации о пине
  var generetPinData = function (index, pinData) {
    pinData = editPinLocation(pinData);


    return '<div data-index="' + index + '" title="' + pinData.offer.title + '" class="pin" style="top:' + pinData.location.y + 'px;left:' + pinData.location.x + 'px" ><img src="' + pinData.author.avatar + '" alt="Main Pin" class="rounded" width="40" height="44"></div>';
  };


  return {
    getRenderPin: getRenderPin
  };


})();


