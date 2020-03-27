'use strict';

(function(){
  var DEFAULT_SCALE_VALUE = 100;
  var MAX_SCALE_VALUE = 100;
  var MIN_SCALE_VALUE = 25;
  var SCALE_VALUE_CHANGE_STEP = 25;

  var upload = document.querySelector('.img-upload');
  var scaleControlSmaller = upload.querySelector('.scale__control--smaller');
  var scaleControlBigger = upload.querySelector('.scale__control--bigger');
  var scaleControlValue = upload.querySelector('.scale__control--value');
  var imageUploadPreview = upload.querySelector('.img-upload__preview img');
  var currentScaleValue = DEFAULT_SCALE_VALUE;

  scaleControlValue.value = currentScaleValue + '%';

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
    currentScaleValue = reduceScaleValue(currentScaleValue, SCALE_VALUE_CHANGE_STEP, MIN_SCALE_VALUE);
    scaleControlValue.value = currentScaleValue + '%';
    imageUploadPreview.style.transform = 'scale(' + currentScaleValue / 100 + ')';
  };

  var increaseClickHandler = function () {
    currentScaleValue = increaseScaleValue(currentScaleValue, SCALE_VALUE_CHANGE_STEP, MAX_SCALE_VALUE);
    scaleControlValue.value = currentScaleValue + '%';
    imageUploadPreview.style.transform = 'scale(' + currentScaleValue / 100 + ')';
  };


  scaleControlSmaller.addEventListener('click', function () {
    reduceClickHandler();
  });


  scaleControlBigger.addEventListener('click', function () {
    increaseClickHandler();
  });

})();
