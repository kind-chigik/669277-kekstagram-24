
const bigPicture = document.querySelector('.big-picture');
const buttonClosePicture = bigPicture.querySelector('#picture-cancel');
const blockBigPicture = bigPicture.querySelector('.big-picture__img');
const imgBigPicture = blockBigPicture.children;
const descriptionBigPicture = bigPicture.querySelector('.social__caption');
const likesBigPicture = document.querySelector('.likes-count');

const counterComments = bigPicture.querySelector('.social__comment-count');
const loaderComments = bigPicture.querySelector('.comments-loader');
const countCommentsPicture = bigPicture.querySelector('.comments-count');
const comment = bigPicture.querySelector('.social__comment');
const templateComment = comment.cloneNode(true);
const blockComments = bigPicture.querySelector('.social__comments');

let fragmentComments = document.createDocumentFragment();

const getComments = (objectPhoto) => {
  objectPhoto.comments.forEach((comment) => {
    const newComment = templateComment.cloneNode(true);
    blockComments.innerHTML= '';
    const avatar = newComment.querySelector('.social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    const textComment = newComment.querySelector('.social__text');
    textComment.textContent = comment.message;
    fragmentComments.appendChild(newComment);
  });
};

const onThumbnailsClick = (picture, objectPhoto) => {
  picture.addEventListener('click', function () {
    bigPicture.classList.remove('hidden');
    counterComments.classList.add('hidden');
    loaderComments.classList.add('hidden');
    document.body.classList.add('modal-open');

    imgBigPicture[0].src = objectPhoto.url;
    imgBigPicture[0].alt = objectPhoto.description;
    likesBigPicture.textContent = objectPhoto.likes;
    descriptionBigPicture.textContent = objectPhoto.description;
    countCommentsPicture.textContent = objectPhoto.comments.length;
    getComments(objectPhoto);
    blockComments.appendChild(fragmentComments);
  });

  buttonClosePicture.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};

export {onThumbnailsClick};
