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
    if (!pinFirst) {
      return;
    }

    var similarOffer = document.querySelector('#offer-dialog').querySelector('.dialog__panel');

    var clonedSimilarLodgeTemplate = document.querySelector('#lodge-template').content.cloneNode(true);


    clonedSimilarLodgeTemplate.querySelector('.lodge__title').textContent = pinFirst.offer.title;

    clonedSimilarLodgeTemplate.querySelector('.lodge__address').textContent = pinFirst.address;

    clonedSimilarLodgeTemplate.querySelector('.lodge__price').innerHTML = pinFirst.offer.price + '&#x20bd;/ночь';

    clonedSimilarLodgeTemplate.querySelector('.lodge__type').textContent = getOfferType(pinFirst.offer.type);

    clonedSimilarLodgeTemplate.querySelector('.lodge__rooms-and-guests').textContent = ' Для ' + pinFirst.offer.guests + ' гостей в ' + pinFirst.offer.rooms + ' комнатах ';

    clonedSimilarLodgeTemplate.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + pinFirst.offer.checkin + ' , выезд до ' + pinFirst.offer.checkout;

    var fragment = document.createDocumentFragment();
    pinFirst.offer.features.forEach(function (element) {
      var spanFeature = document.createElement('span');
      spanFeature.className = 'feature__image feature__image--' + element;
      fragment.appendChild(spanFeature);
    });

    clonedSimilarLodgeTemplate.querySelector('.lodge__features').appendChild(fragment);

    clonedSimilarLodgeTemplate.querySelector('.lodge__description').textContent = pinFirst.offer.description;

    document.querySelector('.dialog__title img').setAttribute('src', pinFirst.author.avatar);

    similarOffer.innerHTML = '';
    similarOffer.appendChild(clonedSimilarLodgeTemplate);
  };

  return {
    getCardInformation: getCardInformation
  };

})();
