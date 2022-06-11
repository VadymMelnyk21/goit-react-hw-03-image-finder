import { Component } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import { fetchImage } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
  };

  searchValue = newQuery => {
    if (newQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery: newQuery,
        page: 1,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.searchQuery;

    const nextImages = this.state.searchQuery;
    const nextPage = this.state.page;

    if (prevImages !== nextImages) {
      this.setState({
        page: 1,
        images: [],
      });
      this.fetchGallery(nextImages, nextPage);
    }
  }

  fetchGallery = () => {
    const { searchQuery, page } = this.state;
    fetchImage(searchQuery, page)
      .then(response => {
        console.log(response);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
        }));
      })
      .catch(error => console.log(error));
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchValue} />
        <ImageGallery images={images} />
      </>
    );
  }
}
