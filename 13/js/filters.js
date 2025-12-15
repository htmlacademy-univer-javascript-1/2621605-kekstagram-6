import { debounce, shuffleArray } from './util.js';
import { renderPhotos, removePhotos } from './mini-pictures.js';
import { getPhotos } from './main.js';

const RANDOM_PICS_COUNT = 10;
const ACTIVE_BLOCK = 'img-filters__button--active';
const filtersForm = document.querySelector('.img-filters__form');

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
    const chosenButton = filtersForm.querySelector(`.${ACTIVE_BLOCK}`);
    if (chosenButton) {
      chosenButton.classList.remove(ACTIVE_BLOCK);
    }
    evt.target.classList.add(ACTIVE_BLOCK);
  }
};

const initFilters = () => {
  filtersForm.addEventListener('click', onFiltersFormCLick);
  filtersForm.addEventListener('click', onFiltersButtonClick);
};

export { initFilters };
