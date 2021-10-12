export function getRandomNumber (minNumber, maxNumber) {
    if (minNumber >= 0 && minNumber < maxNumber) {
        let randomNumber = Math.random() * (maxNumber-minNumber) + minNumber;
        return Math.floor(randomNumber);
    }
    return 'Диапазон должен состоять только из положительных чисел, и минимальное число должно быть меньше максимального';
};

export const getRandomArrayElement = (elements) => {
    return elements[getRandomNumber(0, elements.length - 1)];
};

export function checkLengthString (string, maxLength) {
    return (string.length <= maxLength) ? true : false;
};
