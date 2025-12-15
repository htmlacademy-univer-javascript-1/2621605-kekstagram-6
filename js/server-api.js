const SERVER_METHODS = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

const getDataFromServer = (onSuccess, onError) => {
  fetch(SERVER_METHODS.GET)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendDataToServer = (onSuccess, onError, body) => {
  fetch(SERVER_METHODS.POST, {
    method: 'POST',
    body,
  })
    .then((response) => response.json())
    .then(() => {
      onSuccess();
    })
    .catch((err) => {
      onError(err);
    });
};

export { getDataFromServer, sendDataToServer };
