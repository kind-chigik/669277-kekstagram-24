function getRandomNumber (minNumber, maxNumber) {
    if (minNumber >= 0 && minNumber < maxNumber) {
        let randomNumber = Math.random() * (maxNumber-minNumber) + minNumber;
        return Math.floor(randomNumber);
    }
    return 'Диапазон должен состоять только из положительных чисел, и минимальное число должно быть меньше максимального';
}

function getLengthString (string, maxLength) {
    return (string.length <= maxLength) ? true : false;
}

const DESCRIPTIONS = [
    'Мишки в лесу',
    'Девочка с шарами',
    'Сломанный велосипед',
    'Спящий кот',
    'Синий экран смерти',
    'Леший в лесу',
    'Солнце на закате',
    'Море и солнце, день чудесный',
    'Так выглядит пятница',
    'Лужайка без заек',
];

const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
    'Олег',
    'Алексей',
    'Василиса',
    'Лена',
    'Ольга',
    'Никита',
    'Тутамухамон',
    'Нифертити',
    'Марсель',
    'Фантомас',
];

const LIMIT_PHOTOS = 25;

const getRandomArrayElement = (elements) => {
    return elements[getRandomNumber(0, elements.length - 1)];
};

const usedNumber = [];

const isNumberUsed = (number) => {
    if (usedNumber.length === 0) {
        usedNumber.push(number);
        return true;
    }
    for (let j = 0; j < usedNumber.length; j++) {
        if (number === usedNumber[j]) {
            return false;
        } else {
            continue;
        }
    }
    usedNumber.push(number);
    return true;
};

const getUniqueNumber = (min, max) => {
        let number = getRandomNumber(min, max);
        if (isNumberUsed(number)) {
            return number;
        } else {
            while (!isNumberUsed(number)) {
                number = getRandomNumber(min, max);
                if (isNumberUsed(number)) {
                    return number;
                }
            }
        }
};

const getComment = () => {
    const quantityComments = getRandomNumber(1, 3);
    const arrayComments = [];
    for (let i = 0; i <= quantityComments; i++) {
        const idComment = getRandomNumber(1, 25);
        const avatarUser = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
        const messageComment = getRandomArrayElement(MESSAGES);
        const nameUser = getRandomArrayElement(NAMES);
        arrayComments[i] = {
            id: idComment,
            avatar: avatarUser,
            message: messageComment,
            name: nameUser,
        };
    };
    return arrayComments;
};

const generatePhoto = () => {
    let idPhoto = getUniqueNumber(1, 27);
    let urlPhoto = 'photos/' + getRandomNumber(1, 25) + '.jpg';
    let descriptionPhoto = getRandomArrayElement(DESCRIPTIONS);
    let likesPhoto = getRandomNumber(15,200);
    let commentsPhoto = getComment();

    return {
        id: idPhoto,
        url: urlPhoto,
        description: descriptionPhoto,
        likes: likesPhoto,
        comments: commentsPhoto,
    };
};

const arrayPhotos = Array.from({length: LIMIT_PHOTOS}, generatePhoto);      // Здесь вызывается. Значения у id получаются не уникальные
console.log(arrayPhotos);

