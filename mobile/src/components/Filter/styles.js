import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin-left: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => (props.active ? '#7d40e7' : 'transparent')};
`;

export const Text = styled.Text`
  color: ${(props) => (props.active ? '#7d40e7' : '#444')};
  font-size: 12px;
  font-weight: bold;
`;
