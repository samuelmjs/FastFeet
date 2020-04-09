import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import User from '../models/User';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll({
      attributes: ['id', 'name', 'number', 'complement', 'state', 'city', 'cep']
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string()
        .test('cep', 'Must be exactly 8 characters', cep => cep.length === 8)
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId, { attributes: ['provider'] });

    if (!user.provider) {
      return res.status(401).json({ error: 'User dont have permission' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep
    } = await Recipient.create(req.body);

    return res.json({ id, name, street, number, complement, state, city, cep });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string()
        .test('cep', 'Must be exactly 8 characters', cep => cep.length === 8)
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id: recipientId } = req.params;

    const user = await User.findByPk(req.userId, { attributes: ['provider'] });

    if (!user.provider) {
      return res.status(401).json({ error: 'User dont have permission' });
    }

    const recipient = await Recipient.findByPk(recipientId, {
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

    if (!recipient) {
      return res.json({ error: 'Recipient not found' });
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }

  async delete(req, res) {
    const { id: recipientId } = req.params;

    const user = await User.findByPk(req.userId);

    if (!user.provider) {
      return res.status(401).json({ error: 'User dont have permission' });
    }

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      return res.json({ error: 'Recipient not found' });
    }

    await recipient.destroy();

    return res.status(204).json();
  }
}

export default new RecipientController();
