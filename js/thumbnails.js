import {arrayPhotos} from './data.js';
import {showBigPicture} from './big-picture.js';

const templatePicture = document.querySelector('#picture').content;
const picture = templatePicture.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();

const renderPhoto = (data) => {
  const newPicture = picture.cloneNode(true);
  const imgPicture = newPicture.querySelector('.picture__img');
  imgPicture.src = data.url;
  imgPicture.alt = data.description;
  newPicture.querySelector('.picture__likes').textContent = data.likes;
  newPicture.querySelector('.picture__comments').textContent = data.comments.length;

  newPicture.addEventListener('click', () => {
    showBigPicture(data);
  });

  return newPicture;
};

const renderPhotos = () => {
  arrayPhotos.forEach((element) => {
    fragment.appendChild(renderPhoto(element));
  });

  pictures.appendChild(fragment);
};

export {renderPhotos};
