import s from '../ImageGalleryItem/ImageGalleryItem.module.css';

export default function ImageGalleryItem(props) {
  return (
    <img src={props.src} alt={props.alt} className={s.ImageGalleryItemImage} />
  );
}
