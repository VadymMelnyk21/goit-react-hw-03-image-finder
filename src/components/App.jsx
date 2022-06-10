import { Component } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  searchValue = newQuery => {
    if (newQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery: newQuery,
        page: 1,
      });
    }
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.searchValue} />
      </>
    );
  }
}
