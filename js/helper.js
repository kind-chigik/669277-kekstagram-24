const KEY_ESCAPE = 'Escape';
const KEY_ESC = 'Esc';

export const getRandomNumber = (minNumber, maxNumber) => {
  if (minNumber >= 0 && minNumber < maxNumber) {
    const randomNumber = Math.random() * (maxNumber-minNumber) + minNumber;
    return Math.floor(randomNumber);
  }
  return -1;
};

export const shuffleArray = (array) => {
  for (let i = array.length-1; i > 0; i--) {
    const randomNumber = getRandomNumber(0, array.length);
    const randomElement = array[randomNumber];
    array[randomNumber] = array[i];
    array[i] = randomElement;
  }
  return array;
};

export const createBlockMessage = (elementForClone, id) => {
  const blockMessage = elementForClone.cloneNode(true);
  blockMessage.id = id;
  blockMessage.classList.add('hidden');
  document.body.appendChild(blockMessage);
  return blockMessage;
};

export const addBlockMessage = (element) => {
  element.classList.remove('hidden');
  element.addEventListener('click', (evt) => {
    if (evt.target.closest('.error__button')) {
      element.classList.add('hidden');
    }
    if (!evt.target.closest('.error__inner')) {
      element.classList.add('hidden');
    }
  });
};

export const isKeyEsс = (evt) => evt.key === KEY_ESCAPE || evt.key === KEY_ESC;
