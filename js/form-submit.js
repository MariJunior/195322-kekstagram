'use strict';

(function () {
  var pictureUpload = document.querySelector('.img-upload');
  var userForm = pictureUpload.querySelector('.img-upload__form');
  var errorLinks = document.querySelector('.error__links');
  var errorTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
  var uploadTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--loading');


  var showPopup = function (popupTemplate) {
    var splash = popupTemplate.cloneNode(true);
    document.body.appendChild(splash);
    splash.classList.remove('hidden');
    splash.style.zIndex = '10';
    splash.style.position = 'fixed';
  };

  var hidePopups = function () {
    var popups = document.querySelectorAll('.img-upload__message');
    for (var i = 0; i < popups.length; i++) {
      popups[i].parentNode.removeChild(popups[i]);
    }
  };

  var chooseFurtherAction = function () {
    errorLinks.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.textContent === 'Попробовать снова') {
        hidePopups();
        window.backend.save(new FormData(userForm), successHandler, errorHandler, showPopup(uploadTemplate));
      } else if (evt.target.textContent === 'Загрузить другой файл') {
        hidePopups();
        userForm.removeEventListener('submit', onFormSubmit);
      }
    });
  };

  var successHandler = function () {
    pictureUpload.classList.add('hidden');

    userForm.reset();
    userForm.removeEventListener('submit', onFormSubmit);
    hidePopups();
  };

  var errorHandler = function () {
    showPopup(errorTemplate);
    chooseFurtherAction();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), successHandler, errorHandler, showPopup(uploadTemplate));
  };

  userForm.addEventListener('submit', onFormSubmit);
})();
