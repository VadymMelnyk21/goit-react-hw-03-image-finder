import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ previewImage, alt, onClickImage }) {
  return (
    <Item>
      <Image src={previewImage} alt={alt} onClick={onClickImage} />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
