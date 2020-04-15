import styled from 'styled-components';
import { lighten } from 'polished';

export const DeliveryStatus = styled.div`
  border-radius: 12px;
  padding: 5px 8px;
  background: ${(props) => lighten(0.3, props.color)};

  display: flex;
  align-items: center;

  div {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: ${(props) => props.color};
    margin: 0 5px 0;
  }

  p {
    font-weight: 500;
    color: ${(props) => props.color};
  }
`;
