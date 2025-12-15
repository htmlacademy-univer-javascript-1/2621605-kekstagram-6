const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileSelector = document.querySelector('.img-upload__start input[type=file]');
const picturePreview = document.querySelector('.setup-user-picture');
const effectPreviews = document.querySelectorAll('.effects__preview');

fileSelector.addEventListener('change', () => {
  const file = fileSelector.files[0];
  const fileName = file.name.toLowerCase();
  const extensionMatches = ALLOWED_FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (extensionMatches) {
    const imageUrl = URL.createObjectURL(file);
    picturePreview.src = imageUrl;
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageUrl})`;
    });
  }
});
