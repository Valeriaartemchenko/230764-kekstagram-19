'use strict';

(function(){
  var DESCRIPTION_ARRAY_LENGTH = 25;

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

  usersPicturesList.appendChild(renderPictures(DESCRIPTION_ARRAY_LENGTH, window.data.photos));

})();
