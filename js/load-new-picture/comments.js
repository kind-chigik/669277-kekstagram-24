const MAX_CHAR_COMMENT = 140;
const comments = document.querySelector('.text__description');

comments.addEventListener('input', () => {
  const text = comments.value;
  if (text.length > MAX_CHAR_COMMENT) {
    comments.setCustomValidity('Комментарий не может быть больше 140 символов');
  } else {
    comments.setCustomValidity('');
  }
  comments.reportValidity();
});

export {comments};
