const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const form = document.querySelector('.img-upload__form');
const downsizeButton = form.querySelector('.scale__control--smaller');
const enlargeButton = form.querySelector('.scale__control--bigger');
const sizeValue = form.querySelector('.scale__control--value');
const imagePreview = form.querySelector('.img-upload__preview img');
const effectsList = form.querySelector('.effects__list');
const effectLevelContainer = form.querySelector('.img-upload__effect-level');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');

let currentScale = 100;
let currentFilter = 'none';

const Effects = {
  NONE: {range: { min: 0, max: 1 }, start: 1, step: 0.1, connect: 'lower', applyFilter: () => 'none'},
  CHROME: {range: {min: 0, max: 1}, start: 1, step: 0.1, applyFilter: (value) => `grayscale(${value})`},
  SEPIA: {range: {min: 0, max: 1}, start: 1, step: 0.1, applyFilter: (value) => `sepia(${value})`},
  MARVIN: {range: {min: 0, max: 100}, start: 100, step: 1, applyFilter: (value) => `invert(${value}%)`},
  PHOBOS: {range: {min: 0, max: 3}, start: 3, step: 0.1, applyFilter: (value) => `blur(${value}px)`},
  HEAT: {range: {min: 1, max: 3}, start: 3, step: 0.1, applyFilter: (value) => `brightness(${value})`}
};

const updateScale = () => {
  sizeValue.value = `${currentScale}%`;
  const scaleValue = currentScale / 100;
  imagePreview.style.transform = `scale(${scaleValue})`;
};

const onSmallerClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= STEP_SCALE;
    updateScale();
  }
};

const onBiggerClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += STEP_SCALE;
    updateScale();
  }
};

const setScale = () => {
  downsizeButton.addEventListener('click', onSmallerClick);
  enlargeButton.addEventListener('click', onBiggerClick);
  currentScale = MAX_SCALE;
  updateScale();
};

const removeScale = () => {
  downsizeButton.removeEventListener('click', onSmallerClick);
  enlargeButton.removeEventListener('click', onBiggerClick);
  imagePreview.style.transform = 'scale(1)';
};

const applyFilter = (value) => {
  const effectKey = currentFilter.toUpperCase();
  const effect = Effects[effectKey];
  imagePreview.style.filter = effect.applyFilter(value);
};

const updateSlider = (filterName) => {
  currentFilter = filterName;
  const effectKey = filterName.toUpperCase();
  const effect = Effects[effectKey];

  if (filterName === 'none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
  } else {
    effectLevelContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: effect.range,
      start: effect.start,
      step: effect.step
    });
    effectLevelSlider.noUiSlider.set(effect.start);
    applyFilter(effect.start);
  }
};

const onFilterChange = (evt) => {
  if (evt.target.type === 'radio') {
    const filterName = evt.target.value;
    updateSlider(filterName);
  }
};

const setFilters = () => {
  noUiSlider.create(effectLevelSlider, Effects.NONE);
  effectLevelContainer.classList.add('hidden');
  currentFilter = 'none';
  const effectNone = form.querySelector('#effect-none');
  if (effectNone) {
    effectNone.checked = true;
  }

  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
    applyFilter(parseFloat(value));
  });
  effectsList.addEventListener('change', onFilterChange);
};

const removeFilters = () => {
  effectsList.removeEventListener('change', onFilterChange);
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
  imagePreview.style.filter = 'none';
  imagePreview.className = '';
  const noneEffectRadio = form.querySelector('#effect-none');
  if (noneEffectRadio) {
    noneEffectRadio.checked = true;
  }
  currentFilter = 'none';
};

const setEffects = () => {
  setScale();
  setFilters();
};

const resetEffects = () => {
  removeScale();
  removeFilters();
};

export {setEffects, resetEffects};
