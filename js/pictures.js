'use strict';

var QUANTITY_OF_PICTURES = 25;
var LIKES = {
  min: 15,
  max: 200
};
var COMMENTS_PATTERNS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTION_PATTERNS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var AVATARS_COUNT = 6;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var fragment = document.createDocumentFragment();
var pictureTemplate = document.querySelector('#picture').content;
var picturesContainer = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var pictureCancel = document.querySelector('#picture-cancel');
var uploadImage = picturesContainer.querySelector('#upload-file');
var imageSettings = picturesContainer.querySelector('.img-upload__overlay');
var uploadCancel = picturesContainer.querySelector('#upload-cancel');
var resizeControlMinus = picturesContainer.querySelector('.resize__control--minus');
var resizeControlPlus = picturesContainer.querySelector('.resize__control--plus');
var resizeControlValue = picturesContainer.querySelector('.resize__control--value');
var imageUploadPreview = picturesContainer.querySelector('.img-upload__preview');
var imageUploadPreviewImg = imageUploadPreview.querySelector('img');
var effectsList = picturesContainer.querySelector('.effects__list');
var imageUploadScale = document.querySelector('.img-upload__scale');
var scalePin = imageUploadScale.querySelector('.scale__pin');
var scaleLine = imageUploadScale.querySelector('.scale__line');
var scaleValue = imageUploadScale.querySelector('.scale__value');
var SCALE = {
  min: 25,
  max: 100,
  step: 25
};
var userHashtags = imageSettings.querySelector('.text__hashtags');

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateRandomComment = function (source) {
  var comments = [];
  var commentsQuantity = getRandomNumber(1, source.length);
  var commentLength = getRandomNumber(1, 2);
  for (var i = 0; i < commentsQuantity; ++i) {
    comments[i] = '';
    for (var j = 0; j < commentLength; ++j) {
      comments[i] += ' ' + getRandomArrayElement(source);
    }
  }
  return comments;
};

var generatePictureData = function (pictureIndex) {
  return {
    url: 'photos/' + (pictureIndex + 1) + '.jpg',
    likes: getRandomNumber(LIKES.min, LIKES.max),
    comments: generateRandomComment(COMMENTS_PATTERNS),
    description: getRandomArrayElement(DESCRIPTION_PATTERNS)
  };
};

var generatePicturesPreview = function (picturesQuantity) {
  var picturesItems = [];
  for (var i = 0; i < picturesQuantity; ++i) {
    picturesItems[i] = generatePictureData(i);
  }
  return picturesItems;
};

var pictures = generatePicturesPreview(QUANTITY_OF_PICTURES);

var showBigPicture = function (picture) {
  var commentsContainer = bigPicture.querySelector('.social__comments');
  var commentTemplate = bigPicture.querySelector('.social__comment');

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

  commentsContainer.innerHTML = '';
  var commentsFragment = document.createDocumentFragment();
  for (var i = 0; i < picture.comments.length; ++i) {
    commentTemplate.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, AVATARS_COUNT) + '.svg';
    commentTemplate.querySelector('.social__text').textContent = picture.comments[i];
    commentsFragment.appendChild(commentTemplate.cloneNode(true));
  }
  commentsContainer.appendChild(commentsFragment);

  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
};

var onBigPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

var closeBigPhoto = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPhotoEscPress);
};

var generatePictures = function (picturesItem) {
  var previewElement = pictureTemplate.querySelector('.picture__link').cloneNode(true);
  previewElement.querySelector('.picture__img').src = picturesItem.url;
  previewElement.querySelector('.picture__stat--likes').textContent = picturesItem.likes;
  previewElement.querySelector('.picture__stat--comments').textContent = picturesItem.comments.length;
  previewElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    showBigPicture(picturesItem);
    document.addEventListener('keydown', onBigPhotoEscPress);
  });
  return previewElement;
};

var renderPictures = function () {
  for (var i = 0; i < QUANTITY_OF_PICTURES; ++i) {
    fragment.appendChild(generatePictures(pictures[i]));
  }
  picturesContainer.appendChild(fragment);
};

renderPictures();

pictureCancel.addEventListener('click', function () {
  closeBigPhoto();
});

pictureCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeBigPhoto();
  }
});

var onSettingsPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
    evt.preventDefault();
    closeSettings();
  }
};

