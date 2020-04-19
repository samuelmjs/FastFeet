import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #7d40e7;
  justify-content: center;
  padding: 0 30px;
`;

export const SubmitButton = styled(Button).attrs({
  color: '#82BF18',
})`
  margin: 15px 0;
`;
