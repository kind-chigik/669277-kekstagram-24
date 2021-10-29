const buttonHashtags = document.querySelector('.text__hashtags');
const reForHashtags = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_LENGTH_HASHTAG = 20;
const MAX_HASHTAGS = 5;


const checkHashtags = (text) => {
  buttonHashtags.setCustomValidity('');
  const invalidMessage = [];
  const hashtags = text.toLowerCase().trim();
  const arrayHashtags = hashtags.split(/\s+/);
  if (arrayHashtags.length === 0) {
    return;
  }

  const isStartNoHashtag = arrayHashtags.some((item) => item[0] !== '#');
  if (isStartNoHashtag) {
    invalidMessage.push('Хэш-тег должен начинаться с #');
  }

  const isOnlyLattice = arrayHashtags.some((item) => item === '#');
  if (isOnlyLattice) {
    invalidMessage.push('Хэш-тег не должен состоять только из #');
  }

  const isSpaceBetweenHashtags = arrayHashtags.some((item) => item.indexOf('#', 1) >= 1);
  if (isSpaceBetweenHashtags) {
    invalidMessage.push('Хэш-теги должны разделяться пробелами');
  }

  const isHastagsrepeat = arrayHashtags.some((item, i, arr) => arr.indexOf(item, i + 1) >= i + 1);
  if (isHastagsrepeat) {
    invalidMessage.push('Хэш-теги не должны повторяться');
  }

  const isHashtagTooLong = arrayHashtags.some((item) => item.length > MAX_LENGTH_HASHTAG);
  if (isHashtagTooLong) {
    invalidMessage.push('Хэш-теги не должны быть больше 20 символов');
  }

  if (arrayHashtags.length > MAX_HASHTAGS) {
    invalidMessage.push('Хэш-тегов не должно быть больше 5');
  }

  arrayHashtags.forEach((element) => {
    if (!reForHashtags.test(element) && !isStartNoHashtag && !isOnlyLattice) {
      invalidMessage.push('Хэш-тег должен содержать только буквы и цифры');
    }
  });

  buttonHashtags.reportValidity();
  return buttonHashtags.setCustomValidity(invalidMessage);
};

export {checkHashtags};
