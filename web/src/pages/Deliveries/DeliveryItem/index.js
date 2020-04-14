import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import Item from '~/components/Item';

// import { Container } from './styles';

export default function DeliveryItem() {
  return (
    <Item>
      <p>#01</p>
      <p>Samuel Monteiro</p>
      <div>
        <img
          src="https://api.adorable.io/avatars/80/abott@adorable.png"
          alt="avatar"
        />
        <p>João Pereira</p>
      </div>
      <p>Taboão da Serra</p>
      <p>São Paulo</p>
      <p>Pendente</p>
      <p>
        <MdMoreHoriz size={20} color="#444" />
      </p>
    </Item>
  );
}
