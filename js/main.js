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
var createPhotoDescription = function (amount) {
  var photoDescription = [];
  for (var i = 0; i < amount; i++) {
    photoDescription.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'some description',
      likes: getRandomNumber(MAX_LIKES) + MIN_LIKES,
      comments: createCommentsList(getRandomNumber(3) + 1)
    });
  }
  return photoDescription;
};
// создаем масив из 25 описаний фотографии
var photoDescription = createPhotoDescription(DESCRIPTION_ARRAY_LENGTH);
console.log(photoDescription);

// создание dom елемента

var usersPicturesList = document.querySelector('.pictures');
var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


var createUsersPictures = function (amount, photo) {
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

usersPicturesList.appendChild(createUsersPictures(DESCRIPTION_ARRAY_LENGTH, photoDescription));

/* ----------------task 3---------------- */
// просморт фото в полноэкранном режиме
var bigPhoto = document.querySelector('.picture');
var previewPhoto = document.querySelector('.big-picture');
var previewPhotoImage = previewPhoto.querySelector('.big-picture__img');
var likesCount = previewPhoto.querySelector('.likes-count');
var commentsCount = previewPhoto.querySelector('.comments-count');
var socialCaption = previewPhoto.querySelector('.social__caption');
var socialComments = previewPhoto.querySelector('.social__comments');
var socialPicture = previewPhoto.querySelector('.social__picture');
var socialText = previewPhoto.querySelector('.social__text');
var closePreviewButton = previewPhoto.querySelector('.cancel');
var picture = photoDescription[0];

var createBigPicture = function (photo) {
  previewPhotoImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
};

var createCommentsElement = function (photo) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photo.comments.length; i++) {
    var commentElement = document.querySelector('.social__comment').cloneNode(true);
    socialPicture.src = photo.comments[i].avatar;
    socialPicture.alt = photo.comments[i].name;
    socialText.textContent = photo.comments[i].message;
    fragment.appendChild(commentElement);
  }
  return fragment;
};

function createComments(photo) {
  var fragment = createCommentsElement(photo);
  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
}

createBigPicture(picture);
createComments(picture);

/* ----------------скрыть или показать попап большого изображения---------------- */
var ESC_KEYCODE = 27;

// открытие
var showElement = function (element) {
  element.classList.remove('hidden');
};

// закрытие
var hideElement = function (element) {
  element.classList.add('hidden');
};

bigPhoto.addEventListener('click', function () {
  showElement(previewPhoto);
});

closePreviewButton.addEventListener('click', function () {
  hideElement(previewPhoto);
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideElement(previewPhoto);
  }
});

hideElement(previewPhoto.querySelector('.social__comment-count'));
hideElement(previewPhoto.querySelector('.comments-loader'));

// --------------------загрузка нового изображения на сайт------задание 4
var upload = document.querySelector('.img-upload');
var uploadFileInput = upload.querySelector('#upload-file');
var imageEditingForm = upload.querySelector('.img-upload__overlay');
var closeEditingFormButton = imageEditingForm.querySelector('#upload-cancel');

// обработник нажатия клавиши escape
var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideForm();
  }
};

// показать форму редактирования
var showForm = function () {
  //  showElement(imageEditingForm); //какой варинт лучше?
  imageEditingForm.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);
};

// скрыть форму редактирования
var hideForm = function () {
  //  hideElement(imageEditingForm);
  imageEditingForm.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscPress);
  uploadFileInput.value = ''; // сброс поля
};

// при выборе фото открываем форму редактирования
uploadFileInput.addEventListener('change', function () {
  showForm();
});

// при нажатии на крестик форма скрывается
closeEditingFormButton.addEventListener('click', function () {
  hideForm();
});
