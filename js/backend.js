'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var SAVE_URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;

  var request = function (onSuccess, onError, url, method, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS_STATUS:
          onSuccess(xhr.response);
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      request(onLoad, onError, LOAD_URL, 'GET');
    },
    save: function (data, onLoad, onError) {
      request(onLoad, onError, SAVE_URL, 'POST', data);
    }
  };
})();
