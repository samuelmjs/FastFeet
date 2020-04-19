import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import Background from '~/components/Background';

import api from '~/services/api';

import { Container, Form, Input, SubmitButton } from './styles';

export default function ReportProblem({ navigation }) {
  const deliveryId = useMemo(() => navigation.getParam('deliveryId'), [
    navigation,
  ]);

  const [description, setDescription] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`deliveries/${deliveryId}/problems`, {
        description,
      });

      Alert.alert('Problema enviado!', 'Já estamos analisando sua mensagem', [
        {
          title: 'Entendi',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Mensagem não pode ser enviada', [
        {
          title: 'Entendi',
        },
      ]);
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <Input
            multiline
            value={description}
            onChangeText={setDescription}
            autoCapitalize="none"
            numberOfLines={10}
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
        </Form>

        <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
      </Container>
    </Background>
  );
}

ReportProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

ReportProblem.navigationOptions = {
  headerTitle: 'Informar problema',
};
