import { format, parseISO } from 'date-fns';

export function formatDate(date) {
  if (!date) return null;

  return format(parseISO(date), 'dd/MM/yyyy');
}

export function formatAdrress(address) {
  return `${address.street}, ${address.number}, ${address.city} - ${address.state}`;
}

export function formatStatus(delivery) {
  if (delivery.canceled_at) {
    return {
      type: 'CANCELADA',
      color: '#DE3B3B',
    };
  }

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

  return {
    type: 'PENDENTE',
    color: '#C1BC35',
  };
}
