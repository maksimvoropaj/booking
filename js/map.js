"use strict"

var ads = [];
var NUMBER_OF_ADS = 8;


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
var MIN_X_LOCATION = 300;
var MAX_X_LOCATION = 900;
var MIN_Y_LOCATION = 100;
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
  for (var i = 0; i = newArrayLength; i++) {
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
