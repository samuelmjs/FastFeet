import styled from 'styled-components/native';

export const Container = styled.View`
  max-height: 300px;
  margin: 0 0 28px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.07);
  elevation: 3;
`;

export const DeliveryHeader = styled.View`
  padding: 15px;

  flex-direction: row;
  align-items: center;
`;

export const DeliveryTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const DeliveryDetailContainer = styled.View`
  padding: 20px 15px;
  background: #f8f9fd;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DeliveryDetail = styled.View`
  flex: 1;
`;

export const DeliveryDetailText = styled.Text`
  font-size: 8px;
  color: #999;
  font-weight: bold;
`;

export const DeliveryDescription = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 12px;
  color: #444;
  font-weight: bold;
`;

export const DeliveryDetailButton = styled.TouchableOpacity``;

export const DeliveryDetailButtonText = styled.Text`
  font-size: 12px;
  color: #7d40e7;
  font-weight: bold;
`;
