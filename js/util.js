'use strict';

(function(){
  var DEFAULT_EFFECT_LEVEL = 100;
  var DEFAULT_SCALE_VALUE = 100;
  var upload = document.querySelector('.img-upload');
  var effectLevelPin = upload.querySelector('.effect-level__pin');
  var effectLevelValue = upload.querySelector('.effect-level__value');
  var effectLevelDepth = upload.querySelector('.effect-level__depth');
  var imageUploadPreview = upload.querySelector('.img-upload__preview img');


  var imageUploadPreview = document.querySelector('.img-upload__preview img');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var currentScaleValue = DEFAULT_SCALE_VALUE;
  window.util = {
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    },
    checkModalOpen: function (element) {
      if (!element.classList.contains('hidden')) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    },
    setDefaultEffectLevel:  function () {
      effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
      effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
      effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + '%';

      imageUploadPreview.removeAttribute('class');
      imageUploadPreview.style = '';

      scaleControlValue.value = window.util.currentScaleValue + '%';
      imageUploadPreview.style.transform = 'scale(' + window.util.currentScaleValue / 100 + ')';


    },
    currentScaleValue:currentScaleValue,
    DEFAULT_EFFECT_LEVEL:DEFAULT_EFFECT_LEVEL
  };

})();
