import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import User from '../models/User';
import Recipient from '../models/Recipient';

import CancelationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const deliveryProblems = await DeliveryProblem.findAll({
      order: ['id'],
      limit: 4,
      offset: (page - 1) * 4,
      attributes: ['id', 'delivery_id', 'description']
    });

    const amount = await DeliveryProblem.count();

    res.header('X-Total-Count', amount);

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryProblems = await DeliveryProblem.findOne({ delivery_id: id });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({
        error: 'Impossible to report a problem. Delivery already canceled'
      });
    }

    const { id, delivery_id, description } = await DeliveryProblem.create({
      ...req.body,
      delivery_id: req.params.id
    });

    return res.json({ id, delivery_id, description });
  }

  async delete(req, res) {
    const deliveryProblem = await DeliveryProblem.findByPk(req.params.id, {
      attributes: ['id', 'delivery_id']
    });

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'problem not found' });
    }

    const delivery = await Delivery.findByPk(deliveryProblem.delivery_id, {
      attributes: [
        'id',
        'deliveryman_id',
        'recipient_id',
        'canceled_at',
        'product'
      ],
      include: [
        {
          model: User,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name']
        }
      ]
    });

    await deliveryProblem.destroy();

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery cannot be canceled' });
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    await Queue.add(CancelationMail.key, {
      deliveryman: delivery.deliveryman,
      product: {
        id: delivery.id,
        name: delivery.product
      },
      recipient: delivery.recipient.name
    });

    return res.status(201).json();
  }
}

export default new DeliveryProblemController();
