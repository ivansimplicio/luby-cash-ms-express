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
    const clientRepository = getRepository(Client);
    return await clientRepository.findOne({ cpfNumber: cpf });
  }
}

export default new ClientRepository();
