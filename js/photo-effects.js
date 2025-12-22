const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const formElement = document.querySelector('.img-upload__form');
const downsizeButtonElement = formElement.querySelector('.scale__control--smaller');
const enlargeButtonElement = formElement.querySelector('.scale__control--bigger');
const sizeValueElement = formElement.querySelector('.scale__control--value');
const imagePreviewElement = formElement.querySelector('.img-upload__preview img');
const effectsListElement = formElement.querySelector('.effects__list');
const effectLevelContainerElement = formElement.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = formElement.querySelector('.effect-level__slider');
const effectLevelValueElement = formElement.querySelector('.effect-level__value');
const effectNoneElement = formElement.querySelector('#effect-none');

const Effects = {
  NONE: {range: { min: 0, max: 1 }, start: 1, step: 0.1, connect: 'lower', applyFilter: () => 'none', format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    }
  }},
  CHROME: {range: {min: 0, max: 1}, start: 1, step: 0.1, applyFilter: (value) => `grayscale(${value})`, format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }},
  SEPIA: {range: {min: 0, max: 1}, start: 1, step: 0.1, applyFilter: (value) => `sepia(${value})`, format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }},
  MARVIN: {range: {min: 0, max: 100}, start: 100, step: 1, applyFilter: (value) => `invert(${value}%)`, format: {
    to: function (value) {
      return `${value}%`;
    },
    from: function (value) {
      return parseFloat(value);
    }
  }},
  PHOBOS: {range: {min: 0, max: 3}, start: 3, step: 0.1, applyFilter: (value) => `blur(${value}px)`, format: {
    to: function (value) {
      return `${value.toFixed(1)}px`;
    },
    from: function (value) {
      return parseFloat(value);
    }
  }},
  HEAT: {range: {min: 1, max: 3}, start: 3, step: 0.1, applyFilter: (value) => `brightness(${value})`, format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }}
};

let currentScale = 100;
let currentFilter = 'none';

const updateScale = () => {
  sizeValueElement.value = `${currentScale}%`;
  const scaleValue = currentScale / 100;
  imagePreviewElement.style.transform = `scale(${scaleValue})`;
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
  downsizeButtonElement.addEventListener('click', onSmallerClick);
  enlargeButtonElement.addEventListener('click', onBiggerClick);
  currentScale = MAX_SCALE;
  updateScale();
};

const removeScale = () => {
  downsizeButtonElement.removeEventListener('click', onSmallerClick);
  enlargeButtonElement.removeEventListener('click', onBiggerClick);
  imagePreviewElement.style.transform = 'scale(1)';
};

const applyFilter = (value) => {
  const effectKey = currentFilter.toUpperCase();
  const effect = Effects[effectKey];
  imagePreviewElement.style.filter = effect.applyFilter(value);
};

const updateSlider = (filterName) => {
  currentFilter = filterName;
  const effectKey = filterName.toUpperCase();
  const effect = Effects[effectKey];

  if (filterName === 'none') {
    effectLevelContainerElement.classList.add('hidden');
    imagePreviewElement.style.filter = 'none';
  } else {
    effectLevelContainerElement.classList.remove('hidden');
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: effect.range,
      start: effect.start,
      step: effect.step
    });
    effectLevelSliderElement.noUiSlider.set(effect.start);
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
  noUiSlider.create(effectLevelSliderElement, Effects.NONE);
  effectLevelContainerElement.classList.add('hidden');
  currentFilter = 'none';
  if (effectNoneElement) {
    effectNoneElement.checked = true;
  }

  effectLevelSliderElement.noUiSlider.on('update', () => {
    const value = effectLevelSliderElement.noUiSlider.get();
    effectLevelValueElement.value = value;
    applyFilter(parseFloat(value));
  });
  effectsListElement.addEventListener('change', onFilterChange);
};

const removeFilters = () => {
  effectsListElement.removeEventListener('change', onFilterChange);
  if (effectLevelSliderElement.noUiSlider) {
    effectLevelSliderElement.noUiSlider.destroy();
  }
  imagePreviewElement.style.filter = 'none';
  imagePreviewElement.className = '';
  if (effectNoneElement) {
    effectNoneElement.checked = true;
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
