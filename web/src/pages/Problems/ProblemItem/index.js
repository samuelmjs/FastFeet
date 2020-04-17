import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';

import Modal from '~/components/Modal';
import Item from '~/components/Item';
import Actions from '~/components/Actions';
import { Action } from '~/components/Actions/styles';

import { ModalContainer } from './styles';

export default function ProblemItem({ problem, onDelete }) {
  return (
    <Item>
      <p>#{problem.delivery_id}</p>
      <p>{problem.description}</p>

      <Actions>
        <Action>
          <Modal>
            <ModalContainer>
              <strong>VISUALIZAR PROBLEMA</strong>
              <p>{problem.description}</p>
            </ModalContainer>
          </Modal>
        </Action>

        <Action onClick={() => onDelete(problem.id)}>
          <MdDeleteForever size={15} color="#DE3B3B" />
          <p>Cancelar</p>
        </Action>
      </Actions>
    </Item>
  );
}

ProblemItem.propTypes = {
  problem: PropTypes.shape({
    id: PropTypes.number,
    delivery_id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
