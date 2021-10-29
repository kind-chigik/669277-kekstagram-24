import {formEditImage, buttonUpload, buttonClose} from './validator-form';

const closeWindowTunning = () => {
  formEditImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonUpload.value = '';
  document.removeEventListener('keydown', onWindowKeydownEsc);
  buttonClose.removeEventListener('click', onButtonCLoseClick);
};

export {closeWindowTunning};