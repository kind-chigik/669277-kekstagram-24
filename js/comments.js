const comments = document.querySelector('.text__description');

comments.addEventListener('input', () => {
  const text = comments.value;
  if (text.length > 140) {
    comments.setCustomValidity('Сообщение не может быть больше 140 символов');
  } else {
    comments.setCustomValidity('');
  }
  comments.reportValidity();
});

export {comments};
