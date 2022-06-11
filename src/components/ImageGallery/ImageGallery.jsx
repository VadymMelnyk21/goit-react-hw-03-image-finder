import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images }) {
  return (
    <ul>
      {images.map(({ id, tags, webformatURL }) => (
        <ImageGalleryItem key={id} alt={tags} previewImage={webformatURL} />
      ))}
    </ul>
  );
}
