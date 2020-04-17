import styled from 'styled-components';

export const Wrapper = styled.section`
  background: #fff;
  height: 60px;

  border-radius: 4px;

  display: grid;
  align-items: center;

  p {
    color: #666;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div {
    display: flex;
    align-items: center;

    img {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
`;
