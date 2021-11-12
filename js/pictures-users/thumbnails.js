import {showBigPicture} from '../pictures-users/big-picture.js';
import {shuffleArray} from '../helper.js';

const MAX_RANDOM_PHOTO = 10;
const VALUE_FROM = 0;

const templatePicture = document.querySelector('#picture').content;
const picture = templatePicture.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const filterPicture = document.querySelector('.img-filters__form');

const fragment = document.createDocumentFragment();

const addActiveClass = (evt) => {
  const activeElement = filterPicture.querySelector('.img-filters__button--active');
  activeElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const compareElement = (element1, element2) => element2.comments.length - element1.comments.length;

const sortPictures = (photos, render) => {
  const clonePhotos = photos.slice();
  filterPicture.addEventListener('click', (evt) => {
    if (evt.target.closest('#filter-random')) {
      addActiveClass(evt);
      const randomPhotos = shuffleArray(clonePhotos).slice(VALUE_FROM, MAX_RANDOM_PHOTO);
      render(randomPhotos);
    }
    if (evt.target.closest('#filter-discussed')) {
      addActiveClass(evt);
      clonePhotos.sort(compareElement);
      render(clonePhotos);
    }
    if (evt.target.closest('#filter-default')) {
      addActiveClass(evt);
      render(photos);
    }
  });
};

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

const renderPhotos = (arrayPhotos) => {
  arrayPhotos.forEach((element) => {
    fragment.appendChild(renderPhoto(element));
  });
  const allPistures = pictures.querySelectorAll('.picture');
  if (allPistures.length > 0) {
    for (let i = 0; i < allPistures.length; i++) {
      pictures.removeChild(allPistures[i]);
    }
  }
  pictures.appendChild(fragment);
};

export {renderPhotos, sortPictures};
