import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  padding: 0 15px;
  height: 45px;
  background: ${(props) => (props.color ? props.color : '#7D40E7')};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#fff',
})``;

export const Text = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
