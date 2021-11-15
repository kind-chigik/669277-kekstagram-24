const MAX_LENGTH_HASHTAG = 20;
const MAX_HASHTAGS = 5;
const buttonHashtags = document.querySelector('.text__hashtags');
const reForHashtags = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

buttonHashtags.addEventListener('input', () => {
  const text = buttonHashtags.value;
  buttonHashtags.setCustomValidity('');
  const hashtags = text.toLowerCase().trim();
  const arrayHashtags = hashtags.split(/\s+/);
  if (arrayHashtags.length === 0) {
    return;
  }
  if (buttonHashtags.value === '') {
    return;
  }

  const isStartNoHashtag = arrayHashtags.some((item) => item[0] !== '#');
  if (isStartNoHashtag) {
    buttonHashtags.setCustomValidity('Хэш-тег должен начинаться с #');
  }

  const isOnlyLattice = arrayHashtags.some((item) => item === '#');
  if (isOnlyLattice) {
    buttonHashtags.setCustomValidity('Хэш-тег не должен состоять только из #');
  }

  const isSpaceBetweenHashtags = arrayHashtags.some((item) => item.indexOf('#', 1) >= 1);
  if (isSpaceBetweenHashtags) {
    buttonHashtags.setCustomValidity('Хэш-теги должны разделяться пробелами');
  }

  const isHastagsrepeat = arrayHashtags.some((item, i, arr) => arr.indexOf(item, i + 1) >= i + 1);
  if (isHastagsrepeat) {
    buttonHashtags.setCustomValidity('Хэш-теги не должны повторяться');
  }

  const isHashtagTooLong = arrayHashtags.some((item) => item.length > MAX_LENGTH_HASHTAG);
  if (isHashtagTooLong) {
    buttonHashtags.setCustomValidity('Хэш-теги не должны быть больше 20 символов');
  }

  if (arrayHashtags.length > MAX_HASHTAGS) {
    buttonHashtags.setCustomValidity('Хэш-тегов не должно быть больше 5');
  }

  arrayHashtags.forEach((element) => {
    if (!reForHashtags.test(element) && !isStartNoHashtag && !isOnlyLattice && !isHashtagTooLong) {
      buttonHashtags.setCustomValidity('Хэш-тег должен содержать только буквы и цифры');
    }
  });
  buttonHashtags.reportValidity();
});

export {buttonHashtags};
