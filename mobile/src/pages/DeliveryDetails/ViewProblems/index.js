import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { parseISO, format } from 'date-fns';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  DeliveryTitle,
  Problems,
  ProblemContainer,
  ProblemDescription,
  ProblemDate,
} from './styles';

export default function ViewProblems({ navigation }) {
  const deliveryId = useMemo(() => navigation.getParam('deliveryId'), [
    navigation,
  ]);

  const [problems, setProblems] = useState([]);

  async function getProblems() {
    try {
      const response = await api.get(`deliveries/${deliveryId}/problems`);

      setProblems(
        response.data.map((problem) => ({
          ...problem,
          dateFormatted: format(parseISO(problem.createdAt), 'dd/MM/yyyy'),
        }))
      );
    } catch (error) {
      Alert('Erro', 'Ocorreu um erro ao buscar problemas, tente mais tarde');
    }
  }

  useEffect(() => {
    getProblems();
  }, []);

  return (
    <Background>
      <Container>
        <DeliveryTitle>Encomenda {deliveryId}</DeliveryTitle>

        <Problems
          data={problems}
          keyExtractor={(problem) => String(problem.id)}
          renderItem={({ item }) => (
            <ProblemContainer>
              <ProblemDescription>{item.description}</ProblemDescription>
              <ProblemDate>{item.dateFormatted}</ProblemDate>
            </ProblemContainer>
          )}
        />
      </Container>
    </Background>
  );
}

ViewProblems.navigationOptions = {
  headerTitle: 'Visualizar problemas',
};
