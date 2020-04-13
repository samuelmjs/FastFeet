import { Op } from 'sequelize';
import { setSeconds, setMinutes, setHours, isBefore, isAfter } from 'date-fns';
import Delivery from '../models/Delivery';
import User from '../models/User';
import File from '../models/File';
import Recipient from '../models/Recipient';

class CheckDeliveryController {
  async index(req, res) {
    const { delivered } = req.query;

    const deliverymanExists = await User.findByPk(req.params.id, {
      attributes: ['provider']
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Verify deliveryman access' });
    }

    if (deliverymanExists.provider) {
      return res.status(400).json({ error: 'Verify deliveryman access' });
    }

    const deliveries = await Delivery.findAll({
      order: ['id'],
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: delivered === 'true' ? { [Op.ne]: null } : null
      },
      attributes: [
        'id',
        'product',
        'start_date',
        'recipient_id',
        'signature_id'
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
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
        }
      ]
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const { signature_id } = req.body;

    const deliveries = await Delivery.findAll({
      where: { deliveryman_id: req.params.id, start_date: { [Op.ne]: null } }
    });

    const schedule = ['08:00', '20:00'];

    const avaiable = schedule.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(new Date(), hour), minute),
        0
      );

      return {
        time,
        value
      };
    });

    if (
      !(
        isAfter(new Date(), avaiable[0].value) &&
        isBefore(new Date(), avaiable[1].value)
      )
    ) {
      return res.status(400).json({
        error: `Delivery pickups can only be made from ${avaiable[0].time} to ${avaiable[1].time}`
      });
    }

    if (deliveries.length === 5) {
      return res
        .status(400)
        .json({ error: 'You can only remove 5 deliveries a day' });
    }

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

    if (delivery.start_date) {
      return res
        .status(400)
        .json({ error: 'Delivery has already been withdrawn' });
    }

    await delivery.update({ start_date: new Date(), signature_id });

    return res.json(delivery);
  }
}

export default new CheckDeliveryController();
