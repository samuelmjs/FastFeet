import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function Item({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Item.propTypes = {
  children: PropTypes.element.isRequired,
};
