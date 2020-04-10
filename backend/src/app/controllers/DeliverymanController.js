import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await User.findAll({
      where: { provider: false },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url']
        }
      ]
    });

    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
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
