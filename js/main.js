import { renderPhotos } from './mini-pictures.js';
import { initFormValidation } from './form-validator.js';
import { getDataFromServer } from './server-api.js';
import { initFilters } from './filters.js';
import './user-pictures.js';

let photos = [];

const loadSuccess = (data) => {
  photos = data.slice();
  renderPhotos(data.slice());
  initFilters();
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const loadError = () => {
  const errorMessage = document.createElement('div');
  errorMessage.style.position = 'fixed';
  errorMessage.style.top = '20px';
  errorMessage.style.left = '600px';
  errorMessage.style.minWidth = '300px';
  errorMessage.style.padding = '20px 30px';
  errorMessage.style.background = 'red';
  errorMessage.style.color = 'white';
  errorMessage.style.textAlign = 'center';
  errorMessage.style.fontSize = '22px';
  errorMessage.style.fontWeight = 'bold';
  errorMessage.textContent = 'Ошибка загрузки фотографий';
  document.body.append(errorMessage);
};

getDataFromServer(loadSuccess, loadError);
initFormValidation();

const getPhotos = () => photos.slice()

export {getPhotos};
