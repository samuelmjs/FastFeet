import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
`;

export const Form = styled.View`
  height: 45%;
`;

export const Input = styled.TextInput.attrs({
  numberOfLine: 10,
})`
  height: 100%;
  padding: 30px 20px;
  border-radius: 4px;
  font-size: 16px;
  background: #fff;
  padding-top: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.07);
  elevation: 3;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
