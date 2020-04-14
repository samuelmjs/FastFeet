import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 60px 30px;

  form {
    display: flex;
    flex-direction: column;

    margin-top: 30px;

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 0 15px;

      p {
        font-weight: 500;
        color: #444;
        margin-bottom: 8px;
      }

      input {
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 45px;
        padding: 0 15px;
        color: #444;

        &::placeholder {
          color: #999;
        }
      }

      span {
        color: #de3b3b;
        align-self: flex-start;
        margin: 10px 0 10px;
      }
    }
    button {
      margin: 5px 0 0;
      height: 45px;
      background: #7d40e7;
      font-weight: 500;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
