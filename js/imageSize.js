'use strict';

(function(){
  var MAX_SCALE_VALUE = 100;
  var MIN_SCALE_VALUE = 25;
  var SCALE_VALUE_CHANGE_STEP = 25;

  var upload = document.querySelector('.img-upload');
  var scaleControlSmaller = upload.querySelector('.scale__control--smaller');
  var scaleControlBigger = upload.querySelector('.scale__control--bigger');
  var scaleControlValue = upload.querySelector('.scale__control--value');
  var imageUploadPreview = upload.querySelector('.img-upload__preview img');


  var reduceScaleValue = function (scaleValue, step, minValue) {
    if (scaleValue > minValue) {
      scaleValue = scaleValue - step;
      return scaleValue;
    } else {
      return scaleValue;
    }
  };

  var increaseScaleValue = function (scaleValue, step, maxValue) {
    if (scaleValue < maxValue) {
      scaleValue = scaleValue + step;
      return scaleValue;
    } else {
      return scaleValue;
    }
  };

  var reduceClickHandler = function () {
    window.util.currentScaleValue = reduceScaleValue(window.util.currentScaleValue, SCALE_VALUE_CHANGE_STEP, MIN_SCALE_VALUE);
    scaleControlValue.value = window.util.currentScaleValue + '%';
    imageUploadPreview.style.transform = 'scale(' + window.util.currentScaleValue / 100 + ')';
  };

  var increaseClickHandler = function () {
    window.util.currentScaleValue = increaseScaleValue(window.util.currentScaleValue, SCALE_VALUE_CHANGE_STEP, MAX_SCALE_VALUE);
    scaleControlValue.value = window.util.currentScaleValue + '%';
    imageUploadPreview.style.transform = 'scale(' + window.util.currentScaleValue / 100 + ')';
  };


  scaleControlSmaller.addEventListener('click', function () {
    reduceClickHandler();
  });


  scaleControlBigger.addEventListener('click', function () {
    increaseClickHandler();
  });

})();
