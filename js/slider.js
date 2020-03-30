'use strict';

(function(){
  var LINE_WIDTH = 495;
  var LEFT_OFFSET = 397;
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


  effectLevelPin.addEventListener('mousedown', function(evt){
    evt.preventDefault();

    var pinLevelMouseMoveHandler = function (moveevt) {
      var mouseMoveCoordinate = moveevt.clientX - LEFT_OFFSET;
      var effectLevelPosition = Math.floor(mouseMoveCoordinate / (LINE_WIDTH-18) * 100);
      effectLevelValue.value = effectLevelPosition;
      effectLevelPin.style.left = effectLevelPosition + '%';
      effectLevelDepth.style.width = effectLevelPosition + '%';
      changeFilterStyle(effectLevelPosition);
  };

    var pinLevelUpHandler = function(upEvt){
      effectLevel.removeEventListener('mousemove', pinLevelMouseMoveHandler);
      effectLevel.removeEventListener('mouseup', pinLevelUpHandler);
    };

    effectLevel.addEventListener('mousemove', pinLevelMouseMoveHandler);
    effectLevel.addEventListener('mouseup', pinLevelUpHandler);
  });
})();




