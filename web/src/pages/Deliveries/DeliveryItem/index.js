import React from 'react';
import PropTypes from 'prop-types';

import Item from '~/components/Item';
import Actions from '~/components/Actions';

import { DeliveryStatus } from './styles';

export default function DeliveryItem({ delivery }) {
  return (
    <Item>
      <p>#{delivery.id}</p>
      <p>{delivery.recipient.name}</p>
      <div>
        <img
          src={`https://api.adorable.io/avatars/80/${delivery.deliveryman.name}.png`}
          alt="avatar"
        />
        <p>{delivery.deliveryman.name}</p>
      </div>
      <p>{delivery.recipient.city}</p>
      <p>{delivery.recipient.state}</p>
      <DeliveryStatus color={delivery.status.color}>
        <div />
        <p>{delivery.status.type}</p>
      </DeliveryStatus>

      <Actions routeForm="/deliveries/form" />
    </Item>
  );
}

DeliveryItem.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.number,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    deliveryman: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.shape({
      type: PropTypes.string,
      color: PropTypes.string,
      background: PropTypes.string,
    }),
  }).isRequired,
};
