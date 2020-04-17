import styled from 'styled-components';

export const Table = styled.div`
  > section {
    display: grid;
    padding: 0 20px;
    margin-bottom: 15px;

    grid-template-columns: 0.5fr 1.5fr 2fr 1.5fr 1.5fr 1fr 1fr;

    strong {
      color: #444;
      font-size: 16px;
    }

    strong:last-child {
      text-align: right;
    }
  }
`;

export const PageActions = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;

  button {
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    margin: 0 15px;

    background: #fff;
    color: #666;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 16px;
    font-weight: bold;
    padding: 8px 12px;
    color: #666;
    background: #fff;
    border-radius: 4px;
  }
`;
