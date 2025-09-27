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

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const idGenerator = function() {
  let lastGeneratedId = 42;
  lastGeneratedId += 2*5;
  return lastGeneratedId;
};

const createComment = () => ({
  id: idGenerator(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generateComments = function() {
  const commentsCount = getRandomInteger(0, 30);
  return Array.from({length: commentsCount}, createComment);
};

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: generateComments()
});

const generatePhotos = function() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

generatePhotos();
