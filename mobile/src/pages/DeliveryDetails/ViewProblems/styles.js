import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const DeliveryTitle = styled.Text`
  padding: 20px 0 0px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 25px;
`;

export const Problems = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20, paddingTop: 10 },
})`
  width: 100%;
`;

export const ProblemContainer = styled.View`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.07);
  elevation: 3;
  margin-bottom: 15px;
  padding: 20px;

  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProblemDescription = styled.Text`
  flex: 1;
  font-size: 16px;
  color: #999;
  margin-right: -10px;
`;

export const ProblemDate = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;

export const Empty = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;
