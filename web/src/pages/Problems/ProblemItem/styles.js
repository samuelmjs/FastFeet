import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  width: 100%;

  strong {
    font-size: 14px;
    color: #444;
    margin-bottom: 4px;
  }

  p {
    color: #666;
    font-size: 16px;
    text-align: left;
    line-height: 26px;
    margin-left: 0 !important;
    white-space: normal !important;
  }
`;
