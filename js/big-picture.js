'use strict';

(function () {
  var AVATARS_COUNT = 6;
  var COMMENTS_DISPLAYED_AT_TIME = 5;
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = document.querySelector('#picture-cancel');
  var loadMoreComments = bigPicture.querySelector('.social__loadmore');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');

  var showBigPicture = function (picture) {
    var commentsContainer = bigPicture.querySelector('.social__comments');
    var commentTemplate = bigPicture.querySelector('.social__comment');
    var commentsFragment = document.createDocumentFragment();

    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

    commentsContainer.innerHTML = '';

    var commentsCount = picture.comments.length > COMMENTS_DISPLAYED_AT_TIME ? COMMENTS_DISPLAYED_AT_TIME : picture.comments.length;

    for (var i = 0; i < commentsCount; ++i) {
      commentTemplate.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomNumber(1, AVATARS_COUNT) + '.svg';
      commentTemplate.querySelector('.social__text').textContent = picture.comments[i];

      commentsFragment.appendChild(commentTemplate.cloneNode(true));
    }

    commentsContainer.appendChild(commentsFragment);


    bigPicture.querySelector('.social__caption').textContent = picture.description;
    socialCommentCount.classList.add('visually-hidden');
    loadMoreComments.classList.add('visually-hidden');
  };

  var onBigPhotoEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeBigPhoto);
  };

  var closeBigPhoto = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  window.bigPictureOpen = function (evt, targetElem) {
    evt.preventDefault();

    showBigPicture(targetElem);

    document.addEventListener('keydown', onBigPhotoEscPress);
    pictureCancel.addEventListener('click', function () {
      closeBigPhoto();
    });
    pictureCancel.addEventListener('keydown', function (closeEvt) {
      window.utils.isEnterEvent(closeEvt, closeBigPhoto);
    });
  };
})();
