import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  ProgressLine,
  ProgressContent,
  ProgressDetail,
  ProgressDot,
  ProgressText,
} from './styles';

export default function Progress({ startDate, endDate }) {
  const deliverd = !!endDate;
  const pickUp = !!startDate;

  return (
    <Container>
      <ProgressLine />

      <ProgressContent>
        <ProgressDetail>
          <ProgressDot inProgress />
          <ProgressText>Aguardando retirada</ProgressText>
        </ProgressDetail>

        <ProgressDetail>
          <ProgressDot inProgress={pickUp} />
          <ProgressText>Retirada</ProgressText>
        </ProgressDetail>

        <ProgressDetail>
          <ProgressDot inProgress={deliverd} />
          <ProgressText>entregue</ProgressText>
        </ProgressDetail>
      </ProgressContent>
    </Container>
  );
}

Progress.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

Progress.defaultProps = {
  startDate: null,
  endDate: null,
};
