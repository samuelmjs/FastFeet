import React from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import api from '~/services/api';

import {
  Container,
  DeliveryAction,
  DeliveryActionText,
  Line,
  ContainerSmall,
  ConfirmWithdrawal,
  TextLarge,
} from './styles';

function Actions({ navigation, deliveryId, date }) {
  const deliverymanId = useSelector((state) => state.auth.id);

  async function handleCheck() {
    try {
      await api.put(
        `deliverymen/${deliverymanId}/deliveries/${deliveryId}/start`
      );

      Alert.alert(
        'Parabens!',
        'Tudo certo com a retirada. Agora é só entregar para o destinatário',
        [
          {
            text: 'Entendi',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possivel confirmar a retirada, tente mais tarde'
      );
    }
  }

  function handleReportProblem() {
    navigation.navigate('DeliveryReportProblem', { deliveryId });
  }

  function handleViewProblem() {
    navigation.navigate('DeliveryViewProblems', { deliveryId });
  }

  function handleDeliveryOrder() {
    navigation.navigate('DeliveryOrder', { deliveryId });
  }

  return (
    <>
      <ContainerSmall>
        <ConfirmWithdrawal disabled={date.start} onPress={handleCheck}>
          <MaterialIcons name="autorenew" color="#82BF18" size={28} />
          <TextLarge>Confirmar Retirada</TextLarge>
        </ConfirmWithdrawal>
      </ContainerSmall>
      <Container>
        <DeliveryAction onPress={handleReportProblem}>
          <MaterialIcons name="highlight-off" color="#e74040" size={28} />
          <DeliveryActionText>Informar Problema</DeliveryActionText>
        </DeliveryAction>

        <Line />

        <DeliveryAction onPress={handleViewProblem}>
          <MaterialIcons color="#E7BA40" name="info-outline" size={28} />
          <DeliveryActionText>Visualizar Problema</DeliveryActionText>
        </DeliveryAction>

        <Line />

        <DeliveryAction
          disabled={!date.start || date.end}
          onPress={handleDeliveryOrder}
        >
          <MaterialCommunityIcons
            color="#7D40E7"
            name="check-circle-outline"
            size={28}
          />
          <DeliveryActionText>Confirmar Entrega</DeliveryActionText>
        </DeliveryAction>
      </Container>
    </>
  );
}

Actions.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  deliveryId: PropTypes.number.isRequired,
  date: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
};

export default withNavigation(Actions);
