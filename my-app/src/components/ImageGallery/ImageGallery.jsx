import React, { Component } from 'react';
import imageAPI from '../../services/apiSevice';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from '../ImageGallery/ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const selfSearchQuery = this.props.searchQuery;
    const selfStatePage = this.state.page;
    const errorMessage = 'Please enter more specific query';
    // let elemScrollTo = document.querySelector('#root ul');

    const loadImagesByQuery = (selfSearchQuery, selfStatePage) => {
      imageAPI
        .fetchImages(selfSearchQuery, selfStatePage)
        .then(newImages => {
          this.setState({
            images: [...prevState.images, ...newImages.hits],
            status: 'resolved',
          });
          if (newImages.length === 0) {
            alert(errorMessage);
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    };

    if (prevProps.searchQuery !== selfSearchQuery) {
      prevState.images = [];
      this.setState({ images: [], status: 'pending', page: 1 });

      loadImagesByQuery(selfSearchQuery, selfStatePage);
    }

    if (prevState.page !== selfStatePage) {
      this.setState({ status: 'pending' });

      loadImagesByQuery(selfSearchQuery, selfStatePage);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      status: 'resolved',
    }));
  };

  render() {
    const { images, error, status } = this.state;

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
