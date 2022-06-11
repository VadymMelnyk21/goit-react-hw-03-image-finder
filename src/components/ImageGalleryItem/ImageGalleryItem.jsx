export default function ImageGalleryItem({ previewImage, alt }) {
  return (
    <li>
      <img src={previewImage} alt={alt} />
    </li>
  );
}
