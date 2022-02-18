import mailer from '../nodemailer/Mailer';
import ProducerService from '../kafka/ProducerService';
import ClientRepository from '../../repository/ClientRepository';
import Status from './enums/Status';

export default class ClientService {
  public async processClientRegistration(content: string) {
    const client = JSON.parse(content).content.user;
    const status = await this.evaluateClient(client);
    const savedClient = await ClientRepository.save(client);
    new ProducerService().produceTopicValuedClient({
      cpf: savedClient.cpfNumber,
      uuidClient: savedClient.id,
      status,
    });
  }

  private async evaluateClient(client: any): Promise<Status> {
    const ACCEPTED_AVERAGE_SALARY = 500;
    const OPENING_BALANCE = 200;
    const { averageSalary } = client;
    if (averageSalary >= ACCEPTED_AVERAGE_SALARY) {
      await mailer.sendEmail(
        'registration_approved',
        'Luby Cash: Cadastro Aprovado!',
        client,
        {
          minValue: this.convertToReal(ACCEPTED_AVERAGE_SALARY),
          bonus: this.convertToReal(OPENING_BALANCE),
        }
      );
      client.currentBalance = OPENING_BALANCE;
      return Status.APPROVED;
    } else {
      await mailer.sendEmail(
        'registration_disapproved',
        'Luby Cash: Cadastro Reprovado!',
        client,
        { minValue: this.convertToReal(ACCEPTED_AVERAGE_SALARY) }
      );
      client.currentBalance = 0;
      return Status.DISAPPROVED;
    }
  }

  private convertToReal(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
