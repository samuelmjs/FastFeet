import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

import DeliveryProgress from './Progress';

import {
  Container,
  DeliveryHeader,
  DeliveryTitle,
  DeliveryDetailContainer,
  DeliveryDetail,
  DeliveryDetailText,
  DeliveryDescription,
  DeliveryDetailButton,
  DeliveryDetailButtonText,
} from './styles';

export default function Delivery({ delivery, index }) {
  return (
    <Container>
      <DeliveryHeader>
        <MaterialIcons size={25} name="local-shipping" color="#7d40e7" />
        <DeliveryTitle>Encomenda {index + 1}</DeliveryTitle>
      </DeliveryHeader>

      <DeliveryProgress
        startDate={delivery.start_date}
        endDate={delivery.end_date}
      />

      <DeliveryDetailContainer>
        <DeliveryDetail>
          <DeliveryDetailText>data</DeliveryDetailText>
          <DeliveryDescription>{delivery.dateFormatted}</DeliveryDescription>
        </DeliveryDetail>

        <DeliveryDetail>
          <DeliveryDetailText>Cidade</DeliveryDetailText>
          <DeliveryDescription>{delivery.recipient.city}</DeliveryDescription>
        </DeliveryDetail>

        <DeliveryDetailButton>
          <DeliveryDetailButtonText>Ver detalhes</DeliveryDetailButtonText>
        </DeliveryDetailButton>
      </DeliveryDetailContainer>
    </Container>
  );
}

Delivery.propTypes = {
  delivery: PropTypes.shape({
    dateFormatted: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
