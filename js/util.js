'use strict';

(function(){
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
      var DEFAULT_EFFECT_LEVEL = 100;
      var upload = document.querySelector('.img-upload');
      var effectLevelPin = upload.querySelector('.effect-level__pin');
      var effectLevelValue = upload.querySelector('.effect-level__value');
      var effectLevelDepth = upload.querySelector('.effect-level__depth');

      effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
      effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
      effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + '%';
    }
  };

})();
