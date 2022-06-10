import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  changeQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase().trim() });
  };

  formSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery === '') {
      alert('Ваш запит не коректний');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);

    this.resetInput();
  };

  resetInput = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header class="searchbar">
        <form class="form" onSubmit={this.formSubmit}>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.changeQuery}
          />
        </form>
      </header>
    );
  }
}
