import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({ children, color, ...rest }) {
  return (
    <Container color={color} {...rest}>
      {children}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.element.isRequired,
  color: PropTypes.string,
};

Button.defaultProps = {
  color: null,
};
