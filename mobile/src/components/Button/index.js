import React from 'react';
import PropTypes from 'prop-types';

import { Container, Text, Loading } from './styles';

export default function Button({ loading, color, children, ...rest }) {
  return (
    <Container color={color} {...rest}>
      {loading ? <Loading /> : <Text>{children}</Text>}
    </Container>
  );
}

Button.propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  loading: null,
  color: '',
};
