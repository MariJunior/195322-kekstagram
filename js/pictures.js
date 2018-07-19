'use strict';

(function () {
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var QUANTITY_OF_PICTURES = 25;
  var NEW_PICTURES_COUNT = 10;
  var activeClass = 'img-filters__button--active';
  var picturesData;

  var fragment = document.createDocumentFragment();
  var pictureTemplate = document.querySelector('#picture').content;
  var picturesContainer = document.querySelector('.pictures');
  var picturesFilters = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');
  var filtersButtons = document.querySelectorAll('.img-filters__button');

  var generatePreviewNode = function (picturesItem) {
    var previewElement = pictureTemplate.querySelector('.picture__link').cloneNode(true);

    previewElement.querySelector('.picture__img').src = picturesItem.url;
    previewElement.querySelector('.picture__stat--likes').textContent = picturesItem.likes;
    previewElement.querySelector('.picture__stat--comments').textContent = picturesItem.comments.length;

    previewElement.addEventListener('click', function (evt) {
      window.bigPictureOpen(evt, picturesItem);
    });

    return previewElement;
  };

  var addPicturesDescriptions = function (pictures) {
    pictures.forEach(function (item) {
      item.description = window.utils.getRandomArrayElement(DESCRIPTIONS);
    });
  };

  var renderElements = function (pictures, quantity) {
    for (var i = 0; i < quantity; ++i) {
      fragment.appendChild(generatePreviewNode(pictures[i]));
    }

    picturesContainer.appendChild(fragment);
  };

  var chooseNewPosts = function (posts) {
    var mixedPosts = window.utils.shuffleArray(posts);
    return mixedPosts.slice(0, NEW_PICTURES_COUNT);
  };

  var sortByNumberOfComments = function (posts) {
    var newPosts = posts.slice();
    return newPosts.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  var cleanPosts = function () {
    var posts = document.querySelectorAll('.picture__link');
    posts.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  };

  var applyFilters = function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      window.utils.changeActiveElement(evt.target, filtersButtons, activeClass);
      cleanPosts();
      switch (evt.target.id) {
        case 'filter-popular':
          renderElements(picturesData, QUANTITY_OF_PICTURES);
          break;
        case 'filter-new':
          renderElements(chooseNewPosts(picturesData), NEW_PICTURES_COUNT);
          break;
        case 'filter-discussed':
          renderElements(sortByNumberOfComments(picturesData), QUANTITY_OF_PICTURES);
          break;
        default:
          break;
      }
    }
  };

  var showFilters = function () {
    picturesFilters.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', window.debounce(applyFilters));
  };

  window.backend.load(
      function (pictures) {
        picturesData = pictures;
        addPicturesDescriptions(pictures);
        renderElements(pictures, QUANTITY_OF_PICTURES);
        showFilters();
      },
      window.utils.errorHandler
  );
})();
