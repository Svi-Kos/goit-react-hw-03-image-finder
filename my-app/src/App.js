import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

import './App.css';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  // componentDidMount() {
  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=2&key=18966198-cc77d794ba7550ec695901208&image_type=photo&orientation=horizontal&per_page=12',
  //   )
  //     .then(response => response.json())
  //     .catch(error => console.log(error));
  // }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}

export default App;
