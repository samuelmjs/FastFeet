import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 26px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #999;
      transition: color 0.2s;
      margin-right: 20px;

      &:hover {
        color: #444;
      }
    }
  }
`;

export const Profile = styled.aside`
  text-align: center;

  strong {
    display: block;
  }

  a {
    color: #de3b3b;
  }
`;
