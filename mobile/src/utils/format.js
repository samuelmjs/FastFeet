import Constants from 'expo-constants';

export function formatAdrress(address) {
  return `${address.street}, ${address.number}, ${address.city} - ${address.state}`;
}

export function formatUri(avatar) {
  const { manifest } = Constants;
  const ip =
    typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(':3333')
      : `api.example.com`;

  const splitUri = avatar.url.substring(21, avatar.url.length);

  return `http://${ip}${splitUri}`;
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
