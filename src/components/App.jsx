import { Component } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import { fetchImage } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

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

  LoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log(this.state.page);
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.searchQuery;
    const prevPage = prevState.page;

    const nextImages = this.state.searchQuery;
    const nextPage = this.state.page;

    if (prevImages !== nextImages || prevPage !== nextPage) {
      this.setState({
        // page: 1,
        // images: [],
      });
      if (nextPage === 1) {
        this.setState({ images: [] });
      }
      this.fetchGallery();
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
        <Button onClick={this.LoadMore} />
        <Loader />
      </>
    );
  }
}
