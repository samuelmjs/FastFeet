import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, More, ActionItems } from './styles';

export default function Actions({ children }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <More onClick={handleToggleVisible}>
        <MdMoreHoriz size={20} color="#666" />
      </More>

      <ActionItems visible={visible}>{children}</ActionItems>
    </Container>
  );
}

Actions.propTypes = {
  children: PropTypes.element.isRequired,
};
