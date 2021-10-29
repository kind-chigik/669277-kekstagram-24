import {buttonHashtags} from './hash-tags.js';
import {comments} from './comments.js';

const formImageUpload = document.querySelector('.img-upload__form');
const buttonUpload = formImageUpload.querySelector('#upload-file');
const formEditImage = formImageUpload.querySelector('.img-upload__overlay');
const buttonClose = formImageUpload.querySelector('#upload-cancel');

const closeWindowTunning = () => {
  formEditImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonUpload.value = '';
};

const onWindowKeydownEsc = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    if (buttonHashtags === document.activeElement || comments === document.activeElement) {
      return;
    }
    closeWindowTunning();
    document.removeEventListener('keydown', onWindowKeydownEsc);
  }
};

const onButtonCLoseClick = () => {
  closeWindowTunning();
  buttonClose.removeEventListener('click', onButtonCLoseClick);
};

const openWindowTunning = () => {
  formEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onWindowKeydownEsc);
  buttonClose.addEventListener('click', onButtonCLoseClick);
};

buttonUpload.addEventListener('change', () => {
  openWindowTunning();
});

