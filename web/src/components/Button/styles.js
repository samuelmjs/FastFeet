import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  margin-left: 10px;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 15px;
  background: ${(props) => (props.color ? props.color : '#7d40e7')};

  font-weight: 500;
  color: #fff;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${(props) =>
      props.color ? darken(0.03, props.color) : darken(0.03, '#7d40e7')};
  }
`;
