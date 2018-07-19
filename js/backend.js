'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var SAVE_URL = 'https://js.dump.academy/kekstagram';
  var Status = {
    SUCCESS: 200,
    ERROR_BAD_REQUEST: 400,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };
  var TIMEOUT = 10000;

  var request = function (onSuccess, onError, url, method, data, onUploading) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Status.ERROR_BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case Status.NOT_FOUND_ERROR:
          onError('Ничего не найдено');
          break;
        case Status.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
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

    if (onUploading) {
      xhr.upload.addEventListener('progress', onUploading);
    }

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      request(onLoad, onError, LOAD_URL, 'GET');
    },
    save: function (data, onLoad, onError, onUploading) {
      request(onLoad, onError, SAVE_URL, 'POST', data, onUploading);
    }
  };
})();
