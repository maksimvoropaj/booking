"use strict"

var ads = [];
var NUMBER_OF_ADS = 8;
var tokyoMap = document.body.querySelector('.map__pins');
var mapCard = document.querySelector('template').content;
var field = document.querySelectorAll('fieldset');

var fieldDisable = function () {
  for (var i = 0; i < field.length; i++) {
    field[i].setAttribute("disabled", "disabled");
  };
};
fieldDisable();




var AVATARNUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var TYPES = ['flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var CHECKS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'paking', 'washer', 'elevator', 'conditioner'];
var MIN_X_LOCATION = 100;
var MAX_X_LOCATION = 1000;
var MIN_Y_LOCATION = 300;
var MAX_Y_LOCATION = 500;


var getRandomEllemFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) - minNumber);
};


var getRandomLocation = function () {
  return {
    x: getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION),
    y: getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION)
  };
};

var getRandomArray = function (array) {
  var newArray = [];
  var arrayLength = array.length;
  var newArrayLength = getRandomNumber(1, array.length);
  for (var i = 0; i < newArrayLength; i++) {
    newArray[i] = array[i];
  }
  return newArray;
};


var getWithoutRepeat = function (array) {
  var index = getRandomNumber(0, array.length - 1);
  var randomResult = array[index];
  array.splice(index, 1);
  return randomResult;
};

var createAd = function () {
  var ad = {};
  ad.author = {};
  ad.author.avatar = 'img/avatars/user' + getWithoutRepeat(AVATARNUMBERS) + '.png';
  ad.location = getRandomLocation();
  ad.offer = {};
  ad.offer.title = getWithoutRepeat(TITLES);
  ad.offer.address = ad.location.x + ', ' + ad.location.y;
  ad.offer.price = getRandomNumber(MIN_PRICE, MAX_PRICE);
  ad.offer.type = getRandomEllemFromArray(TYPES);
  ad.offer.rooms = getRandomNumber(MIN_ROOMS, MAX_ROOMS);
  ad.offer.guests = getRandomNumber(MIN_GUESTS, MAX_GUESTS);
  ad.offer.checkin = getRandomEllemFromArray(CHECKS);
  ad.offer.checkout = getRandomEllemFromArray(CHECKS);
  ad.offer.features = getRandomArray(FEATURES);
  ad.offer.description = '';
  ad.offer.photos = [];
  return ad;
};

var createAllAds = function (num) {
  for (var i = 0; i < num; i++) {
    ads[i] = createAd();
  }
};

createAllAds(NUMBER_OF_ADS);


var createLabel = function (array) {
  var label = document.createElement('button');
  var labelImg = document.createElement('img');
  var imgWidth = 40;
  var imgHeight = 40;
  var labelStyleLeft = Math.abs(array.location.x) + imgWidth;
  var labelStyleTop = Math.abs(array.location.y) + imgHeight;

  label.classList.add('map__pin');
  label.setAttribute('style', 'left: ' + labelStyleLeft + 'px; top: ' + labelStyleTop + 'px;');

  labelImg.classList.add('rounded');
  labelImg.setAttribute('src', array.author.avatar);
  labelImg.setAttribute('width', imgWidth);
  labelImg.setAttribute('height', imgHeight);
  labelImg.setAttribute('tabIndex', '0');
  label.appendChild(labelImg);
  return label;
};

var createFragments = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createLabel(array[i]));
  }
  tokyoMap.appendChild(fragment);
};



var translateToRus = function(type) {
  if (type === 'flat'){
    return 'квартира';
  } else if (type === 'house') {
    return 'дом';
  } else {
    return 'бунгало';
  }
};


var renderMapCard  = function (array) {
  var mapCardEllement = mapCard.cloneNode(true);
  var offer = array.offer;

  mapCardEllement.querySelector('.popup__title').textContent = offer.title;
  mapCardEllement.querySelector('.popup__address').textContent = offer.address;
  mapCardEllement.querySelector('.popup__price').textContent = offer.price + ' &#x20bd' + '/ночь';
  mapCardEllement.querySelector('.popup__type').textContent = translateToRus(offer.type);
  mapCardEllement.querySelector('.popup__roomsguests').textContent = offer.guests + 'человек в ' + offer.rooms + ' комнтах';
  mapCardEllement.querySelector('.popup__time').textContent = 'Заезд после ' + offer.checkin + ' , выезд до ' + offer.checkout;
  for (var i = 0; i < offer.features.length; i++) {
    mapCardEllement.querySelector('.popup__features').appendChild(offer.features[i]);
  }
  mapCardEllement.querySelector('.popup__description').textContent = offer.description;
  return mapCardEllement;
};

var generateMapCard = function(advert) {
  var popup = document.querySelector('.popup');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderMapCard(advert));
  popup.parentNode.repleceChild(fragment, dialogPanel);

  var avatar = document.querySelector('.popup__avatar');
  avatar.setAttribute('src', advert.author.avatar);
};





var map = document.querySelector('.map');
var form = document.querySelector('.notice__form');



map.addEventListener('click', function(evt){
  if(map.classList.contains('map--faded')) {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    for (var i = 0; i < field.length; i++) {
      field[i].removeAttribute("disabled", "disabled");
    };
    createFragments(ads);
  }
});


var openPopupDialog = function(evt) {
  var clickedPinAvatar = evt.target;
  var clickedPinWrap = clickedPinAvatar.parentNode;

  if (clickedPinAvatar.classList.contains('rounded') && !(clickedPinWrap.classList.contains('pin__main'))) {
    var imageSrc = clickedPinAvatar.getAttribute('src');

    for (var i=0; i < ads.length; i++) {
      if (ads[i].author.avatar === imageSrc) {
        var index = i;
      }
    }
    generateMapCard(ads[index]);

    deleteClass(pins, 'pin--active');
    clickedPinWrap.classList.add('pin--active');
  }
};

tokyoMap.addEventListener('click', function(evt) {
  openPopupDialog(evt);
});






var form = document.querySelector('.notice__form');
var typeOfFlat = form.querySelector('#type');
var price = form.querySelector('#price');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var TIMES_MAP = {
  '12': '12',
  '13': '13',
  '14': '14'
};
var TYPES_MAP = {
  'flat': 1000,
  'bungalo': 0,
  'house': 5000,
  'palace': 10000
};
var GUEST_MAP = {
  '1': '1',
  '2': '2' || '1',
  '3': '2' || '1' || '3',
  '100': '0'
};


timeIn.addEventListener('change', function (evt) {
  timeOut.value = TIMES_MAP[timeIn.value];
});

typeOfFlat.addEventListener('change', function () {
  price.value = TYPES_MAP[typeOfFlat.value];
});

roomNumber.addEventListener('change', function () {
  capacity.value = GUEST_MAP[roomNumber.value];
});




form.addEventListener('invalid', function (evt) {
  evt.target.classList.add('error');
}, true);

form.addEventListener('change', function (evt) {
  if (evt.target.classList.contains('error')) {
    if (evt.target.validity.valid) {
      evt.target.classList.remove('error');
    }
  }
}, true);
