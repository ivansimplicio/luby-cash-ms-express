import { Request, Response } from 'express';
import ClientRepository from '../repository/ClientRepository';

export class ClientController {
  async show(request: Request, response: Response) {
    const client = await ClientRepository.findByCPF(request.params.cpf);
    response.status(200).json({ client });
  }
}
