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

export const Item = styled.div``;