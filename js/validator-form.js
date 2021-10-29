import {checkHashtags} from './hash-tags.js';
import {comments} from './comments.js';

const formImageUpload = document.querySelector('.img-upload__form');
const buttonHashtags = formImageUpload.querySelector('.text__hashtags');
const buttonUpload = formImageUpload.querySelector('#upload-file');
const formEditImage = formImageUpload.querySelector('.img-upload__overlay');
const buttonClose = formImageUpload.querySelector('#upload-cancel');

const closeWindowTunning = () => {
  formEditImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonUpload.value = '';
  document.removeEventListener('keydown', onWindowKeydownEsc);
  buttonClose.removeEventListener('click', onButtonCLoseClick);
};

function onWindowKeydownEsc (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    if (buttonHashtags === document.activeElement || comments === document.activeElement) {
      return;
    }
    closeWindowTunning();
  }
}

function onButtonCLoseClick () {
  closeWindowTunning();
}

function openWindowTunning () {
  formEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onWindowKeydownEsc);
  buttonClose.addEventListener('click', onButtonCLoseClick);
  buttonHashtags.addEventListener('input', () => {
    const text = buttonHashtags.value;
    checkHashtags(text);
  });
}

buttonUpload.addEventListener('change', () => {
  openWindowTunning();
});
