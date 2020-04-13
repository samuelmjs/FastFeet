import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import User from '../models/User';
import File from '../models/File';
import Recipient from '../models/Recipient';

import CreationMail from '../jobs/CreationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      order: ['id'],
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'recipient_id',
        'deliveryman_id',
        'canceled_at',
        'signature_id'
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state']
        },
        {
          model: User,
          as: 'deliveryman',
          attributes: ['id', 'name', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url']
            }
          ]
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url']
        }
      ]
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const isDeliveryman = await User.findOne({
      where: { id: deliveryman_id, provider: false }
    });

    if (!isDeliveryman) {
      return res
        .status(401)
        .json({ error: 'You can only create delivery to deliverymans' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: recipient_id },
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'cep'
      ]
    });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not fund' });
    }

    const delivery = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product
    });

    const [firstNameDeliveryman] = isDeliveryman.name.split(' ');

    await Queue.add(CreationMail.key, {
      firstNameDeliveryman,
      isDeliveryman,
      recipientExists,
      product
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const isNotProvider = await User.findOne({
      where: { id: deliveryman_id, provider: false }
    });

    if (!isNotProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create deliveries to deliverymans' });
    }

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not fund' });
    }

    const delivery = await Delivery.findOne({ where: { id: req.params.id } });

    if (!delivery) {
      return res.status(400).json({ error: 'delivery not exists' });
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.json({ error: 'delivery not exists' });
    }

    if (delivery.start_date || delivery.end_date) {
      return res.json({ error: "delivery can't be canceled" });
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    return res.status(204).json();
  }
}

export default new DeliveryController();
