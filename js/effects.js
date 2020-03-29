'use strict';

(function(){
/*  -----------------наложение эфекта на изображение-----------------------------------------*/
  var imageUploadPreview = document.querySelector('.img-upload__preview img');
  var effectsRadioSet = document.querySelector('.effects');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var scaleControlValue = document.querySelector('.scale__control--value');


  var hideAndShowSlider = function (effect) {
    if (effect === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  };

  var effectChoiseHandler = function (evt) {
    window.util.setDefaultEffectLevel();
    var effectName = evt.target.value;
    imageUploadPreview.classList.add('effects__preview--' + effectName);
    hideAndShowSlider(effectName);
  };

  effectsRadioSet.addEventListener('click', effectChoiseHandler);

})();
