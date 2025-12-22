const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileSelectorElement = document.querySelector('.img-upload__start input[type=file]');
const picturePreviewElement = document.querySelector('.setup-user-picture');
const effectPreviewElements = document.querySelectorAll('.effects__preview');

fileSelectorElement.addEventListener('change', () => {
  const file = fileSelectorElement.files[0];
  const fileName = file.name.toLowerCase();
  const extensionMatches = ALLOWED_FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (extensionMatches) {
    const imageUrl = URL.createObjectURL(file);
    picturePreviewElement.src = imageUrl;
    effectPreviewElements.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageUrl})`;
    });
  }
});
