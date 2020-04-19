import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #7d40e7;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Logo = styled.Image`
  margin-bottom: 35px;
`;

export const SubmitButton = styled(Button).attrs({
  color: '#82BF18',
})`
  align-self: stretch;
  margin: 15px 0;
`;
