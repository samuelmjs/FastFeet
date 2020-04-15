import React from 'react';

import Item from '~/components/Item';
import Actions from '~/components/Actions';

import { DeliveryStatus } from './styles';

export default function DeliveryItem({
  id,
  name,
  deliveryman,
  city,
  state,
  status,
}) {
  return (
    <Item>
      <p>#{id}</p>
      <p>{name}</p>
      <div>
        <img
          src={`https://api.adorable.io/avatars/80/${deliveryman}.png`}
          alt="avatar"
        />
        <p>{deliveryman}</p>
      </div>
      <p>{city}</p>
      <p>{state}</p>
      <DeliveryStatus color={status.color}>
        <div />
        <p>{status.type}</p>
      </DeliveryStatus>

      <Actions routeForm="/deliveries/form" />
    </Item>
  );
}
