export function formatAdrress(address) {
  return `${address.street}, ${address.number}, ${address.city} - ${address.state}`;
}

export function formatStatus(delivery) {
  if (delivery.canceled_at) {
    return 'Cancelada';
  }

  if (delivery.end_date) {
    return 'Entregue';
  }

  if (delivery.start_date) {
    return 'Retirada';
  }

  return 'Pendente';
}
