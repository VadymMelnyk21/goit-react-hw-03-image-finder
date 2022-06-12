import { Component } from 'react';
import { createPortal } from 'react-dom';

const rootModal = document.querySelector('#root-modal');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <div onClick={this.handleBackdrop}>
        <div>
          <img src={image} alt="велике зображення" />
        </div>
      </div>,
      rootModal
    );
  }
}
