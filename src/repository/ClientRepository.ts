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
}

export default new ClientRepository();
