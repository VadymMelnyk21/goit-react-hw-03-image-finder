import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export default function ImageGallery({ images }) {
  return (
    <List>
      {images.map(({ id, tags, webformatURL }) => (
        <ImageGalleryItem key={id} alt={tags} previewImage={webformatURL} />
      ))}
    </List>
  );
}
