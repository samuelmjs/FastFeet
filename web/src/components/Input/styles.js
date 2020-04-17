import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0 0;

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
`;

export const Label = styled.label`
  color: #444;
  font-weight: bold;
  text-align: left;
  display: block;
  margin-bottom: 9px;
`;

export const Error = styled.span`
  color: #de3b3b;
  margin-top: 8px;
  & + label {
    margin-top: 8px;
  }
`;
