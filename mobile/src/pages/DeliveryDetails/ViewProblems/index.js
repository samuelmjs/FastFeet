import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { parseISO, format } from 'date-fns';

import api from '~/services/api';

import Background from '~/components/Background';
import Placeholder from './Placeholder';

import {
  Container,
  DeliveryTitle,
  Problems,
  ProblemContainer,
  ProblemDescription,
  ProblemDate,
  Empty,
} from './styles';

export default function ViewProblems({ navigation }) {
  const deliveryId = useMemo(() => navigation.getParam('deliveryId'), [
    navigation,
  ]);

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    getProblems().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Background>
      <Container>
        <DeliveryTitle>Encomenda {deliveryId}</DeliveryTitle>

        {loading ? (
          <Placeholder />
        ) : (
          <Problems
            data={problems}
            keyExtractor={(problem) => String(problem.id)}
            ListEmptyComponent={<Empty>Não possui problemas :(</Empty>}
            renderItem={({ item }) => (
              <ProblemContainer>
                <ProblemDescription>{item.description}</ProblemDescription>
                <ProblemDate>{item.dateFormatted}</ProblemDate>
              </ProblemContainer>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

ViewProblems.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

ViewProblems.navigationOptions = {
  headerTitle: 'Visualizar problemas',
};
