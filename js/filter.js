'use strict';

(function () {

  var form = document.querySelector('.tokyo__filters');
  var houstingType = form.querySelector('#housing_type');
  var houstingPrice = form.querySelector('#housing_price');
  var houstingRoomNumber = form.querySelector('#housing_room-number');
  var houstingGuestsNumber = form.querySelector('#housing_guests-number');
  var houstingFeatures = form.querySelector('#housing_features');
  var features = houstingFeatures.querySelectorAll('input[type=checkbox]');

  var PRICE_MIDDLE_START = 9999;
  var PRICE_MIDDLE_END = 50000;
  var PRICE_LOW_END = 10000;
  var PRICE_HIGH_START = 49999;
  var ANY = 'any';

  var getPrice = function (value) {
    var price = {};
    switch (value) {
      case 'middle':
        price.start = PRICE_MIDDLE_START;
        price.end = PRICE_MIDDLE_END;
        break;
      case 'low':
        price.end = PRICE_LOW_END;
        break;
      case 'high':
        price.start = PRICE_HIGH_START;
        break;
    }

    return price;
  };

  var getCheckboxValues = function () {
    var items = houstingFeatures.querySelectorAll('input[type=checkbox]:checked');
    var checkboxes = Array.from(items).map(function (it) {
      return it.value;
    });

    return checkboxes;
  };

  var filterData = function () {
    var price = getPrice(houstingPrice.value);


    var pinsFiltered = window.pins.filter(function (item) {
      if (houstingType.value !== ANY && item.offer.type !== houstingType.value) {
        return false;
      }
      if (typeof price.start !== 'undefined' && item.offer.price < price.start) {
        return false;
      }
      if (typeof price.end !== 'undefined' && item.offer.price > price.end) {
        return false;
      }
      if (houstingRoomNumber.value !== ANY && item.offer.rooms !== +houstingRoomNumber.value) {
        return false;
      }
      if (houstingGuestsNumber.value !== ANY && item.offer.guests !== +houstingGuestsNumber.value) {
        return false;
      }

      var hasFeatures = true;
      var checkboxSelected = getCheckboxValues();
      if (checkboxSelected.length) {
        checkboxSelected.forEach(function (feature) {
          if (item.offer.features.indexOf(feature) === -1) {
            hasFeatures = false;
          }
        });
      }

      return hasFeatures;
    });

    return pinsFiltered;
  };


  var onFilterChange = function () {

    document.querySelectorAll('.tokyo__pin-map div:not(.pin__main)').forEach(function (el) {
      el.parentNode.removeChild(el);
    });

    window.generateMap(filterData());
  };

  var setupFiltersEvents = function () {
    houstingType.addEventListener('change', onFilterChange);
    houstingPrice.addEventListener('change', onFilterChange);
    houstingRoomNumber.addEventListener('change', onFilterChange);
    houstingGuestsNumber.addEventListener('change', onFilterChange);

    for (var i = 0; i < features.length; i++) {
      features[i].addEventListener('change', onFilterChange);
    }
  };

  setupFiltersEvents();

})();
