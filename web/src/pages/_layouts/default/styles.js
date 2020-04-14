import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #f5f5f5;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  padding: 20px;

  strong {
    font-size: 20px;
  }

  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 20px;

    div {
      display: flex;
      align-items: center;
      background: #fff;
      height: 36px;
      padding: 0 10px;
      border-radius: 4px;
      border: 1px solid #ddd;

      input {
        border: 0;
        margin-left: 10px;
        color: #444;

        &::placeholder {
          color: #999;
        }
      }
    }

    button {
      display: flex;
      align-items: center;

      height: 36px;
      padding: 0 15px;
      background: #7d40e7;
      font-weight: 500;
      color: #fff;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
