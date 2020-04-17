import React from 'react';
import PropTypes from 'prop-types';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';

import Item from '~/components/Item';
import Actions from '~/components/Actions';
import { Action } from '~/components/Actions/styles';

// import { Container } from './styles';

export default function RecipientItem({ recipient, onDelete }) {
  return (
    <Item>
      <p>#{recipient.id}</p>
      <p>{recipient.name}</p>
      <p>{recipient.address}</p>

      <Actions>
        <Action
          onClick={() => history.push(`/recipients/${recipient.id}/form`)}
        >
          <MdModeEdit size={15} color="#4D85EE" />
          <p>Editar</p>
        </Action>

        <Action onClick={() => onDelete(recipient.id)}>
          <MdDeleteForever size={15} color="#DE3B3B" />
          <p>Excluir</p>
        </Action>
      </Actions>
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
