import { setEffects, resetEffects} from './photo-effects.js';
import { isEscapeKey } from './util.js';
import { sendDataToServer } from './server-api.js';
import { showMessage } from './message.js';

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_SYMBOLS = 20;
let isMessageOpen = false;
const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
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

function closeForm()  {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.reset();
  pristine.reset();
  resetEffects();
  unblockSubmitButton();
}

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
    if (hashtag === '#') {
      return false;
    }
    if (hashtag.length > MAX_HASHTAG_SYMBOLS) {
      return false;
    }
    if (!hashtagRegex.test(hashtag)) {
      return false;
    }
    if (seenHashtags.has(hashtag)) {
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
  hashtagsInput,
  validateHashtags,
  getHashtagErrorMessage
);

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

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  updateSubmitButton();
};

function updateSubmitButton() {
  if (submitButton.textContent !== 'Отправка данных') {
    const isValid = pristine.validate();
    submitButton.disabled = !isValid;
  }
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка данных';
};

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
  updateSubmitButton();
}

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

const initFormValidation = () => {
  uploadInput.addEventListener('change', () => {
    openForm();
    updateSubmitButton();
    setEffects();
  });
  cancelButton.addEventListener('click', closeForm);
  hashtagsInput.addEventListener('keydown', onHashtagsInputKeydown);
  descriptionInput.addEventListener('keydown', onDescriptionInputKeydown);
};

hashtagsInput.addEventListener('input', () => {
  updateSubmitButton();
});

descriptionInput.addEventListener('input', () => {
  updateSubmitButton();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  const formData = new FormData(form);
  sendFormData(formData);
});

export { initFormValidation, setMessageState };
