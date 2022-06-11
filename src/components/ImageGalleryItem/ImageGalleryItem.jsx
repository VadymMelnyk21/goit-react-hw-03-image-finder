import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ previewImage, alt }) {
  return (
    <Item>
      <Image src={previewImage} alt={alt} />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
