'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },
    getRandomArrayElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };
})();
