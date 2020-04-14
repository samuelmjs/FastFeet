import styled from 'styled-components';

export const Table = styled.div`
  > section {
    display: grid;
    padding: 0 20px;
    margin-bottom: 15px;

    grid-template-columns: 1fr 1fr 3fr 1fr;

    strong {
      color: #444;
      font-size: 16px;
    }

    strong:last-child {
      text-align: right;
    }
  }
`;
