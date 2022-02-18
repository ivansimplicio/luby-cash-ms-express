import express, { Request, Response } from 'express';
import { ClientController } from '../controllers/ClientController';

const clientRouter = express();

const clientController = new ClientController();

clientRouter.route('/ms/clients/:cpf').get((req: Request, res: Response) => {
  return clientController.index(req, res);
});

export default clientRouter;
