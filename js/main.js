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

var test1 = createRandomComment(AVATARS, COMMENTS, NAMES);
console.log(test1);

// создаем массив из случайных комментариев
var createCommentsList = function (randomCommentsAmount) {
  var commentsList = [];
  for (var i = 0; i < randomCommentsAmount; i++) {
    commentsList.push(createRandomComment(AVATARS, COMMENTS, NAMES));
  }
  return commentsList;
};

var test2 = createCommentsList(3);
console.log(test2);

// var commentsList = createCommentsList();
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
console.log(photos);

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
var photoInPreview = photos[0];
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img').firstElementChild;
console.log(bigPictureImg);
var likesCount = bigPicture.querySelector('.likes-count');
var commentCount = bigPicture.querySelector('.comments-count');
var socialComments = bigPicture.querySelector('.social__comments');
var socialCaption = bigPicture.querySelector('.social__caption');

// открытие
var showElement = function (element) {
  element.classList.remove('hidden');
};

// закрытие
var hideElement = function (element) {
  element.classList.add('hidden');
};

//showElement(bigPicture);

var renderBigPicture = function(picture){
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
};

renderBigPicture(photoInPreview);

var socialCommentCount = bigPicture.querySelector('.social__comment-count');
hideElement(socialCommentCount);

var commentsLoader = bigPicture.querySelector('.comments-loader');
hideElement(commentsLoader);


//проаеряет открыто ли модальное окно, и если да выключает скрол  страницы
var checkModalOpen = function(element){
  if (!element.classList.contains('hidden')) {
    document.body.classList.add('modal-open');
    console.log('no scroll');
  } else {
    document.body.classList.remove('modal-open');
    console.log('scroll');
  }
}

/* ----------------скрыть или показать попап большого изображения---------------- */
var ESC_KEYCODE = 27;
var closePreviewBtn = document.querySelector('.big-picture__cancel');
var picture = document.querySelector('.picture');
console.log(picture);

// открытие элемента
var showElement = function (element) {
  element.classList.remove('hidden');
};

// закрытие элемента
var hideElement = function (element) {
  element.classList.add('hidden');
};


var closeBtnClickHandler = function(){
  hideElement(bigPicture);
  checkModalOpen(bigPicture);
}
//обработка закрытия при нажатии на крестик

closePreviewBtn.addEventListener('click', closeBtnClickHandler);
//закрытие при нажатии esc

document.addEventListener('keydown', function(evt){
  if (evt.keyCode === ESC_KEYCODE) {
    //hideElement(bigPicture);
    //checkModalOpen(bigPicture);
    closeBtnClickHandler();
  }
});

function imageClickHandler (evt) {
    if (evt.target.matches('.picture__img')) {
      //console.log(evt.target);
      showElement(bigPicture);
      checkModalOpen(bigPicture);
    }
  }

document.addEventListener('click', imageClickHandler);

/*-----------------------task 4.1 ----------------------*/

var upload = document.querySelector('.img-upload');
var uploadFileField = upload.querySelector('#upload-file');
var closeEditFormBtn = upload.querySelector('#upload-cancel');
var imageEditForm = upload.querySelector('.img-upload__overlay');

var editFormFieldChangeHandler = function (){
  showElement(imageEditForm);
  checkModalOpen(imageEditForm);
}

var closeEditFormClickHandler = function(){
  hideElement(imageEditForm);
  checkModalOpen(imageEditForm);
}

uploadFileField.addEventListener('change', editFormFieldChangeHandler);

closeEditFormBtn.addEventListener('click', closeEditFormClickHandler);

document.addEventListener('keydown', function(evt){
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditFormClickHandler();
  }
});


