import React from 'react';
import PropTypes from 'prop-types';

import Actions from '~/components/Actions';
import Item from '~/components/Item';

// import { Container } from './styles';

export default function DeliveryItem({ deliveryman }) {
  return (
    <Item>
      <p>#{deliveryman.id}</p>
      <p>{deliveryman.name}</p>
      <div>
        <img
          src="https://api.adorable.io/avatars/80/abott@adorable.png"
          alt="avatar"
        />
      </div>
      <p>{deliveryman.email}</p>
      <Actions routeForm={`deliverymen/${deliveryman.id}/form`} />
    </Item>
  );
}

DeliveryItem.propTypes = {
  deliveryman: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
