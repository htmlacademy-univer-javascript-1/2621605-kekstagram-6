import { isEscapeKey } from './util.js';

const COMMENTS_PER_PART = 5;
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentLoaderButton = bigPicture.querySelector('.comments-loader');
const hidePictureButton = document.querySelector('.big-picture__cancel');
let commentsShown = 0;
let currentComments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentElement.append(commentAvatar, commentText);
  return commentElement;
};

hidePictureButton.addEventListener('click', hideBigPicture);

const updateCommentsCounter = () => {
  const totalCommentsElement = commentCountBlock.querySelector('.comments-count');
  if (totalCommentsElement) {
    totalCommentsElement.textContent = currentComments.length;
  }
  commentCountBlock.firstChild.textContent = `${commentsShown} из `;
};

const renderComments = () => {
  const commentsPart = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PART);
  commentsPart.forEach((comment) => {
    socialComments.append(createCommentElement(comment));
  });
  commentsShown += commentsPart.length;
  updateCommentsCounter();
  if (commentsShown >= currentComments.length) {
    commentLoaderButton.classList.add('hidden');
  }
};

const clearComments = () => {
  socialComments.innerHTML = '';
  commentsShown = 0;
  currentComments = [];
  commentLoaderButton.classList.remove('hidden');
  commentLoaderButton.removeEventListener('click', renderComments);
};

function hideBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearComments();
}

const showBigPicture = (picture) => {
  const {url, description, likes, comments} = picture;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  clearComments();
  currentComments = comments;
  renderComments();
  commentLoaderButton.addEventListener('click', renderComments);

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

export{showBigPicture};
