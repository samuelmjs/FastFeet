import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import User from '../models/User';
import Recipient from '../models/Recipient';

import CancelationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class CompanyDeliveryProblemController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblem.findAll({
      attributes: ['id', 'delivery_id', 'description']
    });
    return res.json(deliveryProblems);
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

export default new CompanyDeliveryProblemController();
