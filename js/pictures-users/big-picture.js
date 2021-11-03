const bigPicture = document.querySelector('.big-picture');
const buttonClosePicture = bigPicture.querySelector('#picture-cancel');
const imgBigPicture = bigPicture.querySelector('.big-picture__img > img');

const descriptionBigPicture = bigPicture.querySelector('.social__caption');
const likesBigPicture = document.querySelector('.likes-count');

const counterComments = bigPicture.querySelector('.social__comment-count');
const showedCommentsCount = counterComments.querySelector('.showed-comments-count');
const loaderComments = bigPicture.querySelector('.comments-loader');
const countCommentsPicture = bigPicture.querySelector('.comments-count');
const templateComment = bigPicture.querySelector('.social__comment');
const blockComments = bigPicture.querySelector('.social__comments');
const fragmentComments = document.createDocumentFragment();
const SHOW_COMMENTS = 5;
let step = 5;

const renderComment = (comment) => {
  const newComment = templateComment.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  const textComment = newComment.querySelector('.social__text');
  textComment.textContent = comment.message;
  return newComment;
};

const getCountShowedComment = (allComments) => {
  const hiddenComments = blockComments.querySelectorAll('.hidden');
  showedCommentsCount.textContent = allComments.length - hiddenComments.length;
};


const onLoadClick = () => {
  const allComments = bigPicture.querySelectorAll('.social__comment');
  Array.from(allComments);
  if (allComments.length <= step + SHOW_COMMENTS) {
    loaderComments.classList.add('hidden');
  } else {
    loaderComments.classList.remove('hidden');
  }
  for (let i = 0; i < allComments.length; i++) {
    if (i >= step && i < step + SHOW_COMMENTS) {
      allComments[i].classList.remove('hidden');
    }
  }
  getCountShowedComment(allComments);
  step += SHOW_COMMENTS;
};

const getComments = (comments) => {
  comments.forEach((comment) => {
    fragmentComments.appendChild(renderComment(comment));
  });
  blockComments.innerHTML= '';
  blockComments.appendChild(fragmentComments);

  if (comments.length <= step) {
    loaderComments.classList.add('hidden');
  } else {
    loaderComments.classList.remove('hidden');
  }

  const allComments = bigPicture.querySelectorAll('.social__comment');
  Array.from(allComments);

  if (allComments.length > step) {
    for (let i = 0; i < allComments.length; i++) {
      if (i >= step) {
        allComments[i].classList.add('hidden');
      }
    }
    loaderComments.addEventListener('click', onLoadClick);
  }

  getCountShowedComment(allComments);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  blockComments.innerHTML= '';
  loaderComments.removeEventListener('click', onLoadClick);
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

const showBigPicture = (data) => {
  step = SHOW_COMMENTS;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgBigPicture.src = data.url;
  imgBigPicture.alt = data.description;
  likesBigPicture.textContent = data.likes;
  descriptionBigPicture.textContent = data.description;
  countCommentsPicture.textContent = data.comments.length;
  getComments(data.comments);
  document.addEventListener('keydown', onEscKeyDown);
  buttonClosePicture.addEventListener('click', onButtonCloseClick);
};

export {showBigPicture};
