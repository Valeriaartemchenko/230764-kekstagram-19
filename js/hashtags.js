'use strict';

(function(){
  /* ---------------------------валидация хештегов-----------*/
  var hashtags = document.querySelector('.text__hashtags');
  var comments = document.querySelector('.text__description');
  var uploadSubmit = document.querySelector('.img-upload__submit');

  // Функция для записи строки хештегов в массив
  var getHashtags = function (inputString) {
    var hashtagsArray = inputString.toLowerCase().split(' ');
    if (hashtagsArray[0] !== '') {
      return hashtagsArray;
    }
    return 0;
  };

  // функция для удаления похожих ошибок(одинаковых элементов массива)
  var removeDuplicates = function (array) {
    var result = [];
    array.forEach(function (item) {
      if (!result.includes(item)) {
        result.push(item);
      }
    });
    return result;
  };

  var checkHashSigns = function (hashtagsInput) {
    var pattern = /^[a-zA-Z0-9]*$/; // регулярное выраженик для проверки содержит ли строка буквы и цифры
    var errors = []; // массив куда записываем все сообщения об ошибке
    var hashtagsRepeat = []; // массив для проверки повторяющихся хештегов

    if (hashtagsInput.length > 5) {
      errors.push('Нельзя указать больше пяти хэш-тегов. ');
    }

    if (hashtagsInput[hashtagsInput.length - 1] === '') { // если последний элемент массива пустая строка, то она автоматически удаляется и нет сообщения об ошибке
      hashtagsInput.pop();
    }

    if (hashtagsInput.includes('')) {
      errors.push('Хеш-тег не может содержать пробелы. '); // если же пустых строк две, то ошибка валидации
    }

    hashtagsInput.forEach(function (hashtag) {

      if (!hashtagsRepeat.includes(hashtag)) {
        hashtagsRepeat.push(hashtag);
      } else {
        errors.push('Хэш-теги не должны повторятся. ');
      }

      if (!hashtag.startsWith('#')) {
        errors.push('Хэш-тег должен начинается с символа # (решётка). ');
      } else {
        var hashForCheck = hashtag.substr(1);
        if (!hashForCheck.match(pattern)) {
          errors.push('Хеш-тег должен состоять из букв и чисел. ');
        }
      }

      if (hashtag.startsWith('#') && hashtag.length < 2) {
        errors.push('Хеш-тег не может состоять только из одной решётки. ');
      }

      if (hashtag.length > 20) {
        errors.push('Максимальная длина одного хэш-тега 20 символов, включая решётку. ');
      }
    });

    return errors;
  };


  var checkHashtag = function () {
    var hashtagsArray = getHashtags(hashtags.value) || [];
    var errors = removeDuplicates(checkHashSigns(hashtagsArray));
    hashtags.setCustomValidity(errors.join(' \n'));
  };

  uploadSubmit.addEventListener('click', function () {
    checkHashtag();
  });
})();
