import {buttonHashtags} from '../load-new-picture/hash-tags.js';
import {comments} from '../load-new-picture/comments.js';
import {request} from '../loader.js';
import {createBlockMessage, addBlockMessage} from '../helper.js';

const STEP_SCALE = 25;
const MAX_VALUE_SCALE = 100;
const MIN_VALUE_SCALE = 25;
const KEY_ESCAPE = 'Escape';
const KEY_ESC = 'Esc';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

let currentValueScale = 100;

const effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
const sliderVariants = {
  'effects__preview--chrome': {
    min: 0,
    max: 1,
    step: 0.1,
  },
  'effects__preview--sepia': {
    min: 0,
    max: 1,
    step: 0.1,
  },
  'effects__preview--marvin': {
    min: 0,
    max: 100,
    step: 1,
  },
  'effects__preview--phobos': {
    min: 0,
    max: 3,
    step: 0.1,
  },
  'effects__preview--heat': {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const formImageUpload = document.querySelector('.img-upload__form');
const buttonUpload = formImageUpload.querySelector('#upload-file');
const formEditImage = formImageUpload.querySelector('.img-upload__overlay');
const buttonClose = formImageUpload.querySelector('#upload-cancel');
const previewImage = formImageUpload.querySelector('.img-upload__preview > img');
const hashtags = formImageUpload.querySelector('.text__hashtags');
const descriptionImage = formImageUpload.querySelector('.text__description');

const templateSuccess = document.querySelector('#success').content;
const success = templateSuccess.querySelector('.success');
const blockSuccess = createBlockMessage(success, 'success-load');

const templateError = document.querySelector('#error').content;
const error = templateError.querySelector('.error');
const blockError = createBlockMessage(error, 'error-load-image');

const scale = formImageUpload.querySelector('.scale__control--value');
const buttonReduceScale = formImageUpload.querySelector('.scale__control--smaller');
const buttonIncreaseScale = formImageUpload.querySelector('.scale__control--bigger');

const sliderLevelEffects = formImageUpload.querySelector('.effect-level__slider');
const effectLevel = formImageUpload.querySelector('.effect-level__value');
const effectsList = formImageUpload.querySelector('.effects__list');
const levelEffects = formImageUpload.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderLevelEffects, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

const getScale = () => {
  scale.value = `${currentValueScale} %`;
  previewImage.style.transform = `scale(${currentValueScale / MAX_VALUE_SCALE})`;
};

const onButtonReduceClick = () => {
  if (currentValueScale <= MAX_VALUE_SCALE && currentValueScale > MIN_VALUE_SCALE) {
    currentValueScale -= STEP_SCALE;
    getScale();
  }
};

const onButtonIncreaseClick = () => {
  if (currentValueScale >= MIN_VALUE_SCALE && currentValueScale < MAX_VALUE_SCALE) {
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
        previewImage.classList.add(`effects__preview--${effects[i]}`);
      } else {
        previewImage.classList.remove(`effects__preview--${effects[i]}`);
      }
    }

    if (previewImage.classList.value !== 'effects__preview--none') {
      sliderLevelEffects.noUiSlider.updateOptions({
        range: {
          min: sliderVariants[previewImage.classList.value].min,
          max: sliderVariants[previewImage.classList.value].max,
        },
        step: sliderVariants[previewImage.classList.value].step,
      });
      sliderLevelEffects.noUiSlider.set(sliderVariants[previewImage.classList.value].max);
    } else {
      levelEffects.classList.add('hidden');
      previewImage.style.filter = '';
    }
  }
};

const closeWindowTunning = () => {
  formEditImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonUpload.value = '';
  scale.value = `${MAX_VALUE_SCALE}%`;
  currentValueScale = MAX_VALUE_SCALE;
  previewImage.style = '';
  previewImage.classList.value = 'effects__preview--none';
  hashtags.value = '';
  descriptionImage.value = '';
};

const onWindowKeydownEsc = (evt) => {
  if (evt.key === KEY_ESCAPE || evt.key === KEY_ESC) {
    evt.preventDefault();
    if (buttonHashtags === document.activeElement || comments === document.activeElement) {
      return;
    }
    if (!blockSuccess.classList.contains('hidden')) {
      blockSuccess.classList.add('hidden');
      return;
    }
    if (!blockError.classList.contains('hidden')) {
      blockError.classList.add('hidden');
      return;
    }
    closeWindowTunning();
    document.removeEventListener('keydown', onWindowKeydownEsc);
    buttonReduceScale.removeEventListener('click', onButtonReduceClick);
    buttonIncreaseScale.removeEventListener('click', onButtonIncreaseClick);
    sliderLevelEffects.noUiSlider.destroy();
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
  const file = buttonUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matchFormatFile = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matchFormatFile) {
    previewImage.src = URL.createObjectURL(file);
  }

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

const onSuccess = () => {
  closeWindowTunning();
  addBlockMessage(blockSuccess);
};

const onError = () => {
  closeWindowTunning();
  addBlockMessage(blockError);
};

formImageUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  request(onSuccess, onError, 'POST', formData);
});
