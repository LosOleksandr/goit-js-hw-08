// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line

const galleryList = document.querySelector('.gallery');

const makeGallery = gallery => {
  const imagesToAdd = gallery
    .map(
      img => `<li class="gallery__item">
      <a class="gallery__link" href="${img.original}">
         <img class="gallery__image" src="${img.preview}" alt="${img.description}" />
      </a>
   </li>`
    )
    .join('');

  return imagesToAdd;
};

galleryList.insertAdjacentHTML('beforeend', makeGallery(galleryItems));

new SimpleLightbox('.gallery a', {
  /* options */
  overlayOpacity: 0.9,
  captionsData: 'alt',
  captionDelay: 250,
});
