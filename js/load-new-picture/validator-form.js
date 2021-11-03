import {buttonHashtags} from '../load-new-picture/hash-tags.js';
import {comments} from '../load-new-picture/comments.js';
import '/nouislider/nouislider.js';

const formImageUpload = document.querySelector('.img-upload__form');
const buttonUpload = formImageUpload.querySelector('#upload-file');
const formEditImage = formImageUpload.querySelector('.img-upload__overlay');
const buttonClose = formImageUpload.querySelector('#upload-cancel');
const previewImage = formImageUpload.querySelector('.img-upload__preview > img');

let currentValueScale = 100;
const STEP_SCALE = 25;
const scale = formImageUpload.querySelector('.scale__control--value');
const buttonReduceScale = formImageUpload.querySelector('.scale__control--smaller');
const buttonIncreaseScale = formImageUpload.querySelector('.scale__control--bigger');

const sliderLevelEffects = formImageUpload.querySelector('.effect-level__slider');
const effectLevel = formImageUpload.querySelector('.effect-level__value');
const effectsList = formImageUpload.querySelector('.effects__list');
const levelEffects = formImageUpload.querySelector('.img-upload__effect-level');

const effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
const effectsClasses = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat',
];

noUiSlider.create(sliderLevelEffects, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
});

const getScale = () => {
  scale.value = `${currentValueScale} %`;
  previewImage.style.transform = `scale(${currentValueScale / 100})`;
};

const onButtonReduceClick = () => {
  if (currentValueScale <= 100 && currentValueScale > 25) {
    currentValueScale -= STEP_SCALE;
    getScale();
  }
};

const onButtonIncreaseClick = () => {
  if (currentValueScale >= 25 && currentValueScale < 100) {
    currentValueScale += STEP_SCALE;
    getScale();
  }
};

sliderLevelEffects.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle];
  if (previewImage.classList.value === 'effects__preview--chrome') {
    previewImage.style.filter = `grayscale(${effectLevel.value})`;
  }
  if (previewImage.classList.value === 'effects__preview--sepia') {
    previewImage.style.filter = `sepia(${effectLevel.value})`;
  }
  if (previewImage.classList.value === 'effects__preview--marvin') {
    previewImage.style.filter = `invert(${effectLevel.value}%)`;
  }
  if (previewImage.classList.value === 'effects__preview--phobos') {
    previewImage.style.filter = `blur(${effectLevel.value}px)`;
  }
  if (previewImage.classList.value === 'effects__preview--heat') {
    previewImage.style.filter = `brightness(${effectLevel.value})`;
  }
});

const addEffect = (evt) => {
  levelEffects.classList.remove('hidden');
  if (evt.target.closest('.effects__radio')) {
    for (let i = 0; i < effects.length; i++) {
      if (evt.target.value === effects[i]) {
        previewImage.classList.add(effectsClasses[i]);
      } else {
        previewImage.classList.remove(effectsClasses[i]);
      }
    }

    if (previewImage.classList.value === 'effects__preview--chrome' || previewImage.classList.value === 'effects__preview--sepia') {
      sliderLevelEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      sliderLevelEffects.noUiSlider.set(0);
    }

    if (previewImage.classList.value === 'effects__preview--marvin') {
      sliderLevelEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      sliderLevelEffects.noUiSlider.set(0);
    }

    if (previewImage.classList.value === 'effects__preview--phobos') {
      sliderLevelEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      sliderLevelEffects.noUiSlider.set(0);
    }

    if (previewImage.classList.value === 'effects__preview--heat') {
      sliderLevelEffects.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
      });
      sliderLevelEffects.noUiSlider.set(0);
    }

    if (previewImage.classList.value === 'effects__preview--none') {
      levelEffects.classList.add('hidden');
    }
  }
};

const closeWindowTunning = () => {
  formEditImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonUpload.value = '';
  currentValueScale = 100;
  previewImage.style = '';
  previewImage.classList.value = 'effects__preview--none';
};

const onWindowKeydownEsc = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    if (buttonHashtags === document.activeElement || comments === document.activeElement) {
      return;
    }
    closeWindowTunning();
    document.removeEventListener('keydown', onWindowKeydownEsc);
    buttonReduceScale.removeEventListener('click', onButtonReduceClick);
    buttonIncreaseScale.removeEventListener('click', onButtonIncreaseClick);
  }
};

const onButtonCLoseClick = () => {
  closeWindowTunning();
  buttonClose.removeEventListener('click', onButtonCLoseClick);
  buttonReduceScale.removeEventListener('click', onButtonReduceClick);
  buttonIncreaseScale.removeEventListener('click', onButtonIncreaseClick);
};

const openWindowTunning = () => {
  formEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  levelEffects.classList.add('hidden');

  buttonReduceScale.addEventListener('click', onButtonReduceClick);
  buttonIncreaseScale.addEventListener('click', onButtonIncreaseClick);

  effectsList.addEventListener('click', (evt) => {
    addEffect(evt);
  });
  document.addEventListener('keydown', onWindowKeydownEsc);
  buttonClose.addEventListener('click', onButtonCLoseClick);
};

buttonUpload.addEventListener('change', () => {
  openWindowTunning();
});
