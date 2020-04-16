import styled from 'styled-components';
import { lighten } from 'polished';

export const DeliveryStatus = styled.div`
  border-radius: 12px;
  padding: 5px;
  background: ${(props) => lighten(0.3, props.color)};

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: ${(props) => props.color};
    margin: 0 3px 0;
  }

  p {
    display: block;
    font-weight: 500;
    text-align: center;
    color: ${(props) => props.color};
  }
`;
