const TIME_DELAY = 500;
const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIME_DELAY);
  };
}

const shuffleArray = (array) => {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export {isEscapeKey, debounce, shuffleArray};
