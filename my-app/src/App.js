import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import './App.css';

class App extends Component {
  render() {
    const url =
      'https://pixabay.com/api/?q=sport&page=1&key=18966198-cc77d794ba7550ec695901208&image_type=photo&orientation=horizontal&per_page=12';
    console.log(url);

    return (
      <div>
        <Searchbar />
      </div>
    );
  }
}

export default App;
