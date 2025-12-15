import { isEscapeKey } from './util.js';
import { setMessageState } from './form-validator.js';

const showMessage = (templateName) => {
  const template = document.querySelector(`#${templateName}`);
  const messageElement = template.content.cloneNode(true);
  const message = messageElement.querySelector(`.${templateName}`);
  document.body.appendChild(message);
  const closeButton = message.querySelector(`.${templateName}__button`);
  const coreBlock = message.querySelector(`.${templateName}__inner`);

  setMessageState(true);

  function closeMessage () {
    message.remove();
    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onOuterClick);
    setMessageState(false);
  }

  function onEscapeKeydown (evt)  {
    if (isEscapeKey(evt)) {
      if (templateName === 'error') {
        closeMessage();
      } else {
        closeMessage();
      }
    }
  }

  function onOuterClick (evt) {
    if (!coreBlock.contains(evt.target)) {
      closeMessage();
    }
  }

  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onOuterClick);

  if (templateName === 'error') {
    closeButton.focus();
  }
};

export { showMessage };
