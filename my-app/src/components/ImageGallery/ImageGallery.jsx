import React, { Component } from 'react';
import imageAPI from '../../services/apiSevice';
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
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      const errorMessage = 'Please enter more specific query';

      imageAPI
        .fetchImages(this.props.searchQuery, this.state.page)
        .then(images => {
          this.setState({ images: images.hits, status: 'resolved' });
          if (images.length === 0) {
            alert(errorMessage);
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onLoadMore = () => {
    imageAPI
      .fetchImages(this.props.searchQuery, this.state.page)
      .then(newImages => {
        this.setState(({ images, page }) => ({
          images: [...images, ...newImages.hits],
          page: page + 1,
        }));
      });

    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: 'smooth',
    // });
  };

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
      return <p>{error.message}</p>;
    }

    if (status === 'resolved' && images.length !== 0) {
      return (
        <>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem images={images} />
          </ul>
          <Button onLoadMore={this.onLoadMore} />
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default ImageGallery;
