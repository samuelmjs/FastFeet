import React from 'react';

import {
  DeliveryCards,
  DeliveryCard,
  DeliveryHeader,
  DeliveryText,
  DeliveryProgress,
  DeliveryFooter,
} from './styles';

export default function Placeholder() {
  function renderDeliveries() {
    const deliveriesNumber = 5;
    const deliveries = [];

    for (let i = 0; i < deliveriesNumber; i++) {
      deliveries.push(
        <DeliveryCard key={i}>
          <DeliveryHeader>
            <DeliveryText autoRun />
          </DeliveryHeader>

          <DeliveryProgress autoRun />

          <DeliveryFooter>
            <DeliveryText autoRun />
          </DeliveryFooter>
        </DeliveryCard>
      );
    }

    return deliveries;
  }

  return <DeliveryCards>{renderDeliveries()}</DeliveryCards>;
}
