'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Андрей', 'Кристина', 'Артем', 'Александр', 'Маша', 'Аня', 'Татьяна', 'Владислав'];
var AVATARS = ['avatar-1.svg', 'avatar-2.svg', 'avatar-3.svg', 'avatar-4.svg', 'avatar-5.svg', 'avatar-6.svg'];
var DESCRIPTION_ARRAY_LENGTH = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200 - MIN_LIKES;

// получть cлучайное число в указанном диапазоне
var getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

// создаем случайный коментарий
var createRandomComment = function (avatarsArray, commentArray, namesArray) {
  return {
    avatar: 'img/' + avatarsArray[getRandomNumber(AVATARS.length - 1)],
    message: commentArray[getRandomNumber(COMMENTS.length - 1)],
    name: namesArray[getRandomNumber(NAMES.length - 1)]
  };
};

// создаем массив из случайных комментариев
var createCommentsList = function (randomCommentsAmount) {
  var commentsList = [];
  for (var i = 0; i < randomCommentsAmount; i++) {
    commentsList.push(createRandomComment(AVATARS, COMMENTS, NAMES));
  }
  return commentsList;
};

// функция для создания массива объектов из n-количеством описаний фотографий
var createPhotos = function (amount) {
  var photos = [];
  for (var i = 0; i < amount; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'some description',
      likes: getRandomNumber(MAX_LIKES) + MIN_LIKES,
      comments: createCommentsList(getRandomNumber(3) + 1)
    });
  }
  return photos;
};

// создаем масив из 25 описаний фотографии
var photos = createPhotos(DESCRIPTION_ARRAY_LENGTH);

// создание dom елемента
var usersPicturesList = document.querySelector('.pictures');
var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


var renderPictures = function (amount, photo) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < amount; i++) {
    var photoElement = userPictureTemplate.cloneNode(true);
    var image = photoElement.querySelector('.picture__img');
    image.src = photo[i].url;
    photoElement.querySelector('.picture__likes').textContent = photo[i].likes;
    photoElement.querySelector('.picture__comments').textContent = photo[i].comments.length; // тут длина масива commentsList
    fragment.appendChild(photoElement);
  }
  return fragment;
};

usersPicturesList.appendChild(renderPictures(DESCRIPTION_ARRAY_LENGTH, photos));

/* ----------------task 3---------------- */
var photoInPreview = photos[10];
console.log(photos);
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img').firstElementChild;
var likesCount = bigPicture.querySelector('.likes-count');
var commentCount = bigPicture.querySelector('.comments-count');
//  var socialComments = bigPicture.querySelector('.social__comments');
var socialCaption = bigPicture.querySelector('.social__caption');

// открытие
var showElement = function (element) {
  element.classList.remove('hidden');
};

// закрытие
var hideElement = function (element) {
  element.classList.add('hidden');
};

var renderBigPicture = function (picture) {
  bigPictureImg.src = picture.url; //строка под вопросом что она делает
  likesCount.textContent = picture.likes;
  commentCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
};

renderBigPicture(photoInPreview);

var socialCommentCount = bigPicture.querySelector('.social__comment-count');
hideElement(socialCommentCount);

var commentsLoader = bigPicture.querySelector('.comments-loader');
hideElement(commentsLoader);


// проаеряет открыто ли модальное окно, и если да выключает скрол  страницы
var checkModalOpen = function (element) {
  if (!element.classList.contains('hidden')) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
};

/* ----------------скрыть или показать попап большого изображения---------------- */
var ESC_KEYCODE = 27;
var closePreviewBtn = document.querySelector('.big-picture__cancel');
var pictures = document.querySelectorAll('.picture');

//присваиваем каждому элементу коллекции идентификатор, для того чтобы позже использовать привязку к обьекту
pictures.forEach(function(item,index){
  item.classList.add('picture'+index);
});

//закрытие окна
var closeBtnClickHandler = function () {
  hideElement(bigPicture);
  checkModalOpen(bigPicture);
};

