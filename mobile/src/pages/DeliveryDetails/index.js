import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Background from '~/components/Background';
import Actions from './Actions';

import {
  Container,
  DeliveryInfoContainer,
  DeliveryHeader,
  DeliveryTitle,
  DeliveryInfo,
  DeliveryText,
  DeliveryDescription,
  DeliveryStatusDate,
} from './styles';

export default function DeliveryDetails({ navigation }) {
  const delivery = useMemo(() => navigation.getParam('delivery'), [navigation]);

  return (
    <Background>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Container>
        <DeliveryInfoContainer>
          <DeliveryHeader>
            <MaterialIcons size={25} name="local-shipping" color="#7d40e7" />
            <DeliveryTitle>Informação da entrega</DeliveryTitle>
          </DeliveryHeader>

          <DeliveryInfo>
            <DeliveryText>DESTINATÁRIO</DeliveryText>
            <DeliveryDescription>{delivery.recipient.name}</DeliveryDescription>
          </DeliveryInfo>

          <DeliveryInfo>
            <DeliveryText>ENDEREÇO DE ENTRAGA</DeliveryText>
            <DeliveryDescription>
              {delivery.addressFormatted}
            </DeliveryDescription>
          </DeliveryInfo>

          <DeliveryInfo>
            <DeliveryText>PRODUTO</DeliveryText>
            <DeliveryDescription>{delivery.product}</DeliveryDescription>
          </DeliveryInfo>
        </DeliveryInfoContainer>

        <DeliveryInfoContainer>
          <DeliveryHeader>
            <MaterialIcons size={25} name="local-shipping" color="#7d40e7" />
            <DeliveryTitle>Situação da entrega</DeliveryTitle>
          </DeliveryHeader>

          <DeliveryInfo>
            <DeliveryText>STATUS</DeliveryText>
            <DeliveryDescription>{delivery.status}</DeliveryDescription>
          </DeliveryInfo>

          <DeliveryStatusDate>
            <DeliveryInfo>
              <DeliveryText>DATA DE RETIRADA</DeliveryText>
              <DeliveryDescription>
                {delivery.startDateFormatted || '--/--/--'}
              </DeliveryDescription>
            </DeliveryInfo>

            <DeliveryInfo>
              <DeliveryText>DATA DE ENTREGA</DeliveryText>
              <DeliveryDescription>
                {delivery.endDateFormatted || '--/--/--'}
              </DeliveryDescription>
            </DeliveryInfo>
          </DeliveryStatusDate>
        </DeliveryInfoContainer>

        <Actions
          deliveryId={delivery.id}
          date={{ start: delivery.start_date, end: delivery.end_date }}
        />
      </Container>
    </Background>
  );
}

DeliveryDetails.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

DeliveryDetails.navigationOptions = {
  headerTitle: 'Detalhes da encomenda',
};
