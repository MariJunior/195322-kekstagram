'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var uploadImage = picturesContainer.querySelector('#upload-file');
  var imageSettings = picturesContainer.querySelector('.img-upload__overlay');
  var uploadCancel = picturesContainer.querySelector('#upload-cancel');
  var resizeControlMinus = picturesContainer.querySelector('.resize__control--minus');
  var resizeControlPlus = picturesContainer.querySelector('.resize__control--plus');
  var resizeControlValue = picturesContainer.querySelector('.resize__control--value');
  var imageUploadPreview = picturesContainer.querySelector('.img-upload__preview');
  var imageUploadPreviewImg = imageUploadPreview.querySelector('img');
  var imageUploadScale = document.querySelector('.img-upload__scale');
  var effectsList = picturesContainer.querySelector('.effects__list');
  var effectName = '';
  var scalePin = imageUploadScale.querySelector('.scale__pin');
  var scaleLine = imageUploadScale.querySelector('.scale__line');
  var scaleLevel = imageUploadScale.querySelector('.scale__level');
  var ScaleParameters = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var onSettingsPopupEscPress = function (evt) {
    if (evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
      window.utils.isEscEvent(evt, closeSettings);
    }
  };

  var openSettings = function () {
    imageSettings.classList.remove('hidden');
    imageUploadScale.classList.add('hidden');
    imageUploadPreview.style.transform = 'scale(0.55)'; // Для соответствия значения в поле масштаба по умолчанию
    document.addEventListener('keydown', onSettingsPopupEscPress);
  };

  var closeSettings = function () {
    imageSettings.classList.add('hidden');
    document.removeEventListener('keydown', onSettingsPopupEscPress);
    uploadImage.value = '';
    resizeControlValue.value = '55%';
    imageUploadPreview.style.transform = '';
    imageUploadPreviewImg.className = '';
  };

  var resizeImage = function (sign) {
    var controlValue = resizeControlValue.value;
    controlValue = parseInt(controlValue, 10) - ScaleParameters.STEP * sign;
    if (controlValue > ScaleParameters.MAX) {
      controlValue = ScaleParameters.MAX;
    } else if (controlValue < ScaleParameters.MIN) {
      controlValue = ScaleParameters.MIN;
    }
    controlValue += '%';
    resizeControlValue.value = controlValue;
    imageUploadPreview.style.transform = 'scale(' + (parseInt(controlValue, 10) / 100) + ')';
  };

  var getPersentPositionLeft = function (targetElem, parentElem) {
    return (targetElem.offsetLeft / parentElem.offsetWidth).toFixed(2);
  };

  var setEffectDeep = function (effect, value) {
    var effectDeep = '';
    var effectsMaxValues = {
      marvinMax: 100,
      phobosMax: 3,
      heatMax: 3
    };
    if (effect === 'chrome') {
      effectDeep = 'grayscale(' + value + ')';
    } else if (effect === 'sepia') {
      effectDeep = 'sepia(' + value + ')';
    } else if (effect === 'marvin') {
      effectDeep = 'invert(' + (value * effectsMaxValues.marvinMax) + '%)';
    } else if (effect === 'phobos') {
      effectDeep = 'blur(' + (value * effectsMaxValues.phobosMax).toFixed(2) + 'px)';
    } else if (effect === 'heat') {
      effectDeep = 'brightness(' + (value * effectsMaxValues.heatMax).toFixed(2) + ')';
    }
    imageUploadPreviewImg.style.filter = effectDeep;
  };

  uploadImage.addEventListener('change', function () {
    openSettings();
  });

  uploadCancel.addEventListener('click', function () {
    closeSettings();
  });

  uploadCancel.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closeSettings);
  });

  resizeControlMinus.addEventListener('click', function () {
    resizeImage(1);
  });

  resizeControlPlus.addEventListener('click', function () {
    resizeImage(-1);
  });

  effectsList.addEventListener('change', function (evt) {
    effectName = evt.target.value;
    if (effectName === 'none') {
      imageUploadScale.classList.add('hidden');
    } else {
      // Нужно, чтобы после просмотра оригинала остальные фильтры продолжали работать
      imageUploadScale.classList.remove('hidden');
    }
    imageUploadPreviewImg.className = '';
    imageUploadPreviewImg.style = '';
    imageUploadPreviewImg.classList.add('effects__preview--' + effectName);
    var defaultPinValue = scaleLine.offsetWidth + 'px';
    scalePin.style.left = defaultPinValue;
    scaleLevel.style.width = defaultPinValue;
  });

  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var scalePinPositionLimits = {
      min: 0,
      max: scaleLine.offsetWidth
    };
    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;
      var positionValue = '';
      var effectValue = null;
      startX = moveEvt.clientX;
      if (moveEvt.clientX > scaleLine.getBoundingClientRect().right) {
        positionValue = scalePinPositionLimits.max + 'px';
      } else if (moveEvt.clientX < scaleLine.getBoundingClientRect().left) {
        positionValue = scalePinPositionLimits.min + 'px';
      } else {
        positionValue = (scalePin.offsetLeft - shiftX) + 'px';
      }
      scalePin.style.left = positionValue;
      scaleLevel.style.width = positionValue;
      effectValue = getPersentPositionLeft(scalePin, scaleLine);
      setEffectDeep(effectName, effectValue);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  scaleLine.addEventListener('click', function (upEvt) {
    upEvt.preventDefault();
    var coordX = upEvt.offsetX;
    var scaleLineWidth = scaleLine.offsetWidth;
    var positionValueClick = '';
    var effectValueClick = null;
    if (coordX >= 0 && coordX <= scaleLineWidth) {
      positionValueClick = (coordX / scaleLineWidth) * 100 + '%';
    }
    scalePin.style.left = positionValueClick;
    scaleLevel.style.width = positionValueClick;
    effectValueClick = getPersentPositionLeft(scalePin, scaleLine);
    setEffectDeep(effectName, effectValueClick);
  });
})();
