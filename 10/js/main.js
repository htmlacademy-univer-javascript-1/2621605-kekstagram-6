import {generatePhotos} from './data.js';
import {renderPhotos} from './mini-pictures.js';
import { initFormValidation } from './form-validator.js';
renderPhotos(generatePhotos());
initFormValidation();
