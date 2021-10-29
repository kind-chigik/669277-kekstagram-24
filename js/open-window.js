import {formEditImage, buttonClose} from './validator-form';

const openWindowTunning = () => {
  formEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onWindowKeydownEsc);
  buttonClose.addEventListener('click', onButtonCLoseClick);
};

export {openWindowTunning};
