import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import Item from '~/components/Item';

// import { Container } from './styles';

export default function DeliveryItem() {
  return (
    <Item>
      <p>#01</p>
      <p>Caminhão bateu com todas as mercadorias dentro</p>
      <p>
        <MdMoreHoriz size={20} color="#444" />
      </p>
    </Item>
  );
}
