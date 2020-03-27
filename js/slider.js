'use strict';

(function(){
  var LINE_WIDTH = 495;
  var imageUploadPreview = document.querySelector('.img-upload__preview img');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevel = document.querySelector('.img-upload__effect-level');


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

})();
