function getRandomNumber (minNumber, maxNumber) {
    if (minNumber >= 0 && maxNumber >= 0 && minNumber < maxNumber) {
        let randomNumber = Math.random() * (maxNumber-minNumber) + minNumber;
        return Math.floor(randomNumber);
    }
    return 'Диапазон должен состоять только из положительных чисел, и минимальное число должно быть меньше максимального';
}

getRandomNumber(0, 10);    // временная строка, чтобы ESLint не ругался

function getLengthString (string, maxLength) {
    return (string.length <= maxLength) ? true : false;
}

getLengthString('Привет', 6);    // временная строка, чтобы ESLint не ругался
