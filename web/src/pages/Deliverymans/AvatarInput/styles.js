import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }

    img {
      height: 148px;
      width: 148px;
      object-fit: cover;
      border-radius: 50%;
      background: #eee;
    }

    div {
      width: 148px;
      height: 148px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px dashed #ddd;
      border-radius: 50%;

      span {
        color: #ddd;
      }
    }

    input {
      display: none;
    }
  }
`;
