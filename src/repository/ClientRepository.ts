import Address from '../models/Address';
import Client from '../models/Client';
import { getRepository } from 'typeorm';

class ClientRepository {
  public async save(user: any) {
    const clientRepo = getRepository(Client);
    const addressRepo = getRepository(Address);
    const { address, ...client } = user;
    const savedAddress = await addressRepo.save(address);
    const savedClient = await clientRepo.save({
      ...client,
      address: savedAddress,
    });
    return savedClient;
  }

  public async findByCPF(cpf: string) {
    const repository = getRepository(Client);
    return await repository.findOne({ cpfNumber: cpf });
  }

  public async withdraw(cpf: string, value: number) {
    const repository = getRepository(Client);
    const client = await repository.findOne({
      cpfNumber: cpf,
    });
    client.currentBalance -= value;
    return await repository.save(client);
  }

  public async deposit(cpf: string, value: number) {
    const repository = getRepository(Client);
    const client = await repository.findOne({
      cpfNumber: cpf,
    });
    client.currentBalance += value;
    return await repository.save(client);
  }
}

export default new ClientRepository();
