import React from 'react';
import PropTypes from 'prop-types';

import Item from '~/components/Item';
import Actions from '~/components/Actions';

// import { Container } from './styles';

export default function RecipientItem({ recipient }) {
  return (
    <Item>
      <p>#{recipient.id}</p>
      <p>{recipient.name}</p>
      <p>{recipient.address}</p>
      <Actions routeForm={`/recipients/${recipient.id}/form`} />
    </Item>
  );
}

RecipientItem.propTypes = {
  recipient: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};
