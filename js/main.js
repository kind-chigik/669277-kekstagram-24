import {renderPhotos, sortPictures} from './pictures-users/thumbnails.js';
import './load-new-picture/validator-form.js';
import {request} from './loader.js';
import {createBlockMessage, addBlockMessage} from './helper.js';
import {debounce} from './utils/debounce.js';

const ERROR_MESSAGE = 'Ошибка загрузки изображений';
const ERROR_TEXT_BUTTON = 'Ужасно';
let photos = [];

const templateError = document.querySelector('#error').content;
const error = templateError.querySelector('.error');
const filters = document.querySelector('.img-filters');

const errorLoadImages = createBlockMessage(error, 'error-load-images');
const errorLoadMessage = errorLoadImages.querySelector('.error__title');
const errorLoadButton = errorLoadImages.querySelector('.error__button');
errorLoadMessage.textContent = ERROR_MESSAGE;
errorLoadButton.textContent = ERROR_TEXT_BUTTON;

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
  filters.classList.remove('img-filters--inactive');
  sortPictures(photos, debounce(renderPhotos));
};

const onError = () => {
  addBlockMessage(errorLoadImages);
};

request(onSuccess, onError, 'GET');
