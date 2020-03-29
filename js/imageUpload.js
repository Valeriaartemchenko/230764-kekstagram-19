'use strict';

(function(){
  var ESC_KEYCODE = 27;
  var upload = document.querySelector('.img-upload');
  var uploadFileField = upload.querySelector('#upload-file');
  var closeEditFormBtn = upload.querySelector('#upload-cancel');
  var imageEditForm = upload.querySelector('.img-upload__overlay');

  var hashtags = document.querySelector('.text__hashtags');
  var comments = document.querySelector('.text__description');

  var editFormFieldChangeHandler = function () {
    window.util.showElement(imageEditForm);
    window.util.checkModalOpen(imageEditForm);
    //при загрузке нового изображения размер сбрасивается до 100 - начальный уровень
    window.util.currentScaleValue = window.util.DEFAULT_EFFECT_LEVEL;
    window.util.setDefaultEffectLevel();
  };

  var closeEditFormClickHandler = function () {
    window.util.hideElement(imageEditForm);
    window.util.checkModalOpen(imageEditForm);
  };

  var FormESCKeyPresshandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeEditFormClickHandler();
    }
  };
  // если фокус находиться в поле хештега или комментария, то форма не закрывается при нажатии на esc
  var checkIsFocused = function(){
    var isFocused = document.activeElement;
    if (isFocused == hashtags || isFocused == comments){
      document.removeEventListener('keydown', FormESCKeyPresshandler);
    } else {
      document.addEventListener('keydown', FormESCKeyPresshandler);
    }
  };

  uploadFileField.addEventListener('change', editFormFieldChangeHandler);
  closeEditFormBtn.addEventListener('click', closeEditFormClickHandler);
  document.addEventListener('click', checkIsFocused);
})();
