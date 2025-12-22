import { debounce, shuffleArray } from './util.js';
import { renderPhotos, removePhotos } from './mini-pictures.js';
import { getPhotos } from './main.js';

const RANDOM_PICS_COUNT = 10;
const ACTIVE_BLOCK = 'img-filters__button--active';
const filtersFormElement = document.querySelector('.img-filters__form');

const isFilterButton = (evt) => evt.target.tagName === 'BUTTON';

const getDiscussedFilter = () => getPhotos().sort((a, b) => b.comments.length - a.comments.length);

const filtersKinds = {
  'filter-default': () => getPhotos(),
  'filter-random': () => shuffleArray(getPhotos()).slice(0, RANDOM_PICS_COUNT),
  'filter-discussed': () => getDiscussedFilter()
};

const onFiltersFormCLick = debounce((evt) => {
  if (isFilterButton(evt)) {
    removePhotos();
    renderPhotos(filtersKinds[evt.target.id]());
  }
});

const onFiltersButtonClick = (evt) => {
  if (isFilterButton(evt)) {
    const chosenButtonElement = filtersFormElement.querySelector(`.${ACTIVE_BLOCK}`);
    if (chosenButtonElement) {
      chosenButtonElement.classList.remove(ACTIVE_BLOCK);
    }
    evt.target.classList.add(ACTIVE_BLOCK);
  }
};

const initFilters = () => {
  filtersFormElement.addEventListener('click', onFiltersFormCLick);
  filtersFormElement.addEventListener('click', onFiltersButtonClick);
};

export { initFilters };
