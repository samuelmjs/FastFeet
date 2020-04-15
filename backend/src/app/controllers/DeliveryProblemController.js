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
      where: {
        id: req.params.id
      },
      order: ['id'],
      limit: 4,
      offset: (page - 1) * 4,
      attributes: ['id', 'delivery_id', 'description']
    });

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryProblems = await DeliveryProblem.find({ delivery_id: id });

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

    const { id, delivery_id, description } = await DeliveryProblem.create({
      ...req.body,
      delivery_id: req.params.id
    });

    return res.json({ id, delivery_id, description });
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
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

    if (!delivery) {
      return res.json({ error: 'Delivery not exists' });
    }

    if (delivery.canceled_at) {
      return res.json({ error: 'Delivery has already been canceled' });
    }

    if (delivery.start_date || delivery.end_date) {
      return res.json({ error: "Delivery can't be canceled" });
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

    return res.status(204).json();
  }
}

export default new DeliveryProblemController();
