import Address from '../../models/Address';
import Client from '../../models/Client';
import { getRepository } from 'typeorm';

export default class ClientService {
  public async saveClient(content: string) {
    const user = JSON.parse(content).content.user;
    const addressRepo = getRepository(Address);
    const clientRepo = getRepository(Client);
    const { address, ...client } = user;
    const savedAddress = await addressRepo.save(address);
    await clientRepo.save({ ...client, address: savedAddress });
  }
}
