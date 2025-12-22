import { setEffects, resetEffects} from './photo-effects.js';
import { isEscapeKey } from './util.js';
import { sendDataToServer } from './server-api.js';
import { showMessage } from './message.js';

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_SYMBOLS = 20;

const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = formElement.querySelector('.img-upload__input');
const uploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

let isMessageOpen = false;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text'
});

const setMessageState = (state) => {
  isMessageOpen = state;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (isMessageOpen) {
      return;
    }
    evt.preventDefault();
    closeForm();
  }
};

const onHashtagsInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onDescriptionInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const validateHashtags = (value) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return true;
  }
  const hashtags = trimmedValue.toLowerCase().split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const seenHashtags = new Set();

  for (const hashtag of hashtags) {
    if (hashtag === '#' ||
        hashtag.length > MAX_HASHTAG_SYMBOLS ||
        !hashtagRegex.test(hashtag) ||
        seenHashtags.has(hashtag)) {
      return false;
    }
    seenHashtags.add(hashtag);
  }
  return true;
};

const getHashtagErrorMessage = (value) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return '';
  }
  const hashtags = trimmedValue.toLowerCase().split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS) {
    return 'Не более 5 хэш-тегов';
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const seenHashtags = new Set();

  for (const hashtag of hashtags) {
    if (hashtag === '#') {
      return 'Хэш-тег не может состоять только из решётки';
    }

    if (hashtag.length > MAX_HASHTAG_SYMBOLS) {
      return 'Максимальная длина хэш-тега 20 символов';
    }

    if (!hashtagRegex.test(hashtag)) {
      return 'Неправильный формат хэш-тега';
    }

    if (seenHashtags.has(hashtag)) {
      return 'Хэш-теги не должны повторяться';
    }
    seenHashtags.add(hashtag);
  }
  return '';
};

pristine.addValidator(
  hashtagsInputElement,
  validateHashtags,
  getHashtagErrorMessage
);

const onSubmitButtonClick = () => {
  if (submitButtonElement.textContent !== 'Отправка данных') {
    const isValid = pristine.validate();
    submitButtonElement.disabled = !isValid;
  }
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Отправка данных';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
  onSubmitButtonClick();
};

const sendFormData = (formData) => {
  blockSubmitButton();
  const onSendSuccess = () => {
    showMessage('success');
    closeForm();
  };
  const onSendError = () => {
    showMessage('error');
    unblockSubmitButton();
  };
  sendDataToServer(onSendSuccess, onSendError, formData);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  const formData = new FormData(formElement);
  sendFormData(formData);
};
const addTemporaryEventListeners = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagsInputElement.addEventListener('keydown', onHashtagsInputKeydown);
  descriptionInputElement.addEventListener('keydown', onDescriptionInputKeydown);
  hashtagsInputElement.addEventListener('input', onSubmitButtonClick);
  descriptionInputElement.addEventListener('input', onSubmitButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
};

const removeTemporaryEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagsInputElement.removeEventListener('keydown', onHashtagsInputKeydown);
  descriptionInputElement.removeEventListener('keydown', onDescriptionInputKeydown);
  hashtagsInputElement.removeEventListener('input', onSubmitButtonClick);
  descriptionInputElement.removeEventListener('input', onSubmitButtonClick);
  formElement.removeEventListener('submit', onFormSubmit);
};

const openForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addTemporaryEventListeners();
  setEffects();
  onSubmitButtonClick();
};

function closeForm() {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeTemporaryEventListeners();
  formElement.reset();
  pristine.reset();
  resetEffects();
  unblockSubmitButton();
}

const initFormValidation = () => {
  uploadInputElement.addEventListener('change', openForm);
  cancelButtonElement.addEventListener('click', closeForm);
};

export { initFormValidation, setMessageState };
