'use strict';

(function () {
  var ScaleParameter = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };
  var effectName = '';
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
  var scalePin = imageUploadScale.querySelector('.scale__pin');
  var scaleLine = imageUploadScale.querySelector('.scale__line');
  var scaleLevel = imageUploadScale.querySelector('.scale__level');

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

    controlValue = parseInt(controlValue, 10) - ScaleParameter.STEP * sign;

    if (controlValue > ScaleParameter.MAX) {
      controlValue = ScaleParameter.MAX;
    } else if (controlValue < ScaleParameter.MIN) {
      controlValue = ScaleParameter.MIN;
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
    var MaxValue = {
      MARVIN: 100,
      PHOBOS: 3,
      HEAT: 3
    };

    switch (effect) {
      case 'chrome':
        effectDeep = 'grayscale(' + value + ')';
        break;
      case 'sepia':
        effectDeep = 'sepia(' + value + ')';
        break;
      case 'marvin':
        effectDeep = 'invert(' + (value * MaxValue.MARVIN) + '%)';
        break;
      case 'phobos':
        effectDeep = 'blur(' + (value * MaxValue.PHOBOS).toFixed(2) + 'px)';
        break;
      case 'heat':
        effectDeep = 'brightness(' + (value * MaxValue.HEAT).toFixed(2) + ')';
        break;
      default:
        break;
    }

    imageUploadPreviewImg.style.filter = effectDeep;
  };

  var changeEffect = function () {
    var effectValue = getPersentPositionLeft(scalePin, scaleLine);

    setEffectDeep(effectName, effectValue);
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
      imageUploadScale.classList.remove('hidden');
    }

    imageUploadPreviewImg.className = '';
    imageUploadPreviewImg.style = '';

    imageUploadPreviewImg.classList.add('effects__preview--' + effectName);

    var defaultPinValue = scaleLine.offsetWidth + 'px';

    scalePin.style.left = defaultPinValue;
    scaleLevel.style.width = defaultPinValue;
  });

  window.initSlider(changeEffect);
})();
