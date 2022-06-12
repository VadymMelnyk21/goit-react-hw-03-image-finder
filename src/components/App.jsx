import { Component } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import { fetchImage } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import scroll from '../services/scroll';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: null,
    totalHits: 0,
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
        status: 'pending',
      });
      if (nextPage === 1) {
        this.setState({ images: [] });
      }
      this.fetchGallery();
    }
    if (prevPage > 1) {
      scroll();
    }
  }

  fetchGallery = () => {
    const { searchQuery, page } = this.state;
    this.setState({ status: 'pending' });

    fetchImage(searchQuery, page)
      .then(response => {
        console.log(response);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolved',
          totalHits: response.totalHits,
        }));
      })
      .catch(error => console.log(error));
  };

  render() {
    const { images, status } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchValue} />
        <ImageGallery images={images} />
        {status === 'resolved' &&
          this.state.images.length !== this.state.totalHits && (
            <Button onClick={this.LoadMore} />
          )}
        {status === 'pending' && <Loader />}
      </>
    );
  }
}
