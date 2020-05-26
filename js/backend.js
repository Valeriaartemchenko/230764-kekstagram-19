'use strict';
(function (){
  var LOAD_URL = 'https://cors-anywhere.herokuapp.com/https://js.dump.academy/kekstagram/data';
  var OK_STATUS_CODE = 200;
  var REQUEST_TIMEOUT = 10000; //ms
  var dataPictures = [];
  window.backend = {
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === OK_STATUS_CODE) {
          onLoad(xhr.response);
        } else {
          throw new Error('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        throw new Error('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        throw new Error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = REQUEST_TIMEOUT; // 10s

      xhr.open('GET', LOAD_URL);
      xhr.send();

    },
    dataPictures: dataPictures
  };

})();

