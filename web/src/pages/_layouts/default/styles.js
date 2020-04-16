import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #f5f5f5;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  padding: 20px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 30px;

    strong {
      font-size: 24px;
    }

    div {
      display: flex;
    }
  }

  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 20px;

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
  }

  form {
    background: #fff;
    padding: 30px;
    border-radius: 4px;

    section {
      display: grid;
      margin: 0 0 20px;

      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30px;
    }

    #firstFocus {
      grid-template-columns: 2fr 1fr 1fr;
    }

    #twoRows {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
