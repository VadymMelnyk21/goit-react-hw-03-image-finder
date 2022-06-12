import { Component } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import { fetchImage } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import scroll from '../services/scroll';
import Error from './Error/Error';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: 'idle',
    totalHits: 0,
    error: '',
    showModal: false,
    modalImage: null,
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

  toggleModal = largeImageURL => {
    this.setState(({ showModal, modalImage }) => ({
      showModal: !showModal,
      modalImage: largeImageURL,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.searchQuery;
    const prevPage = prevState.page;

    const nextImages = this.state.searchQuery;
    const nextPage = this.state.page;

    if (prevImages !== nextImages || prevPage !== nextPage) {
      // this.setState({
      //   status: 'pending',
      // });
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
      .catch(error =>
        this.setState({ error: error.message, status: 'rejected' })
      );
  };

  render() {
    const { images, status, error, showModal, modalImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchValue} />

        {status !== 'idle' && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}

        {status === 'resolved' &&
          this.state.images.length !== this.state.totalHits && (
            <Button onClick={this.LoadMore} />
          )}

        {status === 'rejected' && <Error message={error} />}

        {status === 'pending' && <Loader />}

        {showModal && (
          <Modal image={modalImage} closeModal={this.toggleModal} />
        )}
      </>
    );
  }
}