// обработка закрытия при нажатии на крестик
closePreviewBtn.addEventListener('click', closeBtnClickHandler);

// закрытие при нажатии esc
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBtnClickHandler();
  }
});
/*
var imageClickHandler = function (evt) {
  if (evt.target.matches('.picture__img')) {
    //bigPicture.src = evt.target.src;
    //renderBigPicture(evt.target.src);
    console.log(evt.target.src);
    showElement(bigPicture);
    checkModalOpen(bigPicture);
  }
};
document.addEventListener('click', imageClickHandler);
*/
var relations = new Map();

//click = evt => console.log(relations.get(e.target));
var imageClick = function(evt){
  console.log(relations.get(evt.target));
}

photos.forEach(function(item, index){
  relations.set(document.querySelector('picture'+index), item)
});

document.querySelectorAll('picture').forEach(p => p.onclick = imageClick);
/*
pictures.forEach(function(item){
  item.addEventListener('click', imageClick);
});*/
/*  -----------------------task 4.1 ----------------------*/

var upload = document.querySelector('.img-upload');
var uploadFileField = upload.querySelector('#upload-file');
var closeEditFormBtn = upload.querySelector('#upload-cancel');
var imageEditForm = upload.querySelector('.img-upload__overlay');

var editFormFieldChangeHandler = function () {
  showElement(imageEditForm);
  checkModalOpen(imageEditForm);
  setDefaultEffectLevel();
};

var closeEditFormClickHandler = function () {
  hideElement(imageEditForm);
  checkModalOpen(imageEditForm);
};

uploadFileField.addEventListener('change', editFormFieldChangeHandler);

closeEditFormBtn.addEventListener('click', closeEditFormClickHandler);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditFormClickHandler();
  }
});

/* ------------task 4.2 изменение размера изображения----------*/

var scaleControlSmaller = upload.querySelector('.scale__control--smaller');
var scaleControlBigger = upload.querySelector('.scale__control--bigger');
var scaleControlValue = upload.querySelector('.scale__control--value');
var imageUploadPreview = upload.querySelector('.img-upload__preview img');

var DEFAULT_SCALE_VALUE = 100;
var MAX_SCALE_VALUE = 100;
var MIN_SCALE_VALUE = 25;
var SCALE_VALUE_CHANGE_STEP = 25;
var currentScaleValue = DEFAULT_SCALE_VALUE;

scaleControlValue.value = currentScaleValue + '%';

var reduceScaleValue = function (scaleValue, step, minValue) {
  if (scaleValue > minValue) {
    scaleValue = scaleValue - step;
    return scaleValue;
  } else {
    return scaleValue;
  }
};

var increaseScaleValue = function (scaleValue, step, maxValue) {
  if (scaleValue < maxValue) {
    scaleValue = scaleValue + step;
    return scaleValue;
  } else {
    return scaleValue;
  }
};

var reduceClickHandler = function () {
  currentScaleValue = reduceScaleValue(currentScaleValue, SCALE_VALUE_CHANGE_STEP, MIN_SCALE_VALUE);
  scaleControlValue.value = currentScaleValue + '%';
  imageUploadPreview.style.transform = 'scale(' + currentScaleValue / 100 + ')';
};

var increaseClickHandler = function () {
  currentScaleValue = increaseScaleValue(currentScaleValue, SCALE_VALUE_CHANGE_STEP, MAX_SCALE_VALUE);
  scaleControlValue.value = currentScaleValue + '%';
  imageUploadPreview.style.transform = 'scale(' + currentScaleValue / 100 + ')';
};


scaleControlSmaller.addEventListener('click', function () {
  reduceClickHandler();
});


scaleControlBigger.addEventListener('click', function () {
  increaseClickHandler();
});

/*  -----------------наложение эфекта на изображение-----------------------------------------*/
var effectLevelPin = upload.querySelector('.effect-level__pin');
var effectLevelValue = upload.querySelector('.effect-level__value');
var effectLevelDepth = upload.querySelector('.effect-level__depth');
var effectsRadioSet = upload.querySelector('.effects');
var effectLevel = upload.querySelector('.img-upload__effect-level');