var openSettings = function () {
  imageSettings.classList.remove('hidden');
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
  controlValue = parseInt(controlValue, 10) - SCALE.step * sign;
  if (controlValue > SCALE.max) {
    controlValue = SCALE.max;
  } else if (controlValue < SCALE.min) {
    controlValue = SCALE.min;
  }
  controlValue += '%';
  resizeControlValue.value = controlValue;
  imageUploadPreview.style.transform = 'scale(' + (parseInt(controlValue, 10) / 100) + ')';
};

var getPersentPositionLeft = function (targetElem, parentElem) {
  return (targetElem.offsetLeft / parentElem.offsetWidth).toFixed(2);
};

uploadImage.addEventListener('change', function () {
  openSettings();
});

uploadCancel.addEventListener('click', function () {
  closeSettings();
});

uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSettings();
  }
});

resizeControlMinus.addEventListener('click', function () {
  resizeImage(1);
});

resizeControlPlus.addEventListener('click', function () {
  resizeImage(-1);
});

effectsList.addEventListener('change', function (evt) {
  var effectName = evt.target.value;
  if (effectName === 'none') {
    imageUploadScale.classList.add('hidden');
  } else {
    // Нужно, чтобы после просмотра оригинала остальные фильтры продолжали работать
    imageUploadScale.classList.remove('hidden');
  }
  imageUploadPreviewImg.className = ''; // Нужно, чтобы после просмотра оригинала остальные фильтры продолжали работать
  imageUploadPreviewImg.style = ''; // Нужно, чтобы после просмотра оригинала остальные фильтры продолжали работать
  imageUploadPreviewImg.classList.add('effects__preview--' + effectName);
});

scalePin.addEventListener('mouseup', function () {
  var pinPosition = getPersentPositionLeft(scalePin, scaleLine);
  var effectName = effectsList.querySelector('.effects__radio').checked.value;
  var effect = '';
  scaleValue.setAttribute('value', Math.floor(pinPosition));
  if (effectName === 'chrome') {
    effect = 'grayscale(' + pinPosition + ')';
  } else if (effectName === 'sepia') {
    effect = 'sepia(' + pinPosition + ')';
  } else if (effectName === 'marvin') {
    effect = 'invert(' + (pinPosition * 100) + '%)';
  } else if (effectName === 'phobos') {
    effect = 'blur(' + (pinPosition * 3).toFixed(2) + 'px)';
  } else if (effectName === 'heat') {
    effect = 'brightness(' + (pinPosition * 3).toFixed(2) + ')';
  }
  imageUploadPreviewImg.style.filter = effect;
});

var checkUniqueValues = function (array) {
  var k = 0;
  while (k < array.length - 1) {
    if (array.indexOf(array[k], k + 1) > -1) {
      return false;
    }
    k++;
  }
  return true;
};

var validateHashtags = function (arr) {
  var arrLowerCase = [];
  for (var i = 0; i < arr.length; ++i) {
    arrLowerCase[i] = arr[i].toLowerCase();
  }
  userHashtags.setCustomValidity('');
  if (arr.length > 5) {
    userHashtags.setCustomValidity('Хэш-тегов должно быть не больше пяти.');
  }
  if (!checkUniqueValues(arrLowerCase)) {
    userHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды (теги не чувствительны к регистру).');
  }
  for (var j = 0; j < arr.length; ++j) {
    if (arr[j] === '#') {
      userHashtags.setCustomValidity('Хэш-тег не может состоять из одной только решётки. Удалите лишний символ или дополните его.');
    } else if (arr[j].charAt(0) !== '#') {
      userHashtags.setCustomValidity('Хэш-тег ' + arr[j] + ' должен начинаться с символа "#".');
    } else if (arr[j].slice(1).indexOf('#') !== -1) {
      userHashtags.setCustomValidity('Хэш-теги ' + arr[j] + ' должны быть разделены пробелом.');
    } else if (arr[j].length > 20) {
      userHashtags.setCustomValidity('Максимальная длина одного хэш-тега составляет 20 символов, включая символ "#". Сократите хэш-тег ' + arr[j] + '.');
    }
  }
};

userHashtags.addEventListener('input', function () {
  var hashtagsArr = userHashtags.value.split(' ');
  validateHashtags(hashtagsArr);
});
