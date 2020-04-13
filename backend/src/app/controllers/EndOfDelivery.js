import Delivery from '../models/Delivery';
import User from '../models/User';
import File from '../models/File';
import Recipient from '../models/Recipient';

class EndOfDelivery {
  async store(req, res) {
    const { signature_id } = req.body;

    const delivery = await Delivery.findOne({
      where: { id: req.params.delivery_id, deliveryman_id: req.params.id },
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

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'This delivery has been canceled' });
    }

    if (!delivery.start_date) {
      return res
        .status(400)
        .json({ error: 'Delivery has not yet been withdrawn' });
    }

    await delivery.update({ end_date: new Date(), signature_id });

    return res.json(delivery);
  }
}

export default new EndOfDelivery();
