export function formatAdrress(address) {
  return `${address.street}, ${address.number}, ${address.city} - ${address.state}`;
}

export function formatStatus(delivery) {
  if (delivery.end_date) {
    return {
      type: 'ENTREGUE',
      color: '#2CA42B',
    };
  }

  if (delivery.start_date) {
    return {
      type: 'RETIRADA',
      color: '#4D85EE',
    };
  }

  if (delivery.start_date) {
    return {
      type: 'CANCELADA',
      color: '#DE3B3B',
    };
  }

  return {
    type: 'PENDENTE',
    color: '#C1BC35',
  };
}
