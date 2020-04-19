import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const DeliveryInfoContainer = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.07);
  elevation: 3;
`;

export const DeliveryHeader = styled.View`
  margin-bottom: 10px;

  flex-direction: row;
  align-items: center;
`;

export const DeliveryTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const DeliveryInfo = styled.View``;

export const DeliveryText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  margin-bottom: 5px;
`;

export const DeliveryDescription = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  color: #444;
  margin-bottom: 15px;
`;

export const DeliveryStatusContainer = styled.View``;

export const DeliveryStatusDate = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
