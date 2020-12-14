import React, { Component } from 'react';
import s from '../ImageGallery/ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      const url = `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=18966198-cc77d794ba7550ec695901208&image_type=photo&orientation=horizontal&per_page=12`;

      fetch(url)
        .then(r => r.json())
        .then(images => this.setState({ images }));
    }
  }

  render() {
    console.log(this.state.images && this.state.images.hits[0].id);
    return (
      <ul className={s.ImageGallery}>
        {/* <li>{this.state.images && this.state.images.hits[0].tags}</li> */}
        {this.state.images &&
          this.state.images.hits.map(image => (
            <li className={s.ImageGalleryItem} key={image.id}>
              <a href={image.largeImageURL}>
                <img
                  src={image.webformatURL}
                  alt={image.tag}
                  className={s.ImageGalleryItemImage}
                />
              </a>
            </li>
          ))}
      </ul>
    );
  }
}

export default ImageGallery;
