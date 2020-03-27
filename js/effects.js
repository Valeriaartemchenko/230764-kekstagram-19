'use strict';

(function(){
/*  -----------------наложение эфекта на изображение-----------------------------------------*/
  var imageUploadPreview = document.querySelector('.img-upload__preview img');
  var effectsRadioSet = document.querySelector('.effects');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var clearEffects = function (element) {
    element.removeAttribute('class');
    imageUploadPreview.style = '';
    imageUploadPreview.style.transform = 'scale(' + scaleControlValue.value.slice(0,-1) / 100 + ')'; // чтобы размер изображения не сбрасывался до 100%
    console.log(scaleControlValue.value);
  };

  var hideAndShowSlider = function (effect) {
    if (effect === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  };

  var effectChoiseHandler = function (evt) {
    window.util.setDefaultEffectLevel();
    clearEffects(imageUploadPreview);
    var effectName = evt.target.value;
    imageUploadPreview.classList.add('effects__preview--' + effectName);
    hideAndShowSlider(effectName);
  };

  effectsRadioSet.addEventListener('click', effectChoiseHandler);

})();
