import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import Item from '~/components/Item';

// import { Container } from './styles';

export default function DeliveryItem() {
  return (
    <Item>
      <p>#01</p>
      <p>Samuel Monteiro</p>
      <p>Rua José Maciel Neto, Taboão da Serra, São Paulo</p>
      <p>
        <MdMoreHoriz size={20} color="#444" />
      </p>
    </Item>
  );
}
