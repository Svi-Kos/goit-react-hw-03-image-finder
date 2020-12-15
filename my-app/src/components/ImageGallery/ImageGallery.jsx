import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from '../ImageGallery/ImageGallery.module.css';
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';
// import Loader from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class ImageGallery extends Component {
  state = {
    images: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      const url = `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=18966198-cc77d794ba7550ec695901208&image_type=photo&orientation=horizontal&per_page=12`;

      fetch(url)
        .then(response => response.json())
        .then(images => this.setState({ images }))
        .catch(error => console.log('error', error));
    }
  }

  // showLargeImage = event => {
  //   const instance = basicLightbox.create(`
  //     <img src="${event.target.alt}" alt="${event.target.alt}" width="800" height="600">
  // `);

  //   instance.show();
  // };

  render() {
    const { images } = this.state;
    return (
      <ul className={s.ImageGallery}>
        <ImageGalleryItem images={images} />
        {/* {images &&
          images.hits.map(image => (
            <li
              className={s.ImageGalleryItem}
              key={image.id}
              onClick={this.showLargeImage}
            >
              <ImageGalleryItem
                src={image.webformatURL}
                alt={image.largeImageURL}
              />
            </li>
          ))} */}
      </ul>
    );
  }
}

// зробити рендер через статуси

// рендер кнопки після загрузки картинок
// модалка?
// спіннер
// пропси

export default ImageGallery;
