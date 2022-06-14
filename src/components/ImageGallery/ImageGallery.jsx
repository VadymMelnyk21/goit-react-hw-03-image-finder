import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export default function ImageGallery({ images, toggleModal }) {
  return (
    <List>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          alt={tags}
          previewImage={webformatURL}
          onClickImage={() => {
            toggleModal(largeImageURL);
          }}
        />
      ))}
    </List>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  toggleModal: PropTypes.func.isRequired,
};
