'use strict';
window.showCard = (function () {


  function getOfferType(type) {
    if (type === 'flat') {
      return 'Квартира';
    } else if (type === 'house') {
      return 'Дом';
    } else if (type === 'bungalo') {
      return 'Бунгало';
    }
    return '';
  }

  var getCardInformation = function (pinFirst) {
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

    similarOffer.appendChild(clonedSimilarLodgeTemplate);
  };

  return {
    getCardInformation: getCardInformation
  };

})();
