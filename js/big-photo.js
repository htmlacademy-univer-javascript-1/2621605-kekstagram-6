import { isEscapeKey } from './util.js';

const COMMENTS_PER_PART = 5;

const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentCountBlockElement = bigPictureElement.querySelector('.social__comment-count');
const commentLoaderButtonElement = bigPictureElement.querySelector('.comments-loader');
const hidePictureButtonElement = document.querySelector('.big-picture__cancel');
const totalCommentsElement = commentCountBlockElement.querySelector('.comments-count');

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

hidePictureButtonElement.addEventListener('click', hideBigPicture);

const updateCommentsCounter = () => {
  if (totalCommentsElement) {
    totalCommentsElement.textContent = currentComments.length;
  }
  commentCountBlockElement.firstChild.textContent = `${commentsShown} из `;
};

const onCommentLoaderClick = () => {
  const commentsPart = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PART);
  commentsPart.forEach((comment) => {
    socialCommentsElement.append(createCommentElement(comment));
  });
  commentsShown += commentsPart.length;
  updateCommentsCounter();
  commentLoaderButtonElement.classList.toggle('hidden', commentsShown >= currentComments.length);
};

const clearComments = () => {
  socialCommentsElement.innerHTML = '';
  commentsShown = 0;
  currentComments = [];
  commentLoaderButtonElement.classList.remove('hidden');
  commentLoaderButtonElement.removeEventListener('click', onCommentLoaderClick);
};

function hideBigPicture () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearComments();
}

const showBigPicture = (picture) => {
  const {url, description, likes, comments} = picture;
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  clearComments();
  currentComments = comments;
  onCommentLoaderClick();
  commentLoaderButtonElement.addEventListener('click', onCommentLoaderClick);

  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

export{showBigPicture};
