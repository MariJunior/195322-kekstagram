'use strict';

(function () {
  var userHashtags = document.querySelector('.img-upload__overlay .text__hashtags');

  var validateHashtags = function (arr) {
    var arrLowerCase = window.utils.arrayToLowerCase(arr);
    var uniqueArray = window.utils.removeDuplicatesFromArray(arrLowerCase);

    if (arr.length > 5) {
      userHashtags.style.border = '3px solid red';
      userHashtags.setCustomValidity('Хэш-тегов должно быть не больше пяти.');
    }

    if (arr.length !== uniqueArray.length) {
      userHashtags.style.border = '3px solid red';
      userHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды (теги не чувствительны к регистру).');
    }

    for (var j = 0; j < arr.length; ++j) {
      if (arr[j] === '#') {
        userHashtags.style.border = '3px solid red';
        userHashtags.setCustomValidity('Хэш-тег не может состоять из одной только решётки. Удалите лишний символ или дополните его.');
      } else if (arr[j].charAt(0) !== '#') {
        userHashtags.style.border = '3px solid red';
        userHashtags.setCustomValidity('Хэш-тег ' + arr[j] + ' должен начинаться с символа "#".');
      } else if (arr[j].slice(1).indexOf('#') !== -1) {
        userHashtags.style.border = '3px solid red';
        userHashtags.setCustomValidity('Хэш-теги ' + arr[j] + ' должны быть разделены пробелом.');
      } else if (arr[j].length > 20) {
        userHashtags.style.border = '3px solid red';
        userHashtags.setCustomValidity('Максимальная длина одного хэш-тега составляет 20 символов, включая символ "#". Сократите хэш-тег ' + arr[j] + '.');
      } else {
        userHashtags.style.borderColor = 'transparent';
        userHashtags.setCustomValidity('');
      }
    }
  };

  userHashtags.addEventListener('input', function () {
    var hashtagsArr = userHashtags.value.split(' ');
    userHashtags.style.borderColor = 'transparent';
    userHashtags.setCustomValidity('');
    validateHashtags(hashtagsArr);
  });
})();
