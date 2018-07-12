'use strict';

(function () {
  var userHashtags = document.querySelector('.img-upload__overlay .text__hashtags');

  var checkUniqueValues = function (array) {
    var k = 0;
    while (k < array.length - 1) {
      if (array.indexOf(array[k], k + 1) > -1) {
        return false;
      }
      k++;
    }
    return true;
  };

  var validateHashtags = function (arr) {
    var arrLowerCase = [];
    for (var i = 0; i < arr.length; ++i) {
      arrLowerCase[i] = arr[i].toLowerCase();
    }
    userHashtags.setCustomValidity('');
    if (arr.length > 5) {
      userHashtags.setCustomValidity('Хэш-тегов должно быть не больше пяти.');
    }
    if (!checkUniqueValues(arrLowerCase)) {
      userHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды (теги не чувствительны к регистру).');
    }
    for (var j = 0; j < arr.length; ++j) {
      if (arr[j] === '#') {
        userHashtags.setCustomValidity('Хэш-тег не может состоять из одной только решётки. Удалите лишний символ или дополните его.');
      } else if (arr[j].charAt(0) !== '#') {
        userHashtags.setCustomValidity('Хэш-тег ' + arr[j] + ' должен начинаться с символа "#".');
      } else if (arr[j].slice(1).indexOf('#') !== -1) {
        userHashtags.setCustomValidity('Хэш-теги ' + arr[j] + ' должны быть разделены пробелом.');
      } else if (arr[j].length > 20) {
        userHashtags.setCustomValidity('Максимальная длина одного хэш-тега составляет 20 символов, включая символ "#". Сократите хэш-тег ' + arr[j] + '.');
      }
    }
  };

  userHashtags.addEventListener('input', function () {
    var hashtagsArr = userHashtags.value.split(' ');
    validateHashtags(hashtagsArr);
  });
})();
