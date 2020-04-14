import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import Item from '~/components/Item';

// import { Container } from './styles';

export default function DeliveryItem() {
  return (
    <Item>
      <p>#01</p>
      <p>Joao Pereira</p>
      <div>
        <img
          src="https://api.adorable.io/avatars/80/abott@adorable.png"
          alt="avatar"
        />
      </div>
      <p>jpereira@fastfeet.com</p>
      <p>
        <MdMoreHoriz size={20} color="#444" />
      </p>
    </Item>
  );
}
