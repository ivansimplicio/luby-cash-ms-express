import Mailer from '../nodemailer/Mailer';
import ProducerService from '../kafka/ProducerService';
import ClientRepository from '../../repository/ClientRepository';
import Status from './enums/Status';
import { convertToReal } from '../util/converter';

export default class ClientService {
  public async processClientRegistration(content: string) {
    const client = JSON.parse(content).content.user;
    const status = await this.evaluateClient(client);
    const savedClient = await ClientRepository.save(client);
    new ProducerService().produceTopicValuedClient({
      cpfNumber: savedClient.cpfNumber,
      uuidClient: savedClient.id,
      status,
    });
  }

  private async evaluateClient(client: any): Promise<Status> {
    const ACCEPTED_AVERAGE_SALARY = 500;
    const OPENING_BALANCE = 200;
    const { averageSalary } = client;
    if (averageSalary >= ACCEPTED_AVERAGE_SALARY) {
      await Mailer.sendEmail(
        'registration_approved',
        'Luby Cash: Cadastro Aprovado!',
        client,
        {
          minValue: convertToReal(ACCEPTED_AVERAGE_SALARY),
          bonus: convertToReal(OPENING_BALANCE),
        }
      );
      client.currentBalance = OPENING_BALANCE;
      return Status.APPROVED;
    } else {
      await Mailer.sendEmail(
        'registration_disapproved',
        'Luby Cash: Cadastro Reprovado!',
        client,
        { minValue: convertToReal(ACCEPTED_AVERAGE_SALARY) }
      );
      client.currentBalance = 0;
      return Status.DISAPPROVED;
    }
  }

  public async sendEmailForgotPassword(user: string) {
    const client = JSON.parse(user).content.user;
    await Mailer.sendEmail(
      'forgot_password',
      'Luby Cash: Recuperação de senha',
      client,
      {}
    );
  }
}
