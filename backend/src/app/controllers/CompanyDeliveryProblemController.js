import DeliveryProblem from '../models/DeliveryProblem';

class CompanyDeliveryProblemController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblem.findAll({
      attributes: ['id', 'delivery_id', 'description']
    });
    return res.json(deliveryProblems);
  }

  async delete(req, res) {
    const deliveryProblem = await DeliveryProblem.findByPk(req.params.id);

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await deliveryProblem.destroy();

    return res.status(204).json();
  }
}

export default new CompanyDeliveryProblemController();
