'use strict';

(function () {
  var AVATARS_COUNT = 6;
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = document.querySelector('#picture-cancel');

  var showBigPicture = function (picture) {
    var commentsContainer = bigPicture.querySelector('.social__comments');
    var commentTemplate = bigPicture.querySelector('.social__comment');
    var commentsFragment = document.createDocumentFragment();

    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

    commentsContainer.innerHTML = '';

    for (var i = 0; i < picture.comments.length; ++i) {
      commentTemplate.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomNumber(1, AVATARS_COUNT) + '.svg';
      commentTemplate.querySelector('.social__text').textContent = picture.comments[i];

      commentsFragment.appendChild(commentTemplate.cloneNode(true));
    }

    commentsContainer.appendChild(commentsFragment);

    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
  };

  var onBigPhotoEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeBigPhoto);
  };

  var closeBigPhoto = function () {
    bigPicture.classList.add('hidden');

    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  window.bigPictureOpen = function (evt, targetElem) {
    evt.preventDefault();

    showBigPicture(targetElem);

    document.addEventListener('keydown', onBigPhotoEscPress);
  };

  pictureCancel.addEventListener('click', function () {
    closeBigPhoto();
  });

  pictureCancel.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closeBigPhoto);
  });
})();
