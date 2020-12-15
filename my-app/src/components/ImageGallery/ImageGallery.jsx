import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from '../ImageGallery/ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };
  // 'idle'
  // 'pending'
  // 'resolved'
  // 'rejected'

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      const url = `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=18966198-cc77d794ba7550ec695901208&image_type=photo&orientation=horizontal&per_page=12`;
      const errorMessage = 'Please enter more specific query';

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(errorMessage));
        })
        .then(images => {
          this.setState({ images, status: 'resolved' });
          if (images.hits.length === 0) {
            alert(errorMessage);
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return (
        <Loader
          type="ThreeDots"
          color="#303f9f"
          height={80}
          width={80}
          style={{ textAlign: 'center' }}
        />
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem images={images} />
          </ul>
          <Button />
        </>
      );
    }
  }
}

// кнопка лишається після помилки

// пропси

export default ImageGallery;
