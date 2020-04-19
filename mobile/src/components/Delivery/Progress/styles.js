import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  align-self: stretch;
  margin: 30px 0;
  padding: 0 10px;
`;

export const ProgressLine = styled.View`
  height: 1px;
  background: #7d40e7;
  border: 1px solid #7d40e7;
  margin: 0 24px;
`;

export const ProgressContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: -6px;
`;

export const ProgressDetail = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const ProgressDot = styled.View`
  width: 11px;
  height: 11px;
  border: 1px solid #7d40e7;
  border-radius: 6px;
  background: ${(props) => (props.inProgress ? '#7d40e7' : '#fff')};
  margin-bottom: 5px;
`;

export const ProgressText = styled.Text`
  color: #999;
  font-size: 9px;
  max-width: 60px;
  text-align: center;
`;
