import {arrayPhotos} from './data.js';
import {onThumbnailsClick} from './big-picture.js';

const templatePicture = document.querySelector('#picture').content;
const picture = templatePicture.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const randomPictures = arrayPhotos;

let fragment = document.createDocumentFragment();

randomPictures.forEach((element) => {
    const newPicture = picture.cloneNode(true);
    const imgPicture = newPicture.querySelector('.picture__img');
    imgPicture.src = element.url;
    imgPicture.alt = element.description;
    const likesPicture = newPicture.querySelector('.picture__likes');
    likesPicture.textContent = element.likes;
    const commentsPicture = newPicture.querySelector('.picture__comments');
    commentsPicture.textContent = element.comments.length;
    onThumbnailsClick(imgPicture, element);
    fragment.appendChild(newPicture);
});

pictures.appendChild(fragment);
