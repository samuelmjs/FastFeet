import styled from 'styled-components/native';

export const Container = styled.View`
  background: #f8f9fd;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.07);
  elevation: 3;
  margin: 10px 0 0;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DeliveryAction = styled.TouchableOpacity`
  padding: 20px 10px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  flex: 1;
  align-items: center;
`;

export const DeliveryActionText = styled.Text`
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 6px;
`;

export const Line = styled.View`
  height: 100%;
  width: 1px;
  background: #eee;
`;

export const ConfirmWithdrawal = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

export const ContainerSmall = styled.View`
  flex-direction: row;
  border-radius: 4px;
  background: #f8f9fd;
  padding: 5px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 3px #0000001a;
  elevation: 3;
`;

export const TextLarge = styled.Text`
  color: #999;
  font-size: 14px;
  margin-left: 5px;
`;
