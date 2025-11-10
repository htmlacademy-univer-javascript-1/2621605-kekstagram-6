import {showBigPicture} from './big-photo.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const elementFragment = document.createDocumentFragment();

const createThumbnail = (picture) => {
  const {url, description, likes, comments} = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  });
  return pictureElement;
};

const renderPhotos = (photos) => {
  photos.forEach((item) => {
    elementFragment.appendChild(createThumbnail(item));
  });
  pictures.appendChild(elementFragment);
};

export {renderPhotos};
