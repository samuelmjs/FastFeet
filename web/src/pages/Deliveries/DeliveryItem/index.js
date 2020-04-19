import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdModeEdit, MdDeleteForever, MdImage } from 'react-icons/md';

import history from '~/services/history';

import Item from '~/components/Item';
import Modal from '~/components/Modal';
import Actions from '~/components/Actions';
import { Action } from '~/components/Actions/styles';

import { DeliveryStatus, ModalContent } from './styles';

export default function DeliveryItem({ delivery, onDelete }) {
  const name = useMemo(() => {
    const text = delivery.deliveryman.name.split(' ');

    return {
      fisrt: text[0],
      second: text.length > 1 ? text[1] : '',
    };
  }, [delivery.deliveryman]);

  return (
    <>
      <Item>
        <p>#{delivery.id}</p>
        <p>{delivery.recipient?.name || 'USUÁRIO DELETADO'}</p>
        <div>
          <img
            src={
              delivery.deliveryman.avatar
                ? delivery.deliveryman.avatar.url
                : `https://ui-avatars.com/api/?name=${name.fisrt}+${name.second}&bold=true`
            }
            alt="avatar"
          />
          <p>{delivery.deliveryman?.name || 'USUÁRIO DELETADO'}</p>
        </div>
        <p>{delivery.recipient?.city}</p>
        <p>{delivery.recipient?.state}</p>
        <DeliveryStatus color={delivery.status.color}>
          <div />
          <p>{delivery.status.type}</p>
        </DeliveryStatus>

        <Actions>
          <Action>
            <Modal>
              <ModalContent>
                <div>
                  <strong>Informações da encomenda</strong>

                  <small>
                    {delivery.recipient?.street}, {delivery.recipient?.number}
                  </small>
                  <small>
                    {delivery.recipient?.city} - {delivery.recipient?.state}
                  </small>
                  <small>{delivery.recipient?.cep}</small>
                </div>

                <div>
                  <strong>Datas</strong>

                  <div>
                    <p>Retirada: </p>
                    <small>{delivery.start_dateFormatted}</small>
                  </div>

                  <div>
                    <p>Entrega: </p>
                    <small>{delivery.end_dateFormatted}</small>
                  </div>
                </div>

                <div id="signature">
                  {delivery.signature ? (
                    <img src={delivery.signature.url} alt="Signature" />
                  ) : (
                    <MdImage size={36} color="#999" />
                  )}
                </div>
              </ModalContent>
            </Modal>
          </Action>

          <Action
            onClick={() => history.push(`/deliveries/${delivery.id}/form`)}
          >
            <MdModeEdit size={15} color="#4D85EE" />
            <p>Editar</p>
          </Action>

          <Action onClick={() => onDelete(delivery.id)}>
            <MdDeleteForever size={15} color="#DE3B3B" />
            <p>Excluir</p>
          </Action>
        </Actions>
      </Item>
    </>
  );
}

DeliveryItem.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.number,
    start_dateFormatted: PropTypes.string,
    end_dateFormatted: PropTypes.string,
    signature: PropTypes.shape({
      url: PropTypes.string,
    }),
    recipient: PropTypes.shape({
      street: PropTypes.string,
      number: PropTypes.number,
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      cep: PropTypes.string,
    }),
    deliveryman: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    status: PropTypes.shape({
      type: PropTypes.string,
      color: PropTypes.string,
      background: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
