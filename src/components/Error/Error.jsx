import PropTypes from 'prop-types';
import { Message } from './Error.styled';

export default function Error({ message }) {
  return <Message>{message}</Message>;
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
