import { Op } from 'sequelize';
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { q, page = 1 } = req.query;

    const deliverymans = await User.findAll({
      where: {
        provider: false,
        name: q ? { [Op.iLike]: `%${q}%` } : { [Op.ne]: null }
      },
      order: ['id'],
      limit: 4,
      offset: (page - 1) * 4,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url']
        }
      ]
    });

    const amount = await User.findAll({
      where: {
        provider: false,
        name: q ? { [Op.iLike]: `%${q}%` } : { [Op.ne]: null }
      }
    });

    res.header('X-Total-Count', amount.length);

    return res.json(deliverymans);
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'provider']
    });

    if (!user) {
      return res.status(400).json({ error: 'User is not found' });
    }

    if (user.provider) {
      return res.status(400).json({ error: 'User is not a deliveryman' });
    }

    const deliveryman = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url']
        }
      ]
    });

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await User.findOne({
      where: { email: req.body.email }
    });

    if (deliveryman) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, avatar_id } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email()
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'provider']
    });

    if (deliveryman.provider) {
      return res.json({ error: 'User is not a deliveryman' });
    }

    if (!deliveryman) {
      return res.json({ error: 'Deliveryman not found' });
    }

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await User.findOne({ where: { email } });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    await deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const deliveryman = await User.findByPk(req.params.id);

    if (!deliveryman) {
      return res.json({ error: 'Deliveryman not found' });
    }

    await deliveryman.destroy();

    return res.status(204).json();
  }
}

export default new DeliverymanController();
