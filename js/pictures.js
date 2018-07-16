'use strict';

(function () {
  var QUANTITY_OF_PICTURES = 25;
  var fragment = document.createDocumentFragment();
  var pictureTemplate = document.querySelector('#picture').content;
  var picturesContainer = document.querySelector('.pictures');

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

  var renderElements = function (pictures) {
    for (var i = 0; i < QUANTITY_OF_PICTURES; ++i) {
      fragment.appendChild(generatePreviewNode(pictures[i]));
    }

    picturesContainer.appendChild(fragment);
  };

  window.backend.load(
      function (pictures) {
        renderElements(pictures);
      },
      window.utils.errorHandler
  );
})();
