import React from 'react';

import {
  ProblemCards,
  ProblemCard,
  ProblemHeader,
  ProblemText,
} from './styles';

export default function Placeholder() {
  function renderDeliveries() {
    const deliveriesNumber = 5;
    const deliveries = [];

    for (let i = 0; i < deliveriesNumber; i++) {
      deliveries.push(
        <ProblemCard key={i}>
          <ProblemHeader>
            <ProblemText autoRun />
          </ProblemHeader>
        </ProblemCard>
      );
    }

    return deliveries;
  }

  return <ProblemCards>{renderDeliveries()}</ProblemCards>;
}
