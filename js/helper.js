export const getRandomNumber = (minNumber, maxNumber) => {
  if (minNumber >= 0 && minNumber < maxNumber) {
    const randomNumber = Math.random() * (maxNumber-minNumber) + minNumber;
    return Math.floor(randomNumber);
  }
  return -1;
};

export const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export const checkLengthString = (string, maxLength) =>(string.length <= maxLength);

