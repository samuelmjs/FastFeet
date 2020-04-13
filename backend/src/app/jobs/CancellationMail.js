import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliveryman, product, recipient } = data;

    const [firstNameDeliveryman] = deliveryman.name.split(' ');

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Novo Cancelamento',
      template: 'cancellation',
      context: {
        deliveryman: firstNameDeliveryman,
        product,
        recipient
      }
    });
  }
}

export default new CancellationMail();
