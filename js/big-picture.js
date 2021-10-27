const bigPicture = document.querySelector('.big-picture');
const buttonClosePicture = bigPicture.querySelector('#picture-cancel');
const imgBigPicture = bigPicture.querySelector('.big-picture__img > img');

const descriptionBigPicture = bigPicture.querySelector('.social__caption');
const likesBigPicture = document.querySelector('.likes-count');

const counterComments = bigPicture.querySelector('.social__comment-count');
const loaderComments = bigPicture.querySelector('.comments-loader');
const countCommentsPicture = bigPicture.querySelector('.comments-count');
const templateComment = bigPicture.querySelector('.social__comment');
const blockComments = bigPicture.querySelector('.social__comments');

const fragmentComments = document.createDocumentFragment();

const renderComment = (comment) => {
  const newComment = templateComment.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  const textComment = newComment.querySelector('.social__text');
  textComment.textContent = comment.message;
  return newComment;
};

const getComments = (comments) => {
  comments.forEach((comment) => {
    fragmentComments.appendChild(renderComment(comment));
  });
  blockComments.innerHTML= '';
  blockComments.appendChild(fragmentComments);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeBigPicture();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const onButtonCloseClick = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onEscKeyDown);
};

buttonClosePicture.addEventListener('click', onButtonCloseClick);

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  counterComments.classList.add('hidden');
  loaderComments.classList.add('hidden');
  document.body.classList.add('modal-open');

  imgBigPicture.src = data.url;
  imgBigPicture.alt = data.description;
  likesBigPicture.textContent = data.likes;
  descriptionBigPicture.textContent = data.description;
  countCommentsPicture.textContent = data.comments.length;

  getComments(data.comments);

  document.addEventListener('keydown', onEscKeyDown);
};

export {showBigPicture};
