import { ImageCard } from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <li key={image.id} className={css.photoCard}>
          <ImageCard item={image} />
        </li>
      ))}
    </ul>
  );
};
