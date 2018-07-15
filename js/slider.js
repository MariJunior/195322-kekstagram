'use strict';

(function () {
  var scalePin = document.querySelector('.scale__pin');
  var scaleLine = document.querySelector('.scale__line');
  var scaleLevel = document.querySelector('.scale__level');

  window.initSlider = function (callback) {
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

        callback();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    scaleLine.addEventListener('click', function (lineEvt) {
      if (lineEvt.target !== scalePin) {
        lineEvt.preventDefault();

        var coordX = lineEvt.offsetX;
        var scaleLineWidth = scaleLine.offsetWidth;
        var positionValueClick = '';

        if (coordX >= 0 && coordX <= scaleLineWidth) {
          positionValueClick = (coordX / scaleLineWidth) * 100 + '%';
        }

        scalePin.style.left = positionValueClick;
        scaleLevel.style.width = positionValueClick;

        callback();
      }
    });
  };
})();
