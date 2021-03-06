import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text } from './styles';

export default function Filter({ active, children, ...rest }) {
  return (
    <Container
      {...rest}
      active={active}
      hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
    >
      <Text active={active}>{children}</Text>
    </Container>
  );
}

Filter.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Filter.defaultProps = {
  active: null,
};