var setDefaultEffectLevel = function () {
  var DEFAULT_EFFECT_LEVEL = 100;
  effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
  effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
  effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + '%';
};

var clearEffects = function (element) {
  element.removeAttribute('class');
  imageUploadPreview.style = '';
  imageUploadPreview.style.transform = 'scale(' + currentScaleValue / 100 + ')'; // чтобы размер изображения не сбрасывался до 100%
};

var hideAndShowSlider = function (effect) {
  if (effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

var effectChoiseHandler = function (evt) {
  setDefaultEffectLevel();
  clearEffects(imageUploadPreview);
  var effectName = evt.target.value;
  imageUploadPreview.classList.add('effects__preview--' + effectName);
  hideAndShowSlider(effectName);
};

effectsRadioSet.addEventListener('click', effectChoiseHandler);


/* ------------------слайдер-------------------*/

var LINE_WIDTH = 495;

var changeFilterStyle = function (effectLevelPosition) {
  if (document.querySelector('#effect-none:checked')) {
    imageUploadPreview.style.filter = '';
  } else if (document.querySelector('#effect-chrome:checked')) {
    imageUploadPreview.style.filter = 'grayscale(' + effectLevelPosition / 100 + ')';
  } else if (document.querySelector('#effect-sepia:checked')) {
    imageUploadPreview.style.filter = 'sepia(' + effectLevelPosition / 100 + ')';
  } else if (document.querySelector('#effect-marvin:checked')) {
    imageUploadPreview.style.filter = 'invert(' + effectLevelPosition + '%)';
  } else if (document.querySelector('#effect-phobos:checked')) {
    imageUploadPreview.style.filter = 'blur(' + 3 * effectLevelPosition / 100 + 'px)';
  } else if (document.querySelector('#effect-heat:checked')) {
    imageUploadPreview.style.filter = 'brightness(' + ((2 * effectLevelPosition / 100) + 1) + ')';
  }
};

var pinLevelClickHandler = function (evt) {
  var mouseupCoordinate = evt.offsetX;
  var effectLevelPosition = Math.floor((mouseupCoordinate / LINE_WIDTH) * 100);
  effectLevelValue.value = effectLevelPosition;
  effectLevelPin.style.left = effectLevelPosition + '%';
  effectLevelDepth.style.width = effectLevelPosition + '%';
  changeFilterStyle(effectLevelPosition);

};

effectLevel.addEventListener('mouseup', pinLevelClickHandler);

/*
var slider = document.getElementById('slider');
var item = slider.querySelector('#item');
var result = document.getElementById('result');

var sliderClientCoords = slider.getBoundingClientRect();
var sliderCoords = {};
sliderCoords.top = sliderClientCoords.top + pageYOffset;
sliderCoords.left = sliderClientCoords.left + pageXOffset;

item.onmousedown = function(e){
   item.ondragstart = function() {
      return false;
   };

   var itemClientCoords = item.getBoundingClientRect();
   var itemCoords = {};
   itemCoords.top = itemClientCoords.top + pageYOffset;
   itemCoords.left = itemClientCoords.left + pageXOffset;

   var right = slider.offsetWidth - item.offsetWidth;

   var shiftX = e.pageX - itemCoords.left;

   document.onmousemove = function(e){
      var newLeft = e.pageX - sliderCoords.left - shiftX;
      if(newLeft < 0) newLeft = 0;
      if(newLeft > right) newLeft = right;
      item.style.left = newLeft + 'px';
      result.innerHTML = Math.round(newLeft / right * 100) + '%';
return false;
   }

   document.onmouseup = function(){
      document.onmousemove = document.onmouseup = null;
   }
}*/

/* ---------------------------валидация хештегов-----------*/
var hashtags = document.querySelector('.text__hashtags');
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
