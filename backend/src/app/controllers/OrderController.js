import * as Yup from 'yup';
import Order from '../models/Order';
import User from '../models/User';
import File from '../models/File';
import Recipient from '../models/Recipient';

import CreationMail from '../jobs/CreationMail';
import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      order: ['id'],
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'recipient_id',
        'deliveryman_id',
        'canceled_at'
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
        }
      ]
    });

    return res.json(orders);
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
        .json({ error: 'You can only create orders to deliverymans' });
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

    const order = await Order.create({
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

    return res.json(order);
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

    const { recipient_id, deliveryman_id, product } = req.body;

    const isNotProvider = await User.findOne({
      where: { id: deliveryman_id, provider: false }
    });

    if (!isNotProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create orders to deliverymans' });
    }

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not fund' });
    }

    const order = await Order.findOne({ where: { id: req.params.id } });

    if (!order) {
      return res.status(400).json({ error: 'Order not exists' });
    }

    await order.update({ recipient_id, deliveryman_id, product });

    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.json({ error: 'Order not exists' });
    }

    order.canceled_at = new Date();

    await order.save();

    return res.status(204).json();
  }
}

export default new OrderController();
