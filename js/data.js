import{getRandomInteger, getRandomArrayElement, idGenerator} from './util.js';

const AVATAR_IMG = 6;
const PICTURES_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENT_COUNT = 30;

const NAMES = [ 'Артём', 'Александр', 'Иван', 'Елена', 'Кристина', 'Роман', 'Анна', 'Георгий', 'Сергей', 'Вероника'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Отдых на пляже',
  'Наслаждаемся морем',
  'Прекрасный вид',
  'Вот это кадр',
  'Путешествие по неизведанным местам',
  'Такой вкусной еды я никогда не пробовал!',
  'Моё уважение шеф-повару, это великолепно',
  'Такую машину дорого содержать, но ради эмоций я готов заплатить хоть все деньги мира',
  'Я прожил с ней всю свою жизнь и она до сих пор дарит мне эмоции',
  'Посмотрите на это! Ни разу таких не видел',
  'Смотрите какую крутую обувь я заказала на маркетплейсе!',
  'Я хожу в этом уже несколько лет, а они как новые',
];

const createComment = () => ({
  id: idGenerator(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_IMG)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generateComments = () => {
  const commentsCount = getRandomInteger(0, MAX_COMMENT_COUNT);
  return Array.from({length: commentsCount}, createComment);
};

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: generateComments()
});

const generatePhotos = function() {
  const photos = [];
  for (let i = 0; i < PICTURES_COUNT; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

const generatedPhotos = generatePhotos();

// Для импорта в будущие модули, если это будет необходимо
export {generatedPhotos};
