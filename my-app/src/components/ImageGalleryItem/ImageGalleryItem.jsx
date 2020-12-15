import React, { Component } from 'react';
import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

class ImageGalleryItem extends Component {
  showLargeImage = event => {
    const instance = basicLightbox.create(`
      <img src="${event.target.alt}" alt="${event.target.alt}" width="800" height="600">
  `);

    instance.show();
  };

  render() {
    return (
      <>
        {this.props.images &&
          this.props.images.hits.map(image => (
            <li
              className={s.ImageGalleryItem}
              key={image.id}
              onClick={this.showLargeImage}
            >
              <img
                src={image.webformatURL}
                alt={image.largeImageURL}
                className={s.ImageGalleryItemImage}
              />
            </li>
          ))}
      </>
    );
  }
}

export default ImageGalleryItem;
