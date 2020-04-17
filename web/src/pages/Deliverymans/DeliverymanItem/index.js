import React from 'react';
import PropTypes from 'prop-types';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';

import Item from '~/components/Item';
import Actions from '~/components/Actions';
import { Action } from '~/components/Actions/styles';

// import { Container } from './styles';

export default function DeliveryItem({ deliveryman, onDelete }) {
  const deliverymanFormattedName = deliveryman.name.split(' ');

  return (
    <Item>
      <p>#{deliveryman.id}</p>
      <p>{deliveryman.name}</p>
      <div>
        <img
          src={
            deliveryman.avatar
              ? deliveryman.avatar.url
              : `https://ui-avatars.com/api/?name=${
                  deliverymanFormattedName[0][0]
                }+${
                  deliverymanFormattedName.length > 1
                    ? deliverymanFormattedName[1][0]
                    : ' '
                }&bold=true`
          }
          alt="avatar"
        />
      </div>
      <p>{deliveryman.email}</p>
      <Actions>
        <Action
          onClick={() => history.push(`/deliverymen/${deliveryman.id}/form`)}
        >
          <MdModeEdit size={15} color="#4D85EE" />
          <p>Editar</p>
        </Action>

        <Action onClick={() => onDelete(deliveryman.id)}>
          <MdDeleteForever size={15} color="#DE3B3B" />
          <p>Excluir</p>
        </Action>
      </Actions>
    </Item>
  );
}

DeliveryItem.propTypes = {
  deliveryman: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
