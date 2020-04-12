import Mail from '../../lib/Mail';

class CreationMail {
  get key() {
    return 'CreationMail';
  }

  async handle({ data }) {
    const {
      isDeliveryman,
      recipientExists,
      product,
      firstNameDeliveryman
    } = data;

    await Mail.sendMail({
      to: `${isDeliveryman.name} <${isDeliveryman.email}>`,
      subject: 'Nova Entrega',
      template: 'creation',
      context: {
        deliveryman: firstNameDeliveryman,
        product,
        recipient: recipientExists.name,
        address: `${recipientExists.street} ${recipientExists.number}, ${recipientExists.complement}`,
        local: `${recipientExists.city}, ${recipientExists.state}, CEP ${recipientExists.cep}`
      }
    });
  }
}

export default new CreationMail();
