import React, { useState } from 'react';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdModeEdit,
  MdDeleteForever,
} from 'react-icons/md';
import history from '~/services/history';

import { Container, More, ActionItems, Action } from './styles';

export default function Actions({ routeEdit, routeForm }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    console.tron.log(visible);
    setVisible(!visible);
  }

  return (
    <Container>
      <More onClick={handleToggleVisible}>
        <MdMoreHoriz size={20} color="#444" />
      </More>

      <ActionItems visible={visible}>
        <Action>
          <MdRemoveRedEye size={15} color="#8E5BE8" />
          <p>Visualizar</p>
        </Action>

        <Action onClick={() => history.push(routeForm)}>
          <MdModeEdit size={15} color="#4D85EE" />
          <p>Editar</p>
        </Action>

        <Action>
          <MdDeleteForever size={15} color="#DE3B3B" />
          <p>Excluir</p>
        </Action>
      </ActionItems>
    </Container>
  );
}
