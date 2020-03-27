'use strict';

(function(){
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
    for (var j = 0; j < amount; j++) {
      photos.push({
        url: 'photos/' + (j + 1) + '.jpg',
        description: 'some description',
        likes: getRandomNumber(MAX_LIKES) + MIN_LIKES,
        comments: createCommentsList(getRandomNumber(3) + 1)
      });
    }
    return photos;
  };

  // создаем масив из 25 описаний фотографии
  var photos = createPhotos(DESCRIPTION_ARRAY_LENGTH);

  window.data = {
    photos: photos
  };

})();









