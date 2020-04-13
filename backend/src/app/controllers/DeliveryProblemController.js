import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblem.findAll({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'delivery_id', 'description']
    });

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
}

export default new DeliveryProblemController();
