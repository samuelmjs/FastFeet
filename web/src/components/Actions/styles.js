import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const More = styled.button`
  background: none;
  border: 0;
  position: absolute;
  margin-right: 12px;
  right: 0;
`;

export const ActionItems = styled.div`
  width: 150px;
  padding: 20px 15px;
  left: calc(50% - 40px);
  top: calc(100% + 15px);
  background: #fff;
  z-index: 5;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

  position: absolute;
  visibility: ${(props) => (props.visible ? 'none' : 'hidden')};
  display: flex;
  flex-direction: column;
`;

export const Action = styled.button`
  width: 100%;
  background: none;
  border: 0;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  & + button {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }

  p {
    margin-left: 10px;
    color: #444;

    &:hover {
      color: ${lighten(0.1, '#444')};
    }
  }
`;
