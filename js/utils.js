'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var TIMEOUT = 3000;

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
    },
    shuffleArray: function (arr) {
      var newArray = arr.slice();
      for (var i = newArray.length - 1; i > 0; --i) {
        var num = Math.floor(Math.random() * (i + 1));
        var d = newArray[num];
        newArray[num] = newArray[i];
        newArray[i] = d;
      }
      return newArray;
    },
    arrayToLowerCase: function (arr) {
      var newArray = [];
      arr.forEach(function (element) {
        newArray.push(element.toLowerCase());
      });
      return newArray;
    },
    removeDuplicatesFromArray: function (arr) {
      return arr.filter(function (element, index, self) {
        return self.indexOf(element) === index;
      });
    },
    changeActiveElement: function (element, neighbors, className) {
      neighbors.forEach(function (item) {
        item.classList.remove(className);
      });
      element.classList.add(className);
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');

      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;

      document.body.insertAdjacentElement('afterbegin', node);

      setTimeout(function () {
        node.remove();
      }, TIMEOUT);
    }
  };
})();
