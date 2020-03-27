'use strict';

(function(){
  const myMap = new Map();
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img').firstElementChild;
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');

  var closePreviewBtn = document.querySelector('.big-picture__cancel');
  //var pictures = document.querySelectorAll('.picture');
  var picturesImg = document.querySelectorAll('.picture__img');

  var renderBigPicture = function (picture) {
    bigPictureImg.src = picture.url; //строка записывает в src большого изображения,то что было передано в обьекте
    likesCount.textContent = picture.likes;
    commentCount.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;
  };

  // Реализация возможности просмотра любой фотографии в полноразмерном режиме;
  // создаем обьект map в котором будем привязывать к значению evt.target (изображения по которому кликнули) значение из обьета photos, где хранятся все данный об изображении

  picturesImg.forEach(function(item,index){
    // присваиваем каждому элементу коллекции изображений идентификатор, для того чтобы позже использовать привязку к обьекту. Тут именно изображение, потому что при клике в evt.target будет изображение, а не ссылка picture
    item.classList.add('pictureImg'+index);
    // присваиваем каждому элементу коллекции изображений обьект которые это изображение описывает
    myMap.set(item, window.data.photos[index]);
  });

  var imageClickHandler = function (evt) {
    if (evt.target.matches('.picture__img')) {
      // записываю в переменную полученное значение обьекта
      var objectToRender = myMap.get(evt.target);
      // рендерю большое изображение
      renderBigPicture(objectToRender);
      // показываю элемент
      window.util.showElement(bigPicture);
      window.util.checkModalOpen(bigPicture);
    }
  };

  // для обработки нажатия на элемент в фокусе
  var focusedElementKeydownHandler = function(evt){
    var isFocused = document.activeElement;
    if (isFocused.classList.contains('picture')){
      var objectToRender = myMap.get(isFocused.firstElementChild); //тут
      renderBigPicture(objectToRender);
      window.util.showElement(bigPicture);
      window.util.checkModalOpen(bigPicture);
    };
  };

  //закрытие окна
  var closeBtnClickHandler = function () {
    window.util.hideElement(bigPicture);
    window.util.checkModalOpen(bigPicture);
  };

  var PreviewESCKeyPressHandler = function(evt){
    if (evt.keyCode === ESC_KEYCODE) {
      closeBtnClickHandler();
    };
  };

  // обработчик клика на изображение
  document.addEventListener('click', imageClickHandler);

  // обработка открытия изображения через нажатие на enter
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      focusedElementKeydownHandler();
    }
  });

  // обработка закрытия при нажатии на крестик
  closePreviewBtn.addEventListener('click', closeBtnClickHandler);

  document.addEventListener('keydown', PreviewESCKeyPressHandler);

  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  window.util.hideElement(socialCommentCount);
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  window.util.hideElement(commentsLoader);

})();
