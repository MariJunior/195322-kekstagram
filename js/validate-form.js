'use strict';

(function () {
  var ERROR_BORDER = '2px solid red';
  var HASHTAG_MAX_COUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;

  var userHashtags = document.querySelector('.img-upload__overlay .text__hashtags');

  var validateHashtags = function (arr) {
    if (!userHashtags.value) {
      return '';
    }

    if (arr.length > HASHTAG_MAX_COUNT) {
      return 'Хэш-тегов должно быть не больше пяти.';
    }

    for (var j = 0; j < arr.length; ++j) {
      if (arr[j] === '#') {
        return 'Хэш-тег не может состоять из одной только решётки. Удалите лишний символ или дополните его.';
      } else if (arr[j].charAt(0) !== '#') {
        return 'Хэш-тег ' + arr[j] + ' должен начинаться с символа "#".';
      } else if (arr[j].slice(1).indexOf('#') !== -1) {
        return 'Хэш-теги ' + arr[j] + ' должны быть разделены пробелом.';
      } else if (arr[j].length > HASHTAG_MAX_LENGTH) {
        return 'Максимальная длина одного хэш-тега составляет 20 символов, включая символ "#". Сократите хэш-тег ' + arr[j] + '.';
      }
    }

    var arrLowerCase = window.utils.arrayToLowerCase(arr);
    var uniqueArray = window.utils.removeDuplicatesFromArray(arrLowerCase);

    if (arr.length !== uniqueArray.length) {
      return 'Один и тот же хэш-тег не может быть использован дважды (теги не чувствительны к регистру).';
    }

    return '';
  };

  userHashtags.addEventListener('input', function () {
    var hashtags = userHashtags.value.replace(/\s+/g, ' ').trim();
    var hashtagsArr = hashtags.split(' ');

    userHashtags.style.border = 'none';
    userHashtags.setCustomValidity('');

    var errorMessage = validateHashtags(hashtagsArr);

    if (errorMessage !== '') {
      userHashtags.style.border = ERROR_BORDER;
      userHashtags.setCustomValidity(errorMessage);
    }
  });
})();
