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

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    strong {
      color: #444;
      margin: 10px 0;
    }

    small {
      margin: 3px 0;
      color: #666;
      font-size: 16px;
    }

    > div {
      display: flex;
      margin-bottom: 10px;

      p {
        font-size: 16px;
        color: #666;
        margin: 3px 0;
        font-weight: bold;
        white-space: normal;
      }
    }
  }

  #signature {
    padding-top: 15px;
    align-items: center;
  }

  > div + div {
    margin-top: 9px;
    border-top: 1px solid #eee;
  }
`;
