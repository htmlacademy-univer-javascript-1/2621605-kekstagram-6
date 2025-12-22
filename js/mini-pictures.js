import {showBigPicture} from './big-photo.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const elementFragment = document.createDocumentFragment();
const photos = picturesElement.getElementsByClassName('picture');

const createThumbnail = (picture) => {
  const {url, description, likes, comments} = picture;
  const pictureElement = pictureTemplateElement.cloneNode(true);

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

const renderPhotos = (images) => {
  images.forEach((item) => {
    elementFragment.appendChild(createThumbnail(item));
  });
  picturesElement.appendChild(elementFragment);
};

const removePhotos = () => {
  if (photos) {
    [...photos].forEach((photo) => photo.remove());
  }
};

export {renderPhotos, removePhotos};
