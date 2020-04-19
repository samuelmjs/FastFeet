import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
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

function Delivery({ delivery, navigation }) {
  return (
    <Container>
      <DeliveryHeader>
        <MaterialIcons size={25} name="local-shipping" color="#7d40e7" />
        <DeliveryTitle>Encomenda {delivery.id}</DeliveryTitle>
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

        <DeliveryDetailButton
          onPress={() => navigation.navigate('DeliveryDetail', { delivery })}
        >
          <DeliveryDetailButtonText>Ver detalhes</DeliveryDetailButtonText>
        </DeliveryDetailButton>
      </DeliveryDetailContainer>
    </Container>
  );
}

Delivery.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.number,
    dateFormatted: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigation(Delivery);
