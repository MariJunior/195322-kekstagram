'use strict';

(function () {
  var pictureUpload = document.querySelector('.img-upload');
  var userForm = pictureUpload.querySelector('.img-upload__form');

  var successHandler = function () {
    pictureUpload.classList.add('hidden');

    userForm.reset();
  };

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(userForm), successHandler, window.utils.errorHandler);
  });
})();
