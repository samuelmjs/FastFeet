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

    strong {
      font-size: 20px;
    }

    div {
      display: flex;
    }
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
  }

  form {
    background: #fff;
    padding: 30px;

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
    }
  }
`;
