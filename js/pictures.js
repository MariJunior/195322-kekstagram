'use strict';

(function () {
  var QUANTITY_OF_PICTURES = 25;
  var Likes = {
    MIN: 15,
    MAX: 200
  };
  var COMMENTS_PATTERNS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var DESCRIPTION_PATTERNS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var fragment = document.createDocumentFragment();
  var pictureTemplate = document.querySelector('#picture').content;
  var picturesContainer = document.querySelector('.pictures');

  var generateRandomComment = function (source) {
    var comments = [];
    var commentsQuantity = window.utils.getRandomNumber(1, source.length);
    var commentLength = window.utils.getRandomNumber(1, 2);
    for (var i = 0; i < commentsQuantity; ++i) {
      comments[i] = '';
      for (var j = 0; j < commentLength; ++j) {
        comments[i] += ' ' + window.utils.getRandomArrayElement(source);
      }
    }
    return comments;
  };

  var generatePictureData = function (pictureIndex) {
    return {
      url: 'photos/' + (pictureIndex + 1) + '.jpg',
      likes: window.utils.getRandomNumber(Likes.MIN, Likes.MAX),
      comments: generateRandomComment(COMMENTS_PATTERNS),
      description: window.utils.getRandomArrayElement(DESCRIPTION_PATTERNS)
    };
  };

  var generatePicturesPreview = function (picturesQuantity) {
    var picturesItems = [];
    for (var i = 0; i < picturesQuantity; ++i) {
      picturesItems[i] = generatePictureData(i);
    }
    return picturesItems;
  };

  var pictures = generatePicturesPreview(QUANTITY_OF_PICTURES);

  var generatePictures = function (picturesItem) {
    var previewElement = pictureTemplate.querySelector('.picture__link').cloneNode(true);
    previewElement.querySelector('.picture__img').src = picturesItem.url;
    previewElement.querySelector('.picture__stat--likes').textContent = picturesItem.likes;
    previewElement.querySelector('.picture__stat--comments').textContent = picturesItem.comments.length;
    previewElement.addEventListener('click', function (evt) {
      window.bigPictureOpen(evt, picturesItem);
    });
    return previewElement;
  };

  var renderPictures = function () {
    for (var i = 0; i < QUANTITY_OF_PICTURES; ++i) {
      fragment.appendChild(generatePictures(pictures[i]));
    }
    picturesContainer.appendChild(fragment);
  };

  renderPictures();
})();
