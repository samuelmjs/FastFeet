import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import CheckDeliveryController from './app/controllers/CheckDeliveryController';
import EndOfDelivery from './app/controllers/EndOfDelivery';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CompanyDeliveryProblemController from './app/controllers/CompanyDeliveryProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/deliverymans/:id/deliveries', CheckDeliveryController.index);
routes.post(
  '/deliverymans/:id/deliveries/:delivery_id/start',
  CheckDeliveryController.store
);
routes.post(
  '/deliverymans/:id/deliveries/:delivery_id/end',
  EndOfDelivery.store
);

routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.uptade);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);

routes.get('/deliveries/problems', CompanyDeliveryProblemController.index);
routes.delete(
  '/problem/:id/cancel-delivery',
  CompanyDeliveryProblemController.delete
);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
